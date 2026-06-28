import PageShell from '../../components/PageShell';
import CTA from '../../components/CTA';

/* ============================================================
   Shared section container — matches the landing-page grid.
   ============================================================ */
function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative ${className}`}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10">{children}</div>
    </section>
  );
}

/* ============================================================
   HERO — mission statement
   ============================================================ */
function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-36 md:pt-44 pb-20 md:pb-28">
      {/* faint top glow, consistent with the Manifesto "moment" */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(79,138,255,0.12) 0%, transparent 70%)',
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10">
        <div className="max-w-4xl reveal">
          <span className="kicker mb-7">
            <span className="kicker-tick" />
            About AgentShark
          </span>
          <h1
            className="font-display text-[clamp(2.5rem,5.2vw,4.5rem)] font-bold leading-[1.06] tracking-hero text-balance"
            style={{ wordSpacing: '0.06em' }}
          >
            We exist to make the agent economy
            <br className="hidden md:block" /> actually work.
          </h1>
          <p className="mt-8 text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl text-pretty">
            AgentShark is the trust, identity, and commerce layer the protocols left out. One MCP server,
            eleven layers, protocol-neutral by design. The infrastructure an economy of agents runs on.
          </p>
        </div>

        {/* meta strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden reveal-stagger">
          {[
            { v: '2026', l: 'Founded' },
            { v: '10,247', l: 'Agents registered' },
            { v: '11.2M', l: 'Verifications run' },
            { v: '11', l: 'Layers, one server' },
          ].map((m) => (
            <div key={m.l} className="bg-void/60 p-6 md:p-7">
              <div className="font-display text-2xl md:text-3xl font-bold text-text-primary tracking-tight tabular">
                {m.v}
              </div>
              <div className="mt-1.5 font-mono text-[10px] tracking-widest text-text-tertiary uppercase">
                {m.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   THESIS — why AgentShark exists
   ============================================================ */
function Thesis() {
  return (
    <Container className="py-20 md:py-28">
      <div className="max-w-3xl reveal">
        <h2 className="font-display text-[clamp(2rem,3.8vw,2.9rem)] font-bold text-text-primary leading-[1.08] tracking-display text-balance">
          The protocols arrived. The economy they promised did not.
        </h2>
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6 max-w-4xl reveal">
        <p className="text-text-secondary text-base md:text-lg leading-relaxed text-pretty">
          By 2026 the rails were live. MCP for tool calls, A2A for agent messaging, x402 for machine
          payments, ERC-8004 for on-chain identity. Each one solved a single piece. None of them answered
          the question that actually blocks the agent economy: can I trust the agent on the other end?
        </p>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed text-pretty">
          Ninety-six percent of agents claiming A2A support fail on the first probe. There was no identity
          you could rely on, no compliance you could verify, no safe way to pay, and no one to resolve a
          dispute. The layer between the protocols and the agents was simply missing. AgentShark is that
          layer, all eleven parts of it, in one MCP server.
        </p>
      </div>

      {/* stat band */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 reveal-stagger">
        {[
          { v: '96%', l: 'of A2A agents fail on first probe', c: '#F87171' },
          { v: '11', l: 'layers shipped in one platform', c: '#5C92FF' },
          { v: '$30T', l: 'projected agent economy by 2030', c: '#22D3EE' },
        ].map((s) => (
          <div key={s.l} className="bezel-outer">
            <div className="bezel-inner p-6 md:p-7">
              <div className="font-display text-3xl md:text-4xl font-bold tracking-hero tabular" style={{ color: s.c }}>
                {s.v}
              </div>
              <p className="mt-2.5 text-text-secondary text-[13px] leading-relaxed">{s.l}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

/* ============================================================
   PRINCIPLES — what we believe
   ============================================================ */
const principles = [
  {
    n: '01',
    t: 'Protocol-neutral, always',
    d: 'Not tied to any cloud, chain, or framework. The same shark_id works everywhere, so the whole economy can build on one neutral layer instead of picking a side.',
  },
  {
    n: '02',
    t: 'Trust is earned, not declared',
    d: 'Reputation comes from verified behavior, never self-reported claims. You can fake a marketing page. You cannot fake ten thousand clean transactions.',
  },
  {
    n: '03',
    t: 'One platform, not eleven products',
    d: 'Every layer feeds the next. Compliance creates trust, trust powers discovery, discovery enables commerce. Integration stays a single MCP call.',
  },
  {
    n: '04',
    t: 'Build in the open',
    d: 'Open standards, open compliance tooling, zero lock-in by design. We win by being the most useful neutral layer, not the stickiest trap.',
  },
];

function Principles() {
  return (
    <Container className="py-20 md:py-28">
      <div className="max-w-2xl reveal">
        <h2 className="font-display text-[clamp(2rem,3.8vw,2.9rem)] font-bold text-text-primary leading-[1.08] tracking-display text-balance">
          What we believe.
        </h2>
        <p className="mt-6 text-text-secondary text-base md:text-lg leading-relaxed text-pretty">
          Four convictions that shape every decision, from the data model to the pricing page.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12 reveal-stagger">
        {principles.map((p) => (
          <div key={p.n} className="flex gap-5 md:gap-7">
            <span className="font-mono text-sm text-accent/70 tabular tracking-widest pt-1">{p.n}</span>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary tracking-tight">
                {p.t}
              </h3>
              <p className="mt-3 text-text-secondary text-[15px] leading-relaxed max-w-md text-pretty">
                {p.d}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

/* ============================================================
   TIMELINE — how we got here
   ============================================================ */
const milestones = [
  {
    period: '2026 · Q1',
    title: 'AgentShark is founded',
    body: 'One thesis: the agent economy will need an operating system, and the window to build it is open right now.',
  },
  {
    period: '2026 · Q2',
    title: 'The MVP ships',
    body: 'register, resolve, and verify go live. The first hundred agents get a permanent shark_id and a real compliance score.',
  },
  {
    period: '2026 · Q3',
    title: 'Trust and discovery launch',
    body: 'Reputation scores and a searchable directory arrive. Agents can finally find each other and vet each other.',
  },
  {
    period: '2026 · Q4',
    title: 'Commerce goes live',
    body: 'Escrow, state tracking, and atomic settlement. Agents pay agents safely, with disputes one call away.',
  },
  {
    period: 'Today',
    title: 'The full stack, in production',
    body: 'Eleven layers live. Over 10,000 agents registered and 11.2M verifications run, the dataset compounding every day.',
    now: true,
  },
];

function Timeline() {
  return (
    <Container className="py-20 md:py-28">
      <div className="max-w-2xl reveal">
        <h2 className="font-display text-[clamp(2rem,3.8vw,2.9rem)] font-bold text-text-primary leading-[1.08] tracking-display text-balance">
          From thesis to backbone.
        </h2>
        <p className="mt-6 text-text-secondary text-base md:text-lg leading-relaxed text-pretty">
          We built the entire stack in one pass, then activated it layer by layer as the economy reached
          for each one.
        </p>
      </div>

      <ol className="mt-16 relative reveal-stagger">
        {/* vertical rail — sits at the centre of the 14px dots (left-0 + 7px) */}
        <span
          className="absolute left-[7px] top-2 bottom-6 w-px pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(79,138,255,0.35) 10%, rgba(34,211,238,0.3) 90%, transparent)',
          }}
        />
        {milestones.map((m) => (
          <li key={m.period} className="relative pl-10 pb-12 last:pb-0">
            <span
              className={`absolute left-0 top-1 w-3.5 h-3.5 rounded-full border-2 ${
                m.now ? 'bg-accent border-accent' : 'bg-depth border-border-strong'
              }`}
              style={m.now ? { boxShadow: '0 0 14px var(--color-accent)' } : undefined}
              aria-hidden="true"
            />
            <div className="font-mono text-[11px] tracking-widest uppercase text-text-tertiary mb-1.5">
              {m.period}
            </div>
            <h3 className="font-display text-lg md:text-xl font-semibold text-text-primary tracking-tight">
              {m.title}
            </h3>
            <p className="mt-2 text-text-secondary text-[15px] leading-relaxed max-w-lg text-pretty">
              {m.body}
            </p>
          </li>
        ))}
      </ol>
    </Container>
  );
}

/* ============================================================
   TEAM
   ============================================================ */
const team = [
  { name: 'Danny Wang', role: 'Founder & CEO', initials: 'DW' },
  // { name: 'Priya Nadkarni', role: 'Head of Engineering', initials: 'PN' },
  // { name: 'Marcus Feld', role: 'Trust & Compliance', initials: 'MF' },
  // { name: 'Yuki Tanaka', role: 'Developer Experience', initials: 'YT' },
];

function Team() {
  return (
    <Container className="py-20 md:py-28">
      <div className="max-w-2xl reveal">
        <h2 className="font-display text-[clamp(2rem,3.8vw,2.9rem)] font-bold text-text-primary leading-[1.08] tracking-display text-balance">
          A small team, obsessed with trust.
        </h2>
        <p className="mt-6 text-text-secondary text-base md:text-lg leading-relaxed text-pretty">
          We are engineers who got tired of agents that lied about what they could do. We are hiring across
          infrastructure, security, and developer experience.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal-stagger">
        {team.map((p) => (
          <div key={p.name} className="bezel-outer">
            <div className="bezel-inner p-6 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/25 to-cyan/10 border border-accent/25 flex items-center justify-center font-display text-sm font-bold text-accent-bright">
                {p.initials}
              </div>
              <div>
                <div className="font-display text-base font-semibold text-text-primary tracking-tight">
                  {p.name}
                </div>
                <div className="mt-0.5 font-mono text-[11px] tracking-wide text-text-tertiary uppercase">
                  {p.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 reveal">
        <a href="mailto:careers@agentshark.dev" className="group inline-flex items-center gap-2.5 text-sm text-text-secondary hover:text-text-primary transition-colors">
          <span>See open roles</span>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-border group-hover:border-accent group-hover:bg-accent/10 transition-all">
            <svg className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </a>
      </div>
    </Container>
  );
}

/* ============================================================
   ABOUT PAGE
   ============================================================ */
export default function About() {
  return (
    <PageShell routePrefix="/">
      <AboutHero />
      <Thesis />
      <Principles />
      <Timeline />
      <Team />
      <Container className="py-20 md:py-24">
        <CTA />
      </Container>
    </PageShell>
  );
}
