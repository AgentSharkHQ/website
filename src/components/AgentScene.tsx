import { Component, Suspense, lazy, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { recordFor } from './networkData';

/* ============================================================
   AgentScene — lazy, resilient wrapper for the 3D AgentGlobe.

   Owns the focus state so the WebGL scene and the DOM detail card
   stay in sync. WebGL loads after first paint (off the LCP path);
   an error boundary falls back to a static glow.
   ============================================================ */

const AgentGlobe = lazy(() => import('./AgentGlobe'));

class GlobeBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function Glow() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
      <div className="w-56 h-56 rounded-full" style={{ background: 'radial-gradient(circle, rgba(92,146,255,0.22), transparent 70%)', filter: 'blur(24px)' }} />
    </div>
  );
}

function DetailCard({ index, onClose }: { index: number; onClose: () => void }) {
  const r = recordFor(index);
  const c = r.status === 'rejected' ? 'var(--color-danger)' : r.status === 'flagged' ? 'var(--color-warn)' : 'var(--color-success)';
  return (
    <div
      className="absolute inset-x-3 bottom-3 z-10 rounded-2xl border border-border bg-depth/90 backdrop-blur-xl p-4 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8)]"
      style={{ animation: 'fadeUp 0.32s cubic-bezier(0.22,1,0.36,1)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
            <span className="font-display text-sm font-semibold text-text-primary truncate">{r.name}</span>
          </div>
          <div className="font-mono text-[11px] text-text-tertiary truncate mt-0.5">
            {r.id} · {r.endpoint}
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Back to network"
          className="cursor-pointer shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-white/10 transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {r.probes.map((p) => {
          const pc = p.ok ? 'var(--color-success)' : 'var(--color-danger)';
          return (
            <span
              key={p.short}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border font-mono text-[10px]"
              style={{ color: pc, borderColor: `color-mix(in srgb, ${pc} 30%, transparent)`, background: `color-mix(in srgb, ${pc} 8%, transparent)` }}
            >
              {p.short} {p.ok ? '✓' : '✗'}
            </span>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-border/70">
        <span className="font-mono text-[10px] text-text-tertiary truncate">{r.caps.join(' · ')}</span>
        <span className="font-mono text-[11px] shrink-0">
          <span className="text-text-tertiary">trust </span>
          <span className="font-display font-bold tabular" style={{ color: c }}>{r.trust}</span>
          <span className="text-text-tertiary">/100</span>
        </span>
      </div>
    </div>
  );
}

export default function AgentScene() {
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [interactive, setInteractive] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [focus, setFocus] = useState<number | null>(null);

  useEffect(() => {
    setAnimate(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setInteractive(window.matchMedia('(pointer: fine)').matches);
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full h-[420px] sm:h-[560px]" onPointerDown={() => setShowHint(false)}>
      <Glow />
      {mounted && (
        <GlobeBoundary fallback={<Glow />}>
          <Suspense fallback={null}>
            <AgentGlobe animate={animate} interactive={interactive} focus={focus} onFocus={setFocus} />
          </Suspense>
        </GlobeBoundary>
      )}

      {focus !== null && <DetailCard index={focus} onClose={() => setFocus(null)} />}

      {showHint && focus === null && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-text-tertiary">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 5 12 2 15 5" /><polyline points="15 19 12 22 9 19" /><polyline points="5 9 2 12 5 15" /><polyline points="19 9 22 12 19 15" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="22" />
          </svg>
          {interactive ? 'Drag to orbit · click an agent to inspect' : 'Tap an agent to inspect'}
        </div>
      )}
    </div>
  );
}
