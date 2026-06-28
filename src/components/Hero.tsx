import SoftAurora from './SoftAurora';
import AgentScene from './AgentScene';

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
              <span className="kicker">
                <span className="kicker-tick" />
                Infrastructure for the agent economy
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.25rem,4.4vw,4rem)] font-bold leading-[1.0] tracking-hero text-balance reveal" style={{ wordSpacing: '0.12em' }}>
              The operating
              <br />
              system for the
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-text-primary">agent economy</span>
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-2.5"
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 7 Q 60 1, 100 4 T 198 4" stroke="url(#h1grad)" strokeWidth="2" fill="none" strokeLinecap="round" />
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
              .
            </h1>

            <p className="mt-7 text-base md:text-lg text-text-secondary max-w-xl leading-relaxed reveal text-pretty">
              One MCP server. Eleven layers. Everything agents need to find, verify, trust, pay, and govern each other. Protocol-neutral, zero lock-in.
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
          </div>

          {/* Right — interactive 3D agent network */}
          <div className="lg:col-span-5 reveal lg:pl-2">
            <AgentScene />
          </div>
        </div>
      </div>
    </section>
  );
}
