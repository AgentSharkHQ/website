import { useState } from 'react';

type Layer = {
  i: (props: { className?: string }) => React.JSX.Element;
  t: string;
  d: string;
  tool: string;
  meta: string;
};

const layers: Layer[] = [
  { i: Fingerprint, t: 'Identity', d: 'Universal IDs. Every agent gets a permanent shark_id that survives framework migrations and org boundaries.', tool: 'register', meta: '11,400 issued' },
  { i: ShieldCheck, t: 'Compliance', d: 'Real A2A / MCP probes. Verify an agent actually does what it claims before you spend tokens calling it.', tool: 'verify', meta: '142ms p95' },
  { i: Search, t: 'Discovery', d: 'Find agents by capability, trust score, or price. A real directory for the agent economy.', tool: 'search', meta: '4,180 listed' },
  { i: Award, t: 'Trust', d: 'Reputation accumulates from verified interactions. Trust that compounds over time.', tool: 'trust', meta: '94 mean score' },
  { i: Activity, t: 'State', d: 'Real-time progress tracking across long-running, multi-agent interactions.', tool: 'checkpoint', meta: 'live stream' },
  { i: Cart, t: 'Commerce', d: 'Escrow and safe agent-to-agent payments via x402. Atomic, auditable.', tool: 'escrow', meta: '$2.4M cleared' },
  { i: Route, t: 'Routing', d: 'AI-powered task-to-agent matching. Knows the cost, trust, and latency before dispatch.', tool: 'recommend', meta: '94% first-try' },
  { i: Message, t: 'Messaging', d: 'Agent-to-agent relay with queued delivery and read receipts.', tool: 'relay', meta: 'reliable' },
  { i: FileText, t: 'Logging', d: 'Immutable, fully auditable records of every agent interaction.', tool: 'log', meta: 'append-only' },
  { i: Gavel, t: 'Governance', d: 'Dispute resolution, blacklisting, and trust revocation.', tool: 'dispute', meta: '8 disputes · 100% resolved' },
  { i: Lock, t: 'Permissions', d: 'Scoped delegation chains. Fine-grained control over what an agent may do on your behalf.', tool: 'delegate', meta: 'zero-trust' },
];

