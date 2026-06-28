import { useEffect, useRef, useState } from 'react';
import { buildPool } from './agentData';
import type { Agent, Probe, Status } from './agentData';

const COLOR: Record<Status, string> = {
  verified: 'var(--color-success)',
  flagged: 'var(--color-warn)',
  rejected: 'var(--color-danger)',
  probing: 'var(--color-accent)',
};

const TOOL: Record<Tab, string> = {
  Identity: 'resolve()',
  Compliance: 'verify()',
  Trust: 'trust()',
  Activity: 'escrow() · log()',
};

type Tab = 'Identity' | 'Compliance' | 'Trust' | 'Activity';
type Filter = 'all' | 'verified' | 'flagged' | 'rejected';

function initials(name: string) {
  const parts = name.split(' ');
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
}

/* ---------- shared bits ---------- */

function Dot({ status }: { status: Status }) {
  return (
    <span
      className={`w-2 h-2 rounded-full shrink-0 ${status === 'probing' ? 'animate-pulse' : ''}`}
      style={{ background: COLOR[status], boxShadow: `0 0 7px ${COLOR[status]}` }}
    />
  );
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[10px] uppercase tracking-widest shrink-0"
      style={{
        color: COLOR[status],
        borderColor: `color-mix(in srgb, ${COLOR[status]} 35%, transparent)`,
        background: `color-mix(in srgb, ${COLOR[status]} 10%, transparent)`,
      }}
    >
      <Dot status={status} />
      {status}
    </span>
  );
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 240;
  const h = 48;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - (v / 100) * h] as const);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  const last = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sparkfill)" />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />
    </svg>
  );
}

function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-border/60 last:border-b-0">
      <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary shrink-0">{k}</span>
      <span className={`font-mono text-[12px] text-right truncate ${accent ? 'text-accent' : 'text-text-primary'}`}>{v}</span>
    </div>
  );
}

function ProbeRow({ p }: { p: Probe }) {
  const color = p.ok === null ? 'var(--color-accent)' : p.ok ? 'var(--color-success)' : 'var(--color-danger)';
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-border/60 last:border-b-0">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="w-4 h-4 flex items-center justify-center shrink-0" style={{ color }}>
          {p.ok === null ? (
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          ) : p.ok ? (
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          ) : (
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          )}
        </span>
        <span className="font-mono text-[12px] text-text-primary truncate">{p.label}</span>
      </div>
      <span className="font-mono text-[11px] shrink-0" style={{ color: p.ok === false ? 'var(--color-danger)' : 'var(--color-text-tertiary)' }}>{p.value}</span>
    </div>
  );
}

/* ---------- detail panels ---------- */

function Compliance({ agent }: { agent: Agent }) {
  const [probes, setProbes] = useState<Probe[]>(agent.probes);
  const [running, setRunning] = useState(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((t) => clearTimeout(t)), []);

  function run() {
    if (running) return;
    setRunning(true);
    setProbes(agent.probes.map((p) => ({ ...p, ok: null, value: 'probing…' })));
    agent.probes.forEach((_, i) => {
      const t = window.setTimeout(() => {
        setProbes((prev) => prev.map((q, j) => (j === i ? agent.probes[i] : q)));
        if (i === agent.probes.length - 1) setRunning(false);
      }, 320 * (i + 1));
      timers.current.push(t);
    });
  }

  const passed = agent.probes.filter((p) => p.ok).length;
  const ok = agent.status !== 'rejected';

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[12.5px] text-text-secondary leading-relaxed max-w-[16rem]">
          Endpoint probed for live protocol compliance, not self-reported claims.
        </p>
        <button
          onClick={run}
          disabled={running}
          className="cursor-pointer shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/12 border border-accent/25 text-accent font-mono text-[11px] hover:bg-accent/20 transition-colors disabled:opacity-50 disabled:cursor-default"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          {running ? 'probing' : 'Run verify'}
        </button>
      </div>
      <div className="rounded-xl border border-border bg-abyss/40 px-3.5 py-1">
        {probes.map((p) => <ProbeRow key={p.label} p={p} />)}
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[11px]">
        <span className="text-text-tertiary uppercase tracking-widest">{passed} / 5 passed</span>
        <span style={{ color: ok ? 'var(--color-success)' : 'var(--color-danger)' }} className="uppercase tracking-widest">
          {ok ? 'compliant' : 'rejected'}
        </span>
      </div>
    </div>
  );
}

