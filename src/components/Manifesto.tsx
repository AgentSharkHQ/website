const pillars = [
  {
    t: 'One stack, not a fragment',
    d: 'A2A talks, MCP calls, x402 pays. None of them tell you whether an agent is real, reliable, or safe to transact with. AgentShark is all eleven layers, behind one endpoint.',
  },
  {
    t: 'Neutral by design',
    d: 'No cloud, chain, or framework lock-in. The same shark_id works everywhere, the way Cloudflare won as the neutral CDN while everyone else picked a side.',
  },
  {
    t: 'A moat that compounds',
    d: '11.2M verifications run and climbing. Every probe, escrow, and trust update sharpens a dataset no competitor can replay. The lead widens on its own.',
  },
];

export default function Manifesto() {
  return (
    <div className="relative border-y border-border">
      {/* faint centered glow to make this section feel like a moment */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(79,138,255,0.10) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center reveal">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-text-tertiary mb-7">
            Why now
          </p>
          <h2 className="font-display text-[clamp(2.1rem,4.2vw,3.4rem)] font-bold tracking-display leading-[1.08] text-balance">
            <span className="text-text-secondary">Stripe didn&apos;t invent payments. It made them work for everyone with one API call. </span>
            <span className="text-text-primary">AgentShark does the same for agents.</span>
          </h2>
          <p className="mt-7 text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-pretty">
            The protocols for the agent economy are live, but fragmented. The layer between the protocols
            and the agents was missing. So we built it, and the window to own it is open right now.
          </p>
        </div>

        {/* Three differentiators — plain columns, hairline dividers, no cards */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 reveal-stagger">
          {pillars.map((p, i) => (
            <div
              key={p.t}
              className={`px-0 md:px-8 py-8 md:py-2 border-t md:border-t-0 md:border-l border-border ${
                i === 0 ? 'md:border-l-0 md:pl-0' : ''
              }`}
            >
              <h3 className="font-display text-lg md:text-xl font-semibold text-text-primary tracking-tight mb-3">
                {p.t}
              </h3>
              <p className="text-text-secondary text-sm md:text-[15px] leading-relaxed max-w-sm">
                {p.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