/* inline icon set — ultra-light, precise (no Lucide import) */
function Fingerprint({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" aria-hidden="true">
      <path d="M17 6a8 8 0 00-10 0" /><path d="M21 2a14 14 0 00-18 0" /><path d="M4 10a8 8 0 0114 0" /><path d="M7 14a5 5 0 0110 0" /><circle cx="12" cy="18" r="2" />
    </svg>
  );
}
function ShieldCheck({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L3 7v5c0 5.5 4 10.5 9 12 5-1.5 9-6.5 9-12V7l-9-5z" /><path d="M8 12l3 3 5-5" />
    </svg>
  );
}
function Search({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  );
}
function Award({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="7" /><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
    </svg>
  );
}
function Activity({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" aria-hidden="true">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
function Cart({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
function Route({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" aria-hidden="true">
      <circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M6 17V5h10l4 4" />
    </svg>
  );
}
function Message({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" aria-hidden="true">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}
function FileText({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}
function Gavel({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" aria-hidden="true">
      <path d="M14 13l-7.5 7.5c-1 1-2.5 1-3.5 0L2 19.5c-1-1-1-2.5 0-3.5L9.5 8.5" /><path d="M9.5 8.5l-3 3L14 19l3-3-7.5-7.5z" /><path d="M18 7l3-3" /><circle cx="16" cy="3" r="2" /><circle cx="20" cy="7" r="2" />
    </svg>
  );
}
function Lock({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function LayerNode({ layer, index, active, onHover }: { layer: Layer; index: number; active: boolean; onHover: (i: number) => void }) {
  const Icon = layer.i;
  return (
    <button
      onMouseEnter={() => onHover(index)}
      onFocus={() => onHover(index)}
      className="group relative w-full text-left flex items-center gap-4 py-3 px-3 md:px-4 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus:outline-none"
      style={{
        background: active ? 'rgba(79,138,255,0.06)' : 'transparent',
        border: `1px solid ${active ? 'rgba(79,138,255,0.18)' : 'transparent'}`,
      }}
    >
      <div
        className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-500 ${
          active ? 'bg-accent/15 text-accent scale-110' : 'bg-white/5 text-text-secondary'
        }`}
        style={active ? { boxShadow: '0 0 16px -2px var(--color-accent)' } : undefined}
      >
        <Icon className="w-4 h-4" />
        {active && (
          <span className="absolute -inset-1 rounded-xl border border-accent/30 animate-pulse" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] tabular text-text-tertiary tracking-widest">L{String(index + 1).padStart(2, '0')}</span>
          <span className={`font-display text-sm font-semibold tracking-tight transition-colors duration-500 ${active ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
            {layer.t}
          </span>
        </div>
      </div>
      <code
        className={`hidden md:inline font-mono text-[10px] tracking-widest transition-colors duration-500 ${
          active ? 'text-accent' : 'text-text-tertiary'
        }`}
      >
        {layer.tool}()
      </code>
    </button>
  );
}

export default function Features() {
  const [active, setActive] = useState(0);
  const cur = layers[active];
  const Icon = cur.i;

  return (
    <div id="stack" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Left — section intro + interactive vertical layer stack */}
      <div className="lg:col-span-5">
        <h2 className="font-display text-[clamp(2rem,3.8vw,2.9rem)] font-bold text-text-primary leading-[1.05] tracking-display text-balance reveal">
          Eleven layers,
          <br />
          one protocol surface.
        </h2>
        <p className="mt-6 text-text-secondary text-base leading-relaxed max-w-md reveal text-pretty">
          Each layer feeds the next: compliance creates trust, trust powers discovery, discovery enables commerce. Hover any layer to see how it works.
        </p>

        <div className="mt-10 bezel-outer reveal">
          <div className="bezel-inner p-3">
            <div className="reveal-stagger">
              {layers.map((layer, i) => (
                <LayerNode key={layer.t} layer={layer} index={i} active={i === active} onHover={setActive} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right — detail panel for active layer */}
      <div className="lg:col-span-7 lg:sticky lg:top-32 self-start">
        <div className="bezel-outer-accent">
          <div className="bezel-inner-accent p-7 md:p-10 min-h-[440px] flex flex-col">
            {/* Layer badge */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Icon className="w-6 h-6" />
                <span className="absolute -inset-1 rounded-2xl border border-accent/20" />
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-widest text-text-tertiary uppercase">
                  Layer L{String(active + 1).padStart(2, '0')} · 11
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-text-primary tracking-tight">
                  {cur.t}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p
              key={cur.t + 'd'}
              className="mt-7 text-text-secondary text-base leading-relaxed max-w-xl"
              style={{ animation: 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
            >
              {cur.d}
            </p>

            {/* Code sample + meta */}
            <div
              key={cur.t + 'c'}
              className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3"
              style={{ animation: 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s backwards' }}
            >
              <div className="rounded-2xl border border-border bg-abyss/50 p-5 font-mono text-[12px]">
                <div className="text-text-tertiary text-[10px] uppercase tracking-widest mb-3">call</div>
                <div className="space-y-1.5">
                  <div><span className="tk-key">await</span> <span className="tk-var">shark</span>.<span className="tk-fn">{cur.tool}</span>(</div>
                  <div className="pl-4 text-text-secondary">endpoint=<span className="tk-str">"https://agent.x"</span>,</div>
                  <div className="pl-4 text-text-secondary">shark_id=<span className="tk-str">"shark_abc"</span></div>
                  <div>)</div>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-abyss/50 p-5">
                <div className="text-text-tertiary text-[10px] uppercase tracking-widest mb-3 font-mono">signal</div>
                <div className="font-display text-3xl font-bold text-text-primary tracking-tight tabular">
                  {cur.meta}
                </div>
                <div className="mt-2 font-mono text-[10px] text-text-tertiary uppercase tracking-widest">
                  observed · last 30 days
                </div>
              </div>
            </div>

            {/* Footer navigation hint */}
            <div className="mt-auto pt-8 flex items-center justify-between">
              <button
                onClick={() => setActive((a) => Math.max(0, a - 1))}
                disabled={active === 0}
                className="group flex items-center gap-2 text-xs font-mono text-text-tertiary hover:text-text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="w-3 h-3 transition-transform duration-500 group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                {active > 0 ? layers[active - 1].t : 'Identity'}
              </button>
              <div className="font-mono text-[10px] text-text-tertiary tabular tracking-widest">
                {String(active + 1).padStart(2, '0')} / 11
              </div>
              <button
                onClick={() => setActive((a) => Math.min(layers.length - 1, a + 1))}
                disabled={active === layers.length - 1}
                className="group flex items-center gap-2 text-xs font-mono text-text-tertiary hover:text-text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {active < layers.length - 1 ? layers[active + 1].t : 'Permissions'}
                <svg className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
