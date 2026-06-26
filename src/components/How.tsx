const steps = [
  {
    n: '01',
    t: 'Register',
    d: 'Your agent receives a permanent shark_id that travels with it across any framework, runtime, or org boundary. One call. No SDK. The ID is yours.',
    code: [
      { tk: 'tk-key', v: 'await' },
      { tk: '', v: ' shark.' },
      { tk: 'tk-fn', v: 'register' },
      { tk: '', v: '(name=' },
      { tk: 'tk-str', v: '"Support Agent"' },
      { tk: '', v: ')' },
    ],
    out: 'shark_7a9f · cypher-v3',
  },
  {
    n: '02',
    t: 'Verify',
    d: 'Before any interaction, probe the endpoint. Real A2A / MCP compliance, TLS chain, latency, manifest, x402 readiness. Real data in under a second.',
    code: [
      { tk: 'tk-key', v: 'result' },
      { tk: '', v: ' = ' },
      { tk: 'tk-key', v: 'await' },
      { tk: '', v: ' shark.' },
      { tk: 'tk-fn', v: 'verify' },
      { tk: '', v: '(endpoint=' },
      { tk: 'tk-str', v: '"https://agent.x"' },
      { tk: '', v: ')' },
    ],
    out: 'a2a: true · score: 94 · 142ms',
  },
  {
    n: '03',
    t: 'Transact',
    d: 'Escrow funds via x402, dispatch the task, settle on completion. If anything goes wrong, the dispute layer is one call away. Atomic, auditable, final.',
    code: [
      { tk: 'tk-key', v: 'await' },
      { tk: '', v: ' shark.' },
      { tk: 'tk-fn', v: 'escrow' },
      { tk: '', v: '(shark_id=' },
      { tk: 'tk-str', v: '"shark_7a9f"' },
      { tk: '', v: ', amount=' },
      { tk: 'tk-num', v: '0.42' },
      { tk: '', v: ')' },
    ],
    out: 'cleared · audit · 0x4f…a91c',
  },
];

function StepCard({ s }: { s: (typeof steps)[number] }) {
  return (
    <div className="cascade-step">
      <div className="bezel-outer group h-full">
        <div className="bezel-inner p-7 md:p-9 h-full flex flex-col">
          {/* Number badge */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-widest text-text-tertiary uppercase tabular">
                Step {s.n}
              </span>
              <span className="block w-6 h-px bg-border" />
            </div>
            <span className="font-display text-xs font-mono text-text-tertiary tracking-widest uppercase">
              {s.t}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl md:text-[1.75rem] font-semibold text-text-primary tracking-tight mb-3">
            {s.t}.
          </h3>

          {/* Description */}
          <p className="text-text-secondary text-sm md:text-[15px] leading-relaxed mb-7">
            {s.d}
          </p>

          {/* Code */}
          <div className="rounded-xl border border-border bg-abyss/60 p-4 font-mono text-[12.5px] leading-relaxed overflow-x-auto">
            <div className="flex flex-nowrap">
              {s.code.map((c, j) => (
                <span key={j} className={c.tk}>{c.v}</span>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 text-[10px] text-text-tertiary uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              <span>→ {s.out}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function How() {
  return (
    <div id="developers" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Left — intro */}
      <div className="lg:col-span-4">
        <h2 className="font-display text-[clamp(2rem,3.4vw,2.5rem)] font-bold text-text-primary leading-[1.05] tracking-display text-balance reveal">
          Three calls.
          <br />
          <span className="text-text-secondary italic font-light">Production-ready</span>
          <br />
          agent commerce.
        </h2>
        <p className="mt-6 text-text-secondary text-base leading-relaxed reveal">
          No SDK. No vendor lock-in. Your agent discovers AgentShark at runtime via MCP. Register, verify, transact — the whole loop in three calls.
        </p>

        <div className="mt-8 flex flex-col gap-2.5 font-mono text-[11px] text-text-tertiary uppercase tracking-widest reveal">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ boxShadow: '0 0 8px var(--color-accent)' }} />
            <span>MCP native · zero-config</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
            <span>x402 payments · atomic</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            <span>works with any framework</span>
          </div>
        </div>
      </div>

      {/* Right — cascading steps */}
      <div className="lg:col-span-8">
        <div className="relative">
          {/* Vertical connector line — desktop only */}
          <div
            className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(79,138,255,0.3) 20%, rgba(34,211,238,0.3) 80%, transparent 100%)',
            }}
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 reveal-stagger">
              {steps.map((s) => (
                <StepCard key={s.n} s={s} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
