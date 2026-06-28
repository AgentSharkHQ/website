/* ============================================================
   agentData — procedural generator for the Agent Inspector.

   Composes coherent, internally-consistent agents from rich pools so
   the inspector has effectively unlimited believable scenarios. A
   "verified" agent passes its probes and carries an upward trust
   history and settled transactions; a "rejected" agent fails a probe
   and has none; a "flagged" agent passes compliance but carries a
   governance issue. Nothing here is wired to a backend — it is a
   faithful mock of what AgentShark returns.
   ============================================================ */

export type Status = 'verified' | 'flagged' | 'rejected' | 'probing';

export interface Probe {
  label: string;
  ok: boolean | null; // null = currently probing
  value: string;
}

export interface Txn {
  counterparty: string;
  amount: number;
  status: 'cleared' | 'held' | 'refunded';
}

export interface Agent {
  id: string;
  name: string;
  domain: string;
  status: Status;
  intended?: Status; // real status while shown as "probing"
  trust: number;
  interactions: number;
  caps: string[];
  endpoint: string;
  framework: string;
  registered: string;
  probes: Probe[];
  history: number[];
  txns: Txn[];
  flagReason?: string;
  disputes: number;
}

const DOMAINS: { domain: string; caps: string[] }[] = [
  { domain: 'Legal', caps: ['contract-analysis', 'case-law-search', 'regulatory-review', 'clause-extraction', 'redline'] },
  { domain: 'Financial', caps: ['reconciliation', 'risk-modeling', 'sec-filing-parse', 'valuation', 'cash-flow'] },
  { domain: 'Medical', caps: ['claims-coding', 'prior-auth', 'diagnosis-support', 'records-summary'] },
  { domain: 'Insurance', caps: ['claims-triage', 'fraud-scoring', 'underwriting', 'policy-review'] },
  { domain: 'Logistics', caps: ['route-optimize', 'freight-match', 'customs-clearance', 'eta-predict'] },
  { domain: 'Research', caps: ['market-intel', 'competitor-scan', 'literature-review', 'data-synthesis'] },
  { domain: 'Security', caps: ['kyc-screening', 'sanctions-check', 'threat-intel', 'aml-scoring'] },
  { domain: 'Tax', caps: ['tax-review', 'vat-calc', 'transfer-pricing', 'filing-prep'] },
  { domain: 'Manufacturing', caps: ['supply-match', 'defect-scan', 'qa-routing', 'inventory-sync'] },
  { domain: 'HR', caps: ['resume-screen', 'comp-benchmark', 'policy-qa'] },
  { domain: 'Marketing', caps: ['audience-model', 'copy-synthesis', 'spend-optimize'] },
  { domain: 'Energy', caps: ['grid-balance', 'demand-forecast', 'carbon-audit'] },
];

const ROLES = [
  'Research', 'Analysis', 'Triage', 'Review', 'Audit', 'Routing',
  'Screening', 'Synthesis', 'Monitor', 'Reconciliation', 'Advisor', 'Engine',
];

const BAD_NAMES = [
  'Anon Scraper', 'Echo Endpoint', 'Ghost Relay', 'Null Manifest', 'Stale Proxy', 'Phantom Node',
  'Orphan Worker', 'Mock Responder', 'Dead Letter', 'Rogue Crawler', 'Shadow Bridge', 'Broken Pipe',
];

const FRAMEWORKS = ['OpenClaw', 'Hermes', 'LangGraph', 'CrewAI', 'AutoGen', 'Custom MCP'];
const MONTHS = [
  'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025',
  'Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026',
];
const FLAG_REASONS = [
  '2 open disputes', 'response-time anomaly', 'endpoint drift detected',
  'capability mismatch', 'rate-limit breaches', '1 open dispute',
];
const PROBE_LABELS = ['A2A protocol', 'MCP manifest', 'x402 endpoint', 'TLS & cert chain', 'Agent Card'];
const PROBE_OK = ['responds', 'valid', 'ready', 'valid chain', 'signed'];
const PROBE_BAD = ['no response', 'invalid manifest', 'no 402 route', 'cert expired', 'unsigned'];
const TLDS = ['ai', 'io', 'dev', 'app'];
const AMOUNTS = [50, 120, 240, 500, 750, 1200, 2400];

