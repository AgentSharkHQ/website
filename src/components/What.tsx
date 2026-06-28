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
    d: 'Probe any endpoint for real A2A / MCP / x402 compliance in under a second. No black boxes, no marketing claims. Actual probes.',
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
    d: 'Reputation scores that compound with every verified interaction. A credit score for agents, built from real signal, not self-reports.',
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
    d: 'Permission chains, blacklisting, dispute resolution. The safety net that lets enterprises deploy agents in production with confidence.',
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

      <div className="grid grid-cols-12 gap-4 md:gap-8 items-start py-6 md:py-8 px-2 md:px-4 transition-colors duration-500 group-hover:bg-raised/25">
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
          <p className="text-text-secondary text-sm leading-relaxed max-w-prose">{c.d}</p>
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
    <div id="what">
      {/* Full-width editorial header — stacked, not a split */}
      <div className="max-w-3xl reveal">
        <h2 className="font-display text-[clamp(2rem,3.8vw,2.9rem)] font-bold text-text-primary leading-[1.05] tracking-display text-balance">
          One server. Every layer an agent needs.
        </h2>
        <p className="mt-6 text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl text-pretty">
          The protocols say what agents claim. AgentShark proves what they deliver, then gives you the
          infrastructure to find them, pay them, and govern them.
        </p>
      </div>

      {/* Full-width capability index */}
      <ul className="mt-14 reveal-stagger">
        {capabilities.map((c, i) => (
          <CapabilityRow key={c.n} c={c} index={i} />
        ))}
      </ul>

      <div className="mt-10 reveal">
        <a href="#stack" className="group inline-flex items-center gap-2.5 text-sm text-text-secondary hover:text-text-primary transition-colors">
          <span>See all eleven layers</span>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-border group-hover:border-accent group-hover:bg-accent/10 transition-all">
            <svg className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
}