function Trust({ agent }: { agent: Agent }) {
  const color = agent.status === 'rejected' ? 'var(--color-danger)' : agent.status === 'flagged' ? 'var(--color-warn)' : 'var(--color-success)';
  return (
    <div>
      <div className="flex items-end justify-between">
        <div className="font-display text-5xl font-bold tabular tracking-hero" style={{ color }}>
          {agent.trust}
          <span className="text-text-tertiary text-lg font-mono font-medium">/100</span>
        </div>
        <div className="text-right">
          <div className="font-mono text-[11px] text-text-primary tabular">{agent.interactions.toLocaleString()}</div>
          <div className="font-mono text-[9px] text-text-tertiary uppercase tracking-widest">interactions</div>
        </div>
      </div>
      <div className="mt-4">
        <Sparkline data={agent.history} color={color} />
      </div>
      <p className="mt-4 text-[12.5px] text-text-secondary leading-relaxed">
        {agent.status === 'rejected'
          ? 'Insufficient verified history. Trust accrues only from interactions that clear compliance.'
          : `Reputation compounded from ${agent.interactions.toLocaleString()} verified interactions over ${agent.history.length} weeks.`}
      </p>
      {agent.status === 'flagged' && (
        <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg border border-warn/25 bg-warn/8">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-warn)' }} />
          <span className="font-mono text-[11px] text-warn">{agent.flagReason}</span>
        </div>
      )}
    </div>
  );
}

