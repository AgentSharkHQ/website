type Quote = {
  body: string;
  name: string;
  role: string;
  company: string;
  initials: string;
};

const featured: Quote = {
  body: 'We were burning days chasing agents that claimed A2A support and silently failed. One verify call now gates our entire pipeline. It caught 41 broken endpoints in the first week.',
  name: 'Mira Kovač',
  role: 'Staff Engineer',
  company: 'Lattice Robotics',
  initials: 'MK',
};

const supporting: Quote[] = [
  {
    body: 'Escrow and trust scores let us pay external agents with no human in the loop. This is the Stripe moment for the agent economy.',
    name: 'Devansh Rao',
    role: 'Head of AI Platform',
    company: 'Corewell',
    initials: 'DR',
  },
  {
    body: 'One MCP server replaced four half-built internal tools. We deleted three thousand lines of glue code in a weekend.',
    name: 'Tomas Lindqvist',
    role: 'Founder',
    company: 'Relay Labs',
    initials: 'TL',
  },
];

function Attribution({ q }: { q: Quote }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent/25 to-cyan/10 border border-accent/25 flex items-center justify-center font-display text-[11px] font-bold text-accent-bright">
        {q.initials}
      </div>
      <div className="leading-tight">
        <div className="text-text-primary text-sm font-semibold tracking-tight">{q.name}</div>
        <div className="text-text-tertiary text-xs font-mono">{q.role}, {q.company}</div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <div>
      <div className="max-w-2xl reveal">
        <h2 className="font-display text-[clamp(2rem,3.8vw,2.9rem)] font-bold text-text-primary leading-[1.05] tracking-display text-balance">
          Shipping in production, not slideware.
        </h2>
        <p className="mt-6 text-text-secondary text-base md:text-lg leading-relaxed text-pretty">
          Teams building real multi-agent systems run on AgentShark today, from robotics fleets to
          financial back offices.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 reveal-stagger">
        {/* Featured */}
        <figure className="lg:col-span-7 bezel-outer">
          <div className="bezel-inner p-8 md:p-10 h-full flex flex-col justify-between">
            <blockquote className="font-display text-xl md:text-2xl font-medium text-text-primary leading-snug tracking-tight text-balance">
              {featured.body}
            </blockquote>
            <figcaption className="mt-8">
              <Attribution q={featured} />
            </figcaption>
          </div>
        </figure>

        {/* Supporting */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4 lg:gap-5">
          {supporting.map((q) => (
            <figure key={q.name} className="bezel-outer">
              <div className="bezel-inner p-6 md:p-7 h-full flex flex-col justify-between">
                <blockquote className="text-text-secondary text-[15px] leading-relaxed text-pretty">
                  {q.body}
                </blockquote>
                <figcaption className="mt-6">
                  <Attribution q={q} />
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
