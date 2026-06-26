const wordmarks = [
  { name: 'MCP', sub: 'Model Context Protocol' },
  { name: 'A2A', sub: 'Agent-to-Agent v1.0' },
  { name: 'x402', sub: 'HTTP 402 Payments' },
  { name: 'ERC-8004', sub: 'On-chain Identity' },
  { name: 'OpenClaw', sub: '380K · Agent Runtime' },
  { name: 'Hermes', sub: 'Self-improving Agent' },
  { name: 'LangGraph', sub: 'Agent Orchestration' },
  { name: 'CrewAI', sub: 'Multi-agent Teams' },
  { name: 'AutoGen', sub: 'Microsoft Research' },
  { name: 'Claude', sub: 'MCP-native Client' },
];

function Wordmark({ name, sub }: { name: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-border bg-raised/30 hover:bg-raised/60 hover:border-border-strong transition-all duration-500">
      <span className="font-display text-sm font-semibold text-text-primary tracking-tight whitespace-nowrap">{name}</span>
      <span className="hidden md:inline w-px h-3 bg-border" />
      <span className="hidden md:inline font-mono text-[10px] tracking-widest text-text-tertiary uppercase whitespace-nowrap">{sub}</span>
    </div>
  );
}

export default function TrustedBy() {
  const items = [...wordmarks, ...wordmarks]; // duplicate for seamless loop
  return (
    <section className="relative py-10 md:py-14 border-y border-border bg-void/30 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">
            Built for every protocol the agent economy is built on
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">
            protocol-neutral · no lock-in
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-abyss to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-abyss to-transparent z-10 pointer-events-none" />

        <div className="marquee-track">
          {items.map((w, i) => (
            <Wordmark key={`${w.name}-${i}`} name={w.name} sub={w.sub} />
          ))}
        </div>
      </div>
    </section>
  );
}