const rand = (n: number) => Math.floor(Math.random() * n);
const pickOne = <T,>(a: T[]): T => a[rand(a.length)];
function sample<T>(a: T[], k: number): T[] {
  const c = [...a];
  const out: T[] = [];
  while (out.length < k && c.length) out.push(c.splice(rand(c.length), 1)[0]);
  return out;
}
const hexId = () => 'shark_' + Math.random().toString(16).slice(2, 6);

function probesFor(ok: boolean): Probe[] {
  if (ok) return PROBE_LABELS.map((label, i) => ({ label, ok: true, value: PROBE_OK[i] }));
  const failIdx = sample([0, 1, 2, 3, 4], 1 + rand(2));
  return PROBE_LABELS.map((label, i) =>
    failIdx.includes(i)
      ? { label, ok: false, value: PROBE_BAD[i] }
      : { label, ok: true, value: PROBE_OK[i] }
  );
}

function historyFor(status: Status, trust: number): number[] {
  const pts: number[] = [];
  let v = status === 'rejected' ? 5 + rand(12) : Math.max(20, trust - 22 - rand(14));
  for (let i = 0; i < 14; i++) {
    const target = status === 'rejected' ? 10 : trust;
    v += (target - v) * (0.18 + Math.random() * 0.12) + (Math.random() - 0.5) * (status === 'flagged' ? 9 : 4);
    pts.push(Math.max(0, Math.min(100, Math.round(v))));
  }
  pts[pts.length - 1] = trust;
  return pts;
}

function txnsFor(status: Status): Txn[] {
  if (status === 'rejected') return [];
  const n = 2 + rand(status === 'flagged' ? 3 : 4);
  return Array.from({ length: n }, (_, i) => {
    let st: Txn['status'] = 'cleared';
    if (status === 'flagged' && i === 0) st = 'refunded';
    else if (i === 0 && Math.random() < 0.3) st = 'held';
    return { counterparty: hexId(), amount: pickOne(AMOUNTS), status: st };
  });
}

/** Generate one agent. Pass `asProbing` to show it mid-verification. */
export function generateAgent(asProbing = false): Agent {
  const r = Math.random();
  const real: Status = r < 0.72 ? 'verified' : r < 0.86 ? 'flagged' : 'rejected';
  const isBad = real === 'rejected';
  const dom = pickOne(DOMAINS);
  let role = pickOne(ROLES);
  if (role === dom.domain) role = pickOne(ROLES.filter((r) => r !== dom.domain));
  const name = isBad ? pickOne(BAD_NAMES) : `${dom.domain} ${role}`;
  const trust = isBad ? rand(26) : real === 'flagged' ? 52 + rand(22) : 80 + rand(19);

  return {
    id: hexId(),
    name,
    domain: isBad ? 'Unverified' : dom.domain,
    status: asProbing ? 'probing' : real,
    intended: asProbing ? real : undefined,
    trust,
    interactions: isBad ? rand(8) : real === 'flagged' ? 120 + rand(900) : 200 + rand(4200),
    caps: isBad ? ['undeclared'] : sample(dom.caps, 2 + rand(2)),
    endpoint: isBad
      ? `${pickOne(['node', 'relay', 'proxy', 'svc'])}-${Math.random().toString(16).slice(2, 6)}.${pickOne(TLDS)}`
      : `${dom.domain.toLowerCase()}-${role.toLowerCase()}.${pickOne(TLDS)}`,
    framework: pickOne(FRAMEWORKS),
    registered: pickOne(MONTHS),
    probes: probesFor(!isBad),
    history: historyFor(real, trust),
    txns: txnsFor(real),
    flagReason: real === 'flagged' ? pickOne(FLAG_REASONS) : undefined,
    disputes: real === 'flagged' ? 1 + rand(2) : 0,
  };
}

export function resolveAgent(a: Agent): Agent {
  return { ...a, status: a.intended ?? 'verified', intended: undefined };
}

export function buildPool(n: number): Agent[] {
  return Array.from({ length: n }, () => generateAgent());
}
