const capabilities = [
  {
    n: '01',
    t: 'Identity',
    d: 'A permanent shark_id for every agent. Universal across frameworks, runtimes, and org boundaries. Your agent\'s passport to the economy.',
    tool: 'register()',
    metric: '10,247 issued',
  },
  {
    n: '02',
    t: 'Compliance',
    d: 'Probe any endpoint for real A2A / MCP / x402 compliance in under a second. No black boxes. No marketing claims — actual probes.',
    tool: 'verify()',
    metric: 'p95 · 142ms',
  },
  {
    n: '03',
    t: 'Discovery',
    d: 'A real directory for the agent economy. Find agents by capability, trust score, or price. The search the protocols never shipped.',
    tool: 'search()',
    metric: '4,180 listed',
  },
  {
    n: '04',
    t: 'Trust',
    d: 'Reputation scores that compound with every verified interaction. A credit score for agents, built from real signal — not self-reports.',
    tool: 'trust()',
    metric: '94 mean score',
  },
  {
    n: '05',
    t: 'Commerce',
    d: 'Escrow, atomic settlement, and x402-native pricing. Safe transactions between autonomous agents, with disputes if anything goes wrong.',
    tool: 'escrow()',
    metric: '$2.4M cleared',
  },
  {
    n: '06',
    t: 'Governance',
    d: 'Permission chains, blacklisting, dispute resolution. The safety net that lets enterprises deploy agents in production without a lawyer on speed-dial.',
    tool: 'dispute()',
    metric: '8 disputes · 100% resolved',
  },
];

function CapabilityRow({ c, index }: { c: (typeof capabilities)[number]; index: number }) {
  return (
    <li
      className="group relative border-t border-border last:border-b cursor-default"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Hover sweep line */}
      <span
        className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
        aria-hidden="true"
      />

      <div className="grid grid-cols-12 gap-4 md:gap-8 items-start py-6 md:py-7 px-2 transition-colors duration-500 group-hover:bg-raised/30">
        {/* Number */}
        <div className="col-span-2 md:col-span-1">
          <span className="font-mono text-xs md:text-sm text-text-tertiary tabular tracking-widest group-hover:text-accent transition-colors duration-500">
            {c.n}
          </span>
        </div>

        {/* Title */}
        <div className="col-span-10 md:col-span-3">
          <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary tracking-tight group-hover:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
            {c.t}
          </h3>
        </div>

        {/* Description */}
        <div className="col-span-12 md:col-span-5">
          <p className="text-text-secondary text-sm leading-relaxed">{c.d}</p>
        </div>

        {/* Tool + metric */}
        <div className="col-span-12 md:col-span-3 flex md:flex-col items-start md:items-end gap-3 md:gap-2">
          <code className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/15">
            {c.tool}
          </code>
          <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest">
            {c.metric}
          </span>
        </div>
      </div>
    </li>
  );
}

export default function What() {
  return (
    <div id="what" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
      {/* Left — editorial headline (no eyebrow — saves visual noise) */}
      <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
        <div className="reveal">
          <h2 className="font-display text-[clamp(2rem,3.6vw,2.75rem)] font-bold text-text-primary leading-[1.05] tracking-display text-balance">
            One server.
            <br />
            <span className="text-text-secondary italic font-light">Every layer</span>
            <br />
            an agent needs.
          </h2>
        </div>
        <p className="mt-6 text-text-secondary text-base leading-relaxed max-w-md reveal">
          The protocols say what agents claim. AgentShark says what agents prove — and provides the rest of the infrastructure to find them, pay them, and govern them.
        </p>

        <div className="mt-8 flex items-center gap-6 reveal">
          <a href="#stack" className="group inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
            <span>See the full stack</span>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-border group-hover:border-accent group-hover:bg-accent/10 transition-all">
              <svg className="w-2.5 h-2.5 transition-transform duration-500 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* Right — interactive list */}
      <div className="lg:col-span-7 reveal">
        <div className="bezel-outer">
          <div className="bezel-inner p-2 md:p-3">
            <ul className="reveal-stagger">
              {capabilities.map((c, i) => (
                <CapabilityRow key={c.n} c={c} index={i} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
