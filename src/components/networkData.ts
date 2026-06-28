/* ============================================================
   networkData — deterministic per-node records for the 3D agent
   constellation. Same index always yields the same agent, so the
   colors in the scene and the detail card on click stay in sync.
   Lightweight (no three.js) — imported by both AgentGlobe and the
   AgentScene detail card. Mock data; no backend.
   ============================================================ */

export type NodeStatus = 'verified' | 'flagged' | 'rejected';

export interface Probe {
  short: string;
  label: string;
  ok: boolean;
}

export interface NodeRecord {
  id: string;
  name: string;
  endpoint: string;
  status: NodeStatus;
  color: string;
  trust: number;
  caps: string[];
  probes: Probe[];
}

const DOMAINS: { d: string; caps: string[] }[] = [
  { d: 'Legal', caps: ['contract-analysis', 'case-law-search'] },
  { d: 'Financial', caps: ['reconciliation', 'risk-modeling'] },
  { d: 'Medical', caps: ['claims-coding', 'prior-auth'] },
  { d: 'Insurance', caps: ['claims-triage', 'fraud-scoring'] },
  { d: 'Logistics', caps: ['route-optimize', 'freight-match'] },
  { d: 'Research', caps: ['market-intel', 'data-synthesis'] },
  { d: 'Security', caps: ['kyc-screening', 'aml-scoring'] },
  { d: 'Tax', caps: ['tax-review', 'filing-prep'] },
];
const ROLES = ['Research', 'Analysis', 'Triage', 'Audit', 'Routing', 'Synthesis', 'Advisor', 'Monitor'];
const BAD = ['Anon Scraper', 'Ghost Relay', 'Null Manifest', 'Stale Proxy', 'Phantom Node', 'Rogue Crawler'];
const PROBES: { short: string; label: string }[] = [
  { short: 'A2A', label: 'A2A protocol' },
  { short: 'MCP', label: 'MCP manifest' },
  { short: 'x402', label: 'x402 endpoint' },
  { short: 'TLS', label: 'TLS & cert chain' },
  { short: 'Card', label: 'Agent Card' },
];

const frac = (n: number) => {
  const h = Math.sin(n) * 43758.5453;
  return h - Math.floor(h);
};

export function recordFor(i: number): NodeRecord {
  const r = frac(i * 127.1 + 311.7);
  const r2 = frac(i * 269.5 + 183.3);
  const status: NodeStatus = r < 0.07 ? 'rejected' : r < 0.18 ? 'flagged' : 'verified';
  const color =
    status === 'rejected'
      ? '#F87171'
      : status === 'flagged'
        ? '#FBBF24'
        : r < 0.5
          ? '#5C92FF'
          : r < 0.74
            ? '#7AA8FF'
            : r < 0.9
              ? '#22D3EE'
              : '#34D399';

  const dom = DOMAINS[i % DOMAINS.length];
  const role = ROLES[(i * 3 + 1) % ROLES.length];
  const id = 'shark_' + ((i * 2654435761) >>> 0).toString(16).slice(0, 4);
  const name = status === 'rejected' ? BAD[i % BAD.length] : `${dom.d} ${role}`;
  const trust =
    status === 'rejected' ? Math.floor(r2 * 24) : status === 'flagged' ? 55 + Math.floor(r2 * 20) : 80 + Math.floor(r2 * 19);
  const caps = status === 'rejected' ? ['undeclared'] : dom.caps;
  const endpoint =
    status === 'rejected' ? `node-${id.slice(6)}${Math.floor(r2 * 90 + 10)}.tk` : `${dom.d.toLowerCase()}-${role.toLowerCase()}.ai`;
  const probes: Probe[] = PROBES.map((p, k) => ({ ...p, ok: status === 'rejected' ? k < 3 : true }));

  return { id, name, endpoint, status, color, trust, caps, probes };
}
