export default function CTA() {
  return (
    <div className="relative reveal">
      <div className="bezel-outer-accent">
        <div className="bezel-inner-accent relative overflow-hidden">
          {/* Decorative concentric rings — fixed, low cost, transform-only via radial mask */}
          <div
            className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full pointer-events-none"
            aria-hidden="true"
            style={{
              background: 'radial-gradient(circle, transparent 35%, rgba(79,138,255,0.12) 36%, transparent 37%, transparent 49%, rgba(79,138,255,0.08) 50%, transparent 51%, transparent 64%, rgba(34,211,238,0.05) 65%, transparent 66%)',
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-12 lg:p-16">
            <div className="lg:col-span-8 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-text-tertiary uppercase mb-6">
                <span className="live-dot" />
                Ship agents with confidence
              </span>
              <h2 className="font-display text-[clamp(2rem,3.8vw,3rem)] font-bold text-text-primary leading-[1.05] tracking-hero text-balance">
                The agent economy
                <br />
                runs on{' '}
                <span className="relative inline-block">
                  <span className="text-text-primary">AgentShark.</span>
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-2.5"
                    viewBox="0 0 200 10"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 7 Q 50 1, 100 4 T 198 4"
                      stroke="url(#ctagrad)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="ctagrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
                        <stop offset="20%" stopColor="var(--color-accent)" stopOpacity="0.9" />
                        <stop offset="80%" stopColor="var(--color-cyan)" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h2>
              <p className="mt-6 text-text-secondary text-base md:text-lg max-w-lg leading-relaxed">
                One MCP server. Eleven layers. Production-grade infrastructure for every agent you ship — and every agent you call.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center gap-3">
              <a href="https://app.agentshark.dev" className="group btn-primary w-full justify-center text-base py-3.5">
                Get started free
                <span className="btn-icon-circle">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </a>
              <a
                href="https://docs.agentshark.dev"
                className="btn-secondary w-full justify-center text-base py-3.5"
              >
                Read the docs
              </a>
              <p className="mt-2 font-mono text-[10px] text-text-tertiary uppercase tracking-widest text-center">
                100 verifications / mo free · no card
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
