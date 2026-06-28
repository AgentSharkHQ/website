import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { recordFor } from './networkData';
import type { NodeRecord } from './networkData';

/* ============================================================
   AgentGlobe — interactive 3D constellation of agents around the
   AgentShark core. Drag to orbit, hover to identify, click a node:
   the network rotates it to front-and-center, dims the rest, and a
   scan ring pulses around it while the detail card (owned by the
   parent) slides in. Glow via additive sprites — no postprocessing.
   ============================================================ */

function buildGraph(n: number, R: number) {
  const nodes: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rr = Math.sqrt(Math.max(0, 1 - y * y));
    const th = phi * i;
    nodes.push(new THREE.Vector3(Math.cos(th) * rr, y, Math.sin(th) * rr).multiplyScalar(R));
  }
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    nodes
      .map((p, j) => ({ j, d: p.distanceTo(nodes[i]) }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3)
      .forEach((o) => {
        const a = Math.min(i, o.j);
        const b = Math.max(i, o.j);
        const key = `${a}-${b}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([a, b]);
        }
      });
  }
  const edgePositions = new Float32Array(edges.length * 6);
  edges.forEach((e, idx) => {
    const a = nodes[e[0]];
    const b = nodes[e[1]];
    edgePositions.set([a.x, a.y, a.z, b.x, b.y, b.z], idx * 6);
  });
  return { nodes, edges, edgePositions };
}

function makeGlow() {
  const s = 64;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.28, 'rgba(255,255,255,0.6)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}

const Y = new THREE.Vector3(0, 1, 0);

function Scene({
  animate,
  interactive,
  focus,
  onFocus,
}: {
  animate: boolean;
  interactive: boolean;
  focus: number | null;
  onFocus: (i: number | null) => void;
}) {
  const N = 46;
  const R = 2.3;
  const { nodes, edges, edgePositions } = useMemo(() => buildGraph(N, R), []);
  const records = useMemo(() => nodes.map((_, i) => recordFor(i)), [nodes]);
  const glow = useMemo(() => makeGlow(), []);
  useEffect(() => () => glow.dispose(), [glow]);

  const { camera } = useThree();
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const dragging = useRef(false);
  const targetQ = useRef(new THREE.Quaternion());
  const spinQ = useRef(new THREE.Quaternion());
  const ringPhase = useRef(0);

  const PULSES = 7;
  const pulseRefs = useRef<(THREE.Sprite | null)[]>([]);
  const pulses = useRef(
    Array.from({ length: PULSES }, () => ({
      e: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      speed: 0.25 + Math.random() * 0.4,
    }))
  );

  // when a node is focused, compute the group orientation that brings it
  // to face the current camera direction.
  useEffect(() => {
    if (focus === null || !group.current) return;
    const camDir = camera.position.clone().normalize();
    const nodeDir = nodes[focus].clone().applyQuaternion(group.current.quaternion).normalize();
    const delta = new THREE.Quaternion().setFromUnitVectors(nodeDir, camDir);
    targetQ.current.copy(delta.multiply(group.current.quaternion));
    ringPhase.current = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const g = group.current;
    if (!g) return;

    if (focus === null) {
      if (animate && !dragging.current) {
        spinQ.current.setFromAxisAngle(Y, dt * 0.12);
        g.quaternion.premultiply(spinQ.current);
      }
    } else {
      g.quaternion.slerp(targetQ.current, 0.12);
    }

    if (animate && core.current) {
      core.current.rotation.y += dt * 0.3;
      core.current.rotation.x += dt * 0.14;
    }

    // light pulses traveling the trust links (hidden while focused)
    pulses.current.forEach((p, i) => {
      const m = pulseRefs.current[i];
      if (!m) return;
      if (focus !== null) {
        m.visible = false;
        return;
      }
      m.visible = true;
      if (animate) p.t += dt * p.speed;
      if (p.t > 1) {
        p.t = 0;
        p.e = Math.floor(Math.random() * edges.length);
      }
      const e = edges[p.e];
      m.position.lerpVectors(nodes[e[0]], nodes[e[1]], p.t);
      m.scale.setScalar(0.1 + Math.sin(p.t * Math.PI) * 0.12);
    });

    // scan ring around the focused node (rendered in world space)
    if (ring.current) {
      if (focus !== null) {
        ring.current.visible = true;
        const world = nodes[focus].clone().applyQuaternion(g.quaternion);
        ring.current.position.copy(world);
        ring.current.lookAt(camera.position);
        ringPhase.current = (ringPhase.current + dt * 1.1) % 1;
        const p = ringPhase.current;
        ring.current.scale.setScalar(0.3 + p * 1.1);
        const mat = ring.current.material as THREE.Material;
        mat.opacity = 0.6 * (1 - p);
      } else {
        ring.current.visible = false;
      }
    }
  });

  const focusColor = focus !== null ? records[focus].color : '#5C92FF';

  return (
    <>
      {interactive && focus === null && (
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI * 0.26}
          maxPolarAngle={Math.PI * 0.74}
          onStart={() => (dragging.current = true)}
          onEnd={() => (dragging.current = false)}
        />
      )}

      {/* scan ring (world space, billboarded) */}
      <mesh ref={ring} visible={false}>
        <ringGeometry args={[0.34, 0.4, 48]} />
        <meshBasicMaterial color={focusColor} transparent opacity={0} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <group ref={group}>
        {/* core */}
        <sprite scale={1.7}>
          <spriteMaterial map={glow} color="#7AA8FF" blending={THREE.AdditiveBlending} transparent depthWrite={false} opacity={focus === null ? 0.9 : 0.4} />
        </sprite>
        <mesh ref={core}>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshBasicMaterial color="#5C92FF" wireframe transparent opacity={focus === null ? 0.5 : 0.2} />
        </mesh>

        {/* links */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#3B6FD0" transparent opacity={focus === null ? 0.2 : 0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
        </lineSegments>

        {/* nodes */}
        {nodes.map((pos, i) => {
          const isFocus = focus === i;
          const dimmed = focus !== null && !isFocus;
          return (
            <sprite
              key={i}
              position={pos}
              scale={isFocus ? 0.95 : dimmed ? 0.22 : 0.34}
              onClick={(e) => {
                e.stopPropagation();
                onFocus(i);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                if (interactive) document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = '';
              }}
            >
              <spriteMaterial
                map={glow}
                color={records[i].color}
                blending={THREE.AdditiveBlending}
                transparent
                depthWrite={false}
                opacity={dimmed ? 0.4 : 1}
              />
            </sprite>
          );
        })}

        {/* link pulses */}
        {pulses.current.map((_, i) => (
          <sprite key={`p${i}`} ref={(el) => { pulseRefs.current[i] = el; }} scale={0.14}>
            <spriteMaterial map={glow} color="#22D3EE" blending={THREE.AdditiveBlending} transparent depthWrite={false} />
          </sprite>
        ))}

        {/* hover/focus label */}
        {focus !== null && (
          <Html position={nodes[focus]} center style={{ pointerEvents: 'none' }}>
            <div className="-translate-y-9 whitespace-nowrap rounded-md border border-border bg-depth/90 backdrop-blur px-2 py-1 font-mono text-[10px] text-text-primary flex items-center gap-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: records[focus].color }} />
              {records[focus].id}
            </div>
          </Html>
        )}
      </group>
    </>
  );
}

export default function AgentGlobe({
  animate,
  interactive,
  focus,
  onFocus,
}: {
  animate: boolean;
  interactive: boolean;
  focus: number | null;
  onFocus: (i: number | null) => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 40 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
      onPointerMissed={() => onFocus(null)}
    >
      <Scene animate={animate} interactive={interactive} focus={focus} onFocus={onFocus} />
    </Canvas>
  );
}

export type { NodeRecord };