function Activity({ agent }: { agent: Agent }) {
  if (agent.txns.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-8">
        <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-quaternary mb-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
        </span>
        <p className="text-[13px] text-text-secondary max-w-[15rem] leading-relaxed">
          No settled transactions. This agent never cleared verification, so escrow was never opened.
        </p>
      </div>
    );
  }
  const stColor = (s: string) => (s === 'cleared' ? 'var(--color-success)' : s === 'held' ? 'var(--color-accent)' : 'var(--color-warn)');
  return (
    <div>
      <div className="flex items-center justify-between mb-2 font-mono text-[9px] uppercase tracking-widest text-text-tertiary">
        <span>counterparty</span><span>amount · state</span>
      </div>
      <div className="rounded-xl border border-border bg-abyss/40 px-3.5 py-1">
        {agent.txns.map((t, i) => (
          <div key={i} className="flex items-center justify-between gap-3 py-2.5 border-b border-border/60 last:border-b-0">
            <span className="font-mono text-[12px] text-text-primary truncate">{t.counterparty}</span>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-[12px] text-text-secondary tabular">${t.amount.toLocaleString()}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: stColor(t.status) }}>{t.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Identity({ agent }: { agent: Agent }) {
  return (
    <div>
      <Row k="shark_id" v={agent.id} accent />
      <Row k="endpoint" v={agent.endpoint} />
      <Row k="domain" v={agent.domain} />
      <Row k="framework" v={agent.framework} />
      <Row k="registered" v={agent.registered} />
      <Row k="interactions" v={agent.interactions.toLocaleString()} />
    </div>
  );
}

/* ---------- detail view ---------- */

function Detail({ agent, onBack }: { agent: Agent; onBack: () => void }) {
  const [tab, setTab] = useState<Tab>('Compliance');
  const tabs: Tab[] = ['Identity', 'Compliance', 'Trust', 'Activity'];

  return (
    <div className="flex flex-col h-full" style={{ animation: 'fadeUp 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
      {/* header */}
      <div className="shrink-0 border-b border-border">
        <div className="px-4 pt-3.5 pb-3">
          <button onClick={onBack} className="cursor-pointer group flex items-center gap-1.5 text-[11px] font-mono text-text-tertiary hover:text-text-primary transition-colors mb-3.5">
            <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Directory
          </button>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center font-display text-sm font-bold shrink-0"
                style={{ background: `color-mix(in srgb, ${COLOR[agent.status]} 14%, transparent)`, color: COLOR[agent.status], border: `1px solid color-mix(in srgb, ${COLOR[agent.status]} 30%, transparent)` }}
              >
                {initials(agent.name)}
              </span>
              <div className="min-w-0">
                <div className="font-display text-base font-semibold text-text-primary tracking-tight truncate">{agent.name}</div>
                <div className="font-mono text-[11px] text-text-tertiary">{agent.id}</div>
              </div>
            </div>
            <StatusBadge status={agent.status} />
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {agent.caps.map((c) => (
              <span key={c} className="px-2 py-0.5 rounded-md bg-white/5 border border-border font-mono text-[10px] text-text-secondary">{c}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center px-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`cursor-pointer relative px-3 py-2.5 text-[11.5px] font-mono transition-colors ${tab === t ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary'}`}
            >
              {t}
              {tab === t && <span className="absolute bottom-0 left-2.5 right-2.5 h-px bg-accent" style={{ boxShadow: '0 0 8px var(--color-accent)' }} />}
            </button>
          ))}
        </div>
      </div>

      {/* panel */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3.5">
          <span className="font-mono text-[9px] text-text-tertiary uppercase tracking-widest">{tab}</span>
          <span className="font-mono text-[9px] text-accent/70 tracking-widest">{TOOL[tab]}</span>
        </div>
        <div key={tab} style={{ animation: 'detailIn 0.32s cubic-bezier(0.22,1,0.36,1)' }}>
          {tab === 'Identity' && <Identity agent={agent} />}
          {tab === 'Compliance' && <Compliance agent={agent} />}
          {tab === 'Trust' && <Trust agent={agent} />}
          {tab === 'Activity' && <Activity agent={agent} />}
        </div>
      </div>
    </div>
  );
}

/* ---------- directory view ---------- */

function Directory({
  feed,
  filter,
  onFilter,
  onShuffle,
  onSelect,
}: {
  feed: Agent[];
  filter: Filter;
  onFilter: (f: Filter) => void;
  onShuffle: () => void;
  onSelect: (id: string) => void;
}) {
  const chips: { k: Filter; label: string }[] = [
    { k: 'all', label: 'All' },
    { k: 'verified', label: 'Verified' },
    { k: 'flagged', label: 'Flagged' },
    { k: 'rejected', label: 'Rejected' },
  ];

  return (
    <div className="flex flex-col h-full" style={{ animation: 'fadeUp 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
      <div className="shrink-0 flex items-center justify-between gap-2 px-3 py-3 border-b border-border">
        <div className="flex items-center gap-1">
          {chips.map((c) => (
            <button
              key={c.k}
              onClick={() => onFilter(c.k)}
              className={`cursor-pointer px-2.5 py-1 rounded-full text-[11px] font-mono border transition-colors ${
                filter === c.k ? 'bg-accent/15 text-accent border-accent/30' : 'text-text-tertiary border-transparent hover:text-text-primary hover:bg-white/5'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <button
          onClick={onShuffle}
          aria-label="Shuffle agents"
          className="cursor-pointer w-7 h-7 rounded-full flex items-center justify-center text-text-tertiary hover:text-text-primary hover:bg-white/5 transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col px-2 py-1.5">
        {feed.map((a) => (
          <button
            key={a.id}
            onClick={() => onSelect(a.id)}
            style={{ animation: 'detailIn 0.45s cubic-bezier(0.22,1,0.36,1)' }}
            className="cursor-pointer flex-1 group flex items-center gap-3.5 px-3 rounded-xl border border-transparent hover:border-accent/30 hover:bg-accent/[0.07] transition-colors text-left"
          >
            <Dot status={a.status} />
            <div className="min-w-0 flex-1">
              <div className="font-mono text-[12px] text-text-primary truncate">{a.id}</div>
              <div className="font-mono text-[10.5px] text-text-tertiary truncate">{a.name}</div>
            </div>
            <span
              className="font-display text-[15px] font-bold tabular shrink-0"
              style={{ color: COLOR[a.status] }}
            >
              {a.trust}
            </span>
            <svg className="w-4 h-4 text-text-quaternary group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        ))}
      </div>

      <div className="shrink-0 px-4 py-2.5 border-t border-border font-mono text-[10px] text-text-tertiary tracking-wide flex items-center gap-2">
        <svg className="w-3 h-3 text-accent/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        Select an agent to inspect its full profile
      </div>
    </div>
  );
}

function sampleFeed(pool: Agent[], filter: Filter, n = 7): Agent[] {
  const matching = pool.filter((a) => filter === 'all' || a.status === filter);
  const c = [...matching];
  const out: Agent[] = [];
  while (out.length < n && c.length) out.push(c.splice(Math.floor(Math.random() * c.length), 1)[0]);
  return out;
}

/* ---------- root ---------- */

export default function AgentExplorer() {
  const [pool] = useState<Agent[]>(() => buildPool(240));
  const [filter, setFilter] = useState<Filter>('all');
  const [feed, setFeed] = useState<Agent[]>(() => sampleFeed(pool, 'all'));
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function changeFilter(f: Filter) {
    setFilter(f);
    setFeed(sampleFeed(pool, f));
  }
  function shuffle() {
    setFeed(sampleFeed(pool, filter));
  }

  // Live directory: every couple of seconds, swap one random visible row for a
  // fresh agent from the pool (matching the active filter, no duplicates).
  // Paused while inspecting an agent and under reduced-motion.
  useEffect(() => {
    if (selectedId) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const iv = window.setInterval(() => {
      setFeed((prev) => {
        if (!prev.length) return prev;
        const ids = new Set(prev.map((a) => a.id));
        const choices = pool.filter((a) => (filter === 'all' || a.status === filter) && !ids.has(a.id));
        if (!choices.length) return prev;
        const next = [...prev];
        next[Math.floor(Math.random() * prev.length)] = choices[Math.floor(Math.random() * choices.length)];
        return next;
      });
    }, 1200);
    return () => clearInterval(iv);
  }, [selectedId, filter, pool]);

  const selected = selectedId ? pool.find((a) => a.id === selectedId) ?? null : null;

  return (
    <div className="relative">
      <div
        className="absolute -inset-12 rounded-[3rem] opacity-50 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse at center, rgba(79,138,255,0.16) 0%, transparent 60%)', filter: 'blur(48px)' }}
      />
      <div className="bezel-outer-accent relative">
        <div className="bezel-inner-accent">
          <div className="flex flex-col h-[520px] sm:h-[560px]">
            {selected ? (
              <Detail key={selected.id} agent={selected} onBack={() => setSelectedId(null)} />
            ) : (
              <Directory feed={feed} filter={filter} onFilter={changeFilter} onShuffle={shuffle} onSelect={setSelectedId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
