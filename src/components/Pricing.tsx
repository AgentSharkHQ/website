const plans = [
  {
    n: 'Free',
    sub: 'For solo builders & experiments',
    p: '$0',
    period: 'forever',
    f: [
      '100 verifications per month',
      '1 agent · 100 transactions',
      'Basic trust reports',
      'Community support',
      'Public directory listing',
    ],
    cta: 'Start building',
    ctaStyle: 'secondary',
    href: 'https://app.agentshark.dev',
  },
  {
    n: 'Pro',
    sub: 'For teams shipping production agents',
    p: '$29',
    period: 'per month',
    highlight: true,
    f: [
      '1,000 verifications per month',
      '10 agents · unlimited transactions',
      'Full trust reports + history',
      'Uptime monitoring & alerts',
      'SKILL.md / MCP integration',
      'Priority support · 4h SLA',
    ],
    cta: 'Start 14-day trial',
    ctaStyle: 'primary',
    href: 'https://app.agentshark.dev',
  },
  {
    n: 'Business',
    sub: 'For organizations deploying at scale',
    p: '$99',
    period: 'per month',
    f: [
      '5,000 verifications per month',
      '50 agents · white-label ready',
      'Escrow + payment rails',
      'Compliance certificate',
      'Self-hosted option',
      'Dedicated solutions engineer',
    ],
    cta: 'Contact sales',
    ctaStyle: 'secondary',
    href: 'mailto:hello@agentshark.dev',
  },
];

const compareRows = [
  { label: 'Verifications / month', free: '100', pro: '1,000', biz: '5,000' },
  { label: 'Agents', free: '1', pro: '10', biz: '50' },
  { label: 'Trust reports', free: 'Basic', pro: 'Full + history', biz: 'Custom' },
  { label: 'Self-hosted', free: '—', pro: '—', biz: '✓' },
  { label: 'Support SLA', free: 'Community', pro: '4h', biz: '1h · dedicated' },
];

function PlanCard({ plan }: { plan: (typeof plans)[number] }) {
  return (
    <div
      className={`relative ${plan.highlight ? 'lg:-mt-3 lg:mb-3' : ''}`}
    >
      {plan.highlight && (
        <div className="absolute -top-2.5 right-5 z-10 px-2.5 py-0.5 rounded-full bg-text-primary text-abyss font-mono text-[9px] tracking-widest uppercase">
          recommended
        </div>
      )}
      <div className={plan.highlight ? 'bezel-outer-accent h-full' : 'bezel-outer h-full'}>
        <div className={plan.highlight ? 'bezel-inner-accent p-7 md:p-9 h-full flex flex-col' : 'bezel-inner p-7 md:p-9 h-full flex flex-col'}>
          {/* Plan header */}
          <div className="mb-7">
            <h3 className="font-display text-xl font-bold text-text-primary tracking-tight">
              {plan.n}
            </h3>
            <p className="mt-1.5 text-text-tertiary text-[13px]">{plan.sub}</p>
          </div>

          {/* Price */}
          <div className="mb-7 pb-7 border-b border-border">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl md:text-5xl font-bold text-text-primary tracking-hero">
                {plan.p}
              </span>
              <span className="text-text-tertiary text-xs font-mono">/ {plan.period}</span>
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8 flex-1">
            {plan.f.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-text-secondary leading-relaxed">
                <svg
                  className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-accent' : 'text-text-tertiary'}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={plan.href}
            className={
              plan.ctaStyle === 'primary'
                ? 'group btn-primary w-full justify-center'
                : 'btn-secondary w-full justify-center'
            }
          >
            {plan.cta}
            {plan.ctaStyle === 'primary' && (
              <span className="btn-icon-circle">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            )}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <div id="pricing" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Left — intro */}
      <div className="lg:col-span-4">
        <h2 className="font-display text-[clamp(2rem,3.4vw,2.5rem)] font-bold text-text-primary leading-[1.05] tracking-display text-balance reveal">
          Start free.
          <br />
          <span className="text-text-secondary italic font-light">Scale when you're ready.</span>
        </h2>
        <p className="mt-6 text-text-secondary text-base leading-relaxed reveal">
          No surprise overages. No vendor lock-in. Every plan includes the full eleven-layer stack — pricing only changes the volume.
        </p>
      </div>

      {/* Right — plan grid */}
      <div className="lg:col-span-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 reveal-stagger">
          {plans.map((plan) => (
            <PlanCard key={plan.n} plan={plan} />
          ))}
        </div>

        {/* Comparison row */}
        <div className="mt-8 bezel-outer reveal">
          <div className="bezel-inner overflow-hidden">
            <div className="grid grid-cols-4 text-xs font-mono">
              <div className="p-4 md:p-5 text-text-tertiary uppercase tracking-widest">Feature</div>
              <div className="p-4 md:p-5 text-text-secondary uppercase tracking-widest text-center border-l border-border">Free</div>
              <div className="p-4 md:p-5 text-text-primary uppercase tracking-widest text-center border-l border-border bg-accent/5">Pro</div>
              <div className="p-4 md:p-5 text-text-secondary uppercase tracking-widest text-center border-l border-border">Business</div>
            </div>
            {compareRows.map((row, i) => (
              <div key={row.label} className={`grid grid-cols-4 text-sm ${i !== 0 ? 'border-t border-border' : ''}`}>
                <div className="p-4 md:p-5 text-text-secondary">{row.label}</div>
                <div className="p-4 md:p-5 text-text-tertiary text-center border-l border-border tabular font-mono text-xs">{row.free}</div>
                <div className="p-4 md:p-5 text-text-primary text-center border-l border-border bg-accent/5 tabular font-mono text-xs font-semibold">{row.pro}</div>
                <div className="p-4 md:p-5 text-text-tertiary text-center border-l border-border tabular font-mono text-xs">{row.biz}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
