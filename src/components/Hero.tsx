import { useEffect, useState, useRef } from 'react';
import SoftAurora from './SoftAurora';

/* ============================================================
   Live Verification Card — the hero artifact
   Shows a real AgentShark verification in progress.
   ============================================================ */

type Probe = { label: string; value: string };

const PROBES: Probe[] = [
  { label: 'A2A compliance', value: 'verified' },
  { label: 'MCP manifest', value: 'verified' },
  { label: 'x402 endpoint', value: 'verified' },
  { label: 'TLS & cert chain', value: 'verified' },
  { label: 'Latency p95', value: '142ms' },
];

const INITIAL_MS = 142;
const SCORE_FINAL = 94;
const PROBE_TICK_MS = 1400;

function VerifyCard() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => (s + 1) % PROBES.length);
    }, PROBE_TICK_MS);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setScore(Math.min(SCORE_FINAL, step * 19 + 5));
  }, [step]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setParallax({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="relative will-change-transform"
      style={{
        transform: `perspective(1200px) rotateY(${parallax.x * 2}deg) rotateX(${-parallax.y * 1.5}deg)`,
        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Outer halo glow — fixed, transform-only via filter */}
      <div
        className="absolute -inset-16 rounded-[3rem] opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(79,138,255,0.18) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
        aria-hidden="true"
      />

      <div className="bezel-outer-accent relative">
        <div className="bezel-inner-accent">
          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
            <div className="flex items-center gap-2.5">
              <span className="live-dot" />
              <span className="font-mono text-[10px] tracking-widest text-text-secondary uppercase">Live verification</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-text-tertiary uppercase tracking-widest">
              <span className="hidden sm:inline">a2a compliant</span>
              <svg className="w-3 h-3 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2L3 7v5c0 5.5 4 10.5 9 12 5-1.5 9-6.5 9-12V7l-9-5z" />
                <path d="M8 12l3 3 5-5" />
              </svg>
            </div>
          </div>

          {/* Agent identity */}
          <div className="px-5 py-5 border-b border-border">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-1.5">shark_id</div>
                <div className="font-display text-base font-semibold text-text-primary tracking-tight">shark_7a9f</div>
                <div className="mt-1 text-xs text-text-secondary font-mono">cypher-v3 · support.cipherlabs.dev</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-1.5">trust score</div>
                <div className="font-display text-3xl font-bold text-success tabular tracking-tight">
                  {score}
                  <span className="text-text-tertiary text-base font-medium">/100</span>
                </div>
              </div>
            </div>

            {/* Score bar */}
            <div className="mt-5 h-1 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-cyan rounded-full"
                style={{
                  width: `${score}%`,
                  transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                  boxShadow: '0 0 12px var(--color-accent)',
                }}
              />
            </div>
          </div>

          {/* Probe list */}
          <div className="px-5 py-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-3">probes · 5 / 5</div>
            <ul className="space-y-2.5">
              {PROBES.map((probe, i) => {
                const active = i === step;
                return (
                  <li
                    key={probe.label}
                    className="flex items-center justify-between text-sm transition-colors duration-500"
                    style={{ color: active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`block w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                          active ? 'scale-125' : ''
                        }`}
                        style={{
                          background: active ? 'var(--color-accent)' : 'rgba(52, 211, 153, 0.6)',
                          boxShadow: active ? '0 0 8px var(--color-accent)' : 'none',
                        }}
                      />
                      <span className="font-mono text-xs">{probe.label}</span>
                    </div>
                    <span className={`font-mono text-xs ${active ? 'text-accent' : 'text-text-tertiary'}`}>
                      {active ? 'probing…' : probe.value}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Footer meta — static, no Math.random */}
          <div className="px-5 py-3.5 border-t border-border flex items-center justify-between font-mono text-[10px] text-text-tertiary">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-success" />
              <span>shark_id resolved</span>
            </span>
            <span>ms · {INITIAL_MS}</span>
            <span>v1.4 · 2.4K req/s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HERO
   ============================================================ */

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-28 md:pt-32">
      {/* Aurora — focused, dim, not competing */}
      <SoftAurora
        speed={0.28}
        scale={1.4}
        brightness={0.35}
        color1="#1B4FB8"
        color2="#08407A"
        noiseFrequency={3.0}
        noiseAmplitude={0.5}
        bandHeight={0.55}
        bandSpread={1.1}
        octaveDecay={0.18}
        layerOffset={0.4}
        colorSpeed={0.18}
        mouseInfluence={0.08}
      />

      {/* Subtle gradient floor to lift content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-abyss/30 to-abyss pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-abyss to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left — Editorial typography */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="reveal mb-8">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-text-tertiary uppercase">
                <span className="live-dot" />
                The agent economy runs here
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.25rem,4.4vw,4rem)] font-bold leading-[1.0] tracking-hero text-balance reveal">
              The operating
              <br />
              system for an
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-text-primary">economy of agents.</span>
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-2.5"
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 7 Q 60 1, 100 4 T 198 4"
                    stroke="url(#h1grad)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="h1grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
                      <stop offset="20%" stopColor="var(--color-accent)" stopOpacity="0.9" />
                      <stop offset="80%" stopColor="var(--color-cyan)" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p className="mt-8 text-base md:text-lg text-text-secondary max-w-xl leading-relaxed reveal">
              One MCP server. Eleven layers. Identity, compliance, discovery, trust, commerce, routing, governance — everything agents need to work, transact, and trust each other. Protocol-neutral. Zero lock-in.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3 reveal">
              <a href="https://app.agentshark.dev" className="group btn-primary">
                Get started
                <span className="btn-icon-circle">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </a>
              <a href="https://docs.agentshark.dev" className="btn-secondary">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                Read the docs
              </a>
            </div>

            <div className="mt-10 flex items-center gap-5 text-[11px] text-text-tertiary font-mono reveal">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-success" />
                <span>100 verifications / mo free</span>
              </div>
              <span className="w-px h-3 bg-border" />
              <span>No credit card</span>
              <span className="hidden sm:inline w-px h-3 bg-border" />
              <span className="hidden sm:inline">SOC 2 in progress</span>
            </div>
          </div>

          {/* Right — Live verification artifact */}
          <div className="lg:col-span-5 reveal lg:pl-2">
            <VerifyCard />
          </div>
        </div>
      </div>

      {/* Bottom corner credit */}
      <div className="hidden lg:flex absolute bottom-8 right-12 items-center gap-3 z-10 font-mono text-[10px] tracking-widest text-text-tertiary uppercase">
        <span>scroll</span>
        <span className="block w-px h-8 bg-gradient-to-b from-text-tertiary to-transparent" />
      </div>
    </section>
  );
}
