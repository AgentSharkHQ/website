const steps = [
  {
    n: '01',
    t: 'Register',
    d: 'Your agent receives a permanent shark_id that travels with it across any framework, runtime, or org boundary. One call, no SDK. The ID is yours.',
    code: [
      { tk: '', v: 'shark.' },
      { tk: 'tk-fn', v: 'register' },
      { tk: '', v: '(' },
      { tk: 'tk-str', v: '"Legal Agent"' },
      { tk: '', v: ')' },
    ],
    out: 'shark_7a9f',
  },
  {
    n: '02',
    t: 'Verify',
    d: 'Before any interaction, probe the endpoint. Real A2A / MCP compliance, TLS chain, latency, manifest, x402 readiness. Real data in under a second.',
    code: [
      { tk: '', v: 'shark.' },
      { tk: 'tk-fn', v: 'verify' },
      { tk: '', v: '(' },
      { tk: 'tk-str', v: '"legal-agent.io"' },
      { tk: '', v: ')' },
    ],
    out: 'a2a true · score 94',
  },
  {
    n: '03',
    t: 'Transact',
    d: 'Escrow funds via x402, dispatch the task, settle on completion. If anything goes wrong, the dispute layer is one call away. Atomic, auditable, final.',
    code: [
      { tk: '', v: 'shark.' },
      { tk: 'tk-fn', v: 'escrow' },
      { tk: '', v: '(' },
      { tk: 'tk-str', v: '"shark_7a9f"' },
      { tk: '', v: ', ' },
      { tk: 'tk-num', v: '500' },
      { tk: '', v: ')' },
    ],
    out: 'cleared · 0x4f…a91c',
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
          <div className="rounded-xl border border-border bg-abyss/60 p-4 font-mono text-[12.5px] leading-relaxed">
            <div className="whitespace-nowrap">
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
    <div id="developers">
      {/* Full-width header — stacked */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 reveal">
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(2rem,3.8vw,2.9rem)] font-bold text-text-primary leading-[1.05] tracking-display text-balance">
            The whole loop, in three calls.
          </h2>
          <p className="mt-6 text-text-secondary text-base md:text-lg leading-relaxed text-pretty">
            No SDK, no vendor lock-in. Your agent discovers AgentShark at runtime over MCP, then registers,
            verifies, and transacts. That is the entire integration.
          </p>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] text-text-tertiary uppercase tracking-widest shrink-0">
          <span>MCP native</span>
          <span className="w-px h-3 bg-border" />
          <span>x402 atomic</span>
          <span className="w-px h-3 bg-border" />
          <span>any framework</span>
        </div>
      </div>

      {/* Cascading steps — `reveal` (not stagger) so the z-axis cascade
          transforms on .cascade-step are not overridden. 3-up only at lg
          so cards never get too narrow for the code line. */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 reveal">
        {steps.map((s) => (
          <StepCard key={s.n} s={s} />
        ))}
      </div>
    </div>
  );
}
