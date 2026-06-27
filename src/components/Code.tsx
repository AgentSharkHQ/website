import { useState } from 'react';

type Tab = { name: string; lang: string; code: Token[][] };
type Token = { tk: string; v: string };

const tabs: Tab[] = [
  {
    name: 'verify.py',
    lang: 'python',
    code: [
      [{ tk: 'tk-com', v: '# verify any agent endpoint before interacting' }],
      [{ tk: 'tk-key', v: 'from' }, { tk: '', v: ' agentshark ' }, { tk: 'tk-key', v: 'import' }, { tk: '', v: ' Client' }],
      [],
      [{ tk: '', v: 'shark = ' }, { tk: 'tk-cls', v: 'Client' }, { tk: '', v: '(' }, { tk: 'tk-str', v: '"shark_abc123"' }, { tk: '', v: ')' }],
      [],
      [{ tk: '', v: 'result = ' }, { tk: 'tk-key', v: 'await' }, { tk: '', v: ' shark.' }, { tk: 'tk-fn', v: 'verify' }, { tk: '', v: '(' }],
      [{ tk: '', v: '    endpoint=' }, { tk: 'tk-str', v: '"https://some-agent.com"' }, { tk: '', v: ',' }],
      [{ tk: '', v: '    protocol=' }, { tk: 'tk-str', v: '"a2a"' }, { tk: '', v: ',' }],
      [{ tk: '', v: '    timeout=' }, { tk: 'tk-num', v: '5000' }, { tk: '', v: ',' }],
      [{ tk: '', v: ')' }],
      [],
      [{ tk: 'tk-key', v: 'print' }, { tk: '', v: '(' }, { tk: 'tk-var', v: 'result' }, { tk: '', v: ')' }],
    ],
  },
  {
    name: 'verify.ts',
    lang: 'typescript',
    code: [
      [{ tk: 'tk-com', v: '// verify any agent endpoint before interacting' }],
      [{ tk: 'tk-key', v: 'import' }, { tk: '', v: ' { Client } ' }, { tk: 'tk-key', v: 'from' }, { tk: '', v: ' ' }, { tk: 'tk-str', v: '"agentshark"' }, { tk: '', v: ';' }],
      [],
      [{ tk: 'tk-key', v: 'const' }, { tk: '', v: ' shark = ' }, { tk: 'tk-key', v: 'new' }, { tk: '', v: ' ' }, { tk: 'tk-cls', v: 'Client' }, { tk: '', v: '(' }, { tk: 'tk-str', v: '"shark_abc123"' }, { tk: '', v: ');' }],
      [],
      [{ tk: 'tk-key', v: 'const' }, { tk: '', v: ' result = ' }, { tk: 'tk-key', v: 'await' }, { tk: '', v: ' shark.' }, { tk: 'tk-fn', v: 'verify' }, { tk: '', v: '({' }],
      [{ tk: '', v: '  endpoint: ' }, { tk: 'tk-str', v: '"https://some-agent.com"' }, { tk: '', v: ',' }],
      [{ tk: '', v: '  protocol: ' }, { tk: 'tk-str', v: '"a2a"' }, { tk: '', v: ',' }],
      [{ tk: '', v: '  timeout: ' }, { tk: 'tk-num', v: '5000' }, { tk: '', v: ',' }],
      [{ tk: '', v: '});' }],
      [],
      [{ tk: 'tk-var', v: 'console' }, { tk: '', v: '.' }, { tk: 'tk-fn', v: 'log' }, { tk: '', v: '(' }, { tk: 'tk-var', v: 'result' }, { tk: '', v: ');' }],
    ],
  },
  {
    name: 'verify.mjs',
    lang: 'javascript',
    code: [
      [{ tk: 'tk-com', v: '// verify any agent endpoint before interacting' }],
      [{ tk: 'tk-key', v: 'import' }, { tk: '', v: ' { Client } ' }, { tk: 'tk-key', v: 'from' }, { tk: '', v: ' ' }, { tk: 'tk-str', v: '"agentshark"' }, { tk: '', v: ';' }],
      [],
      [{ tk: 'tk-key', v: 'const' }, { tk: '', v: ' shark = ' }, { tk: 'tk-key', v: 'new' }, { tk: '', v: ' ' }, { tk: 'tk-cls', v: 'Client' }, { tk: '', v: '(' }, { tk: 'tk-str', v: '"shark_abc123"' }, { tk: '', v: ');' }],
      [],
      [{ tk: 'tk-key', v: 'const' }, { tk: '', v: ' result = ' }, { tk: 'tk-key', v: 'await' }, { tk: '', v: ' shark.' }, { tk: 'tk-fn', v: 'verify' }, { tk: '', v: '({' }],
      [{ tk: '', v: '  endpoint: ' }, { tk: 'tk-str', v: '"https://some-agent.com"' }, { tk: '', v: ',' }],
      [{ tk: '', v: '  protocol: ' }, { tk: 'tk-str', v: '"a2a"' }, { tk: '', v: ',' }],
      [{ tk: '', v: '  timeout: ' }, { tk: 'tk-num', v: '5000' }, { tk: '', v: ',' }],
      [{ tk: '', v: '});' }],
      [],
      [{ tk: 'tk-var', v: 'console' }, { tk: '', v: '.' }, { tk: 'tk-fn', v: 'log' }, { tk: '', v: '(' }, { tk: 'tk-var', v: 'result' }, { tk: '', v: ');' }],
    ],
  },
];

const responseLines: Token[][] = [
  [{ tk: '', v: '{' }],
  [{ tk: '', v: '  ' }, { tk: 'tk-str', v: '"reachable"' }, { tk: '', v: ': ' }, { tk: 'tk-num', v: 'true' }, { tk: '', v: ',' }],
  [{ tk: '', v: '  ' }, { tk: 'tk-str', v: '"a2a_compliant"' }, { tk: '', v: ': ' }, { tk: 'tk-num', v: 'true' }, { tk: '', v: ',' }],
  [{ tk: '', v: '  ' }, { tk: 'tk-str', v: '"mcp_manifest"' }, { tk: '', v: ': ' }, { tk: 'tk-num', v: 'true' }, { tk: '', v: ',' }],
  [{ tk: '', v: '  ' }, { tk: 'tk-str', v: '"x402_ready"' }, { tk: '', v: ': ' }, { tk: 'tk-num', v: 'true' }, { tk: '', v: ',' }],
  [{ tk: '', v: '  ' }, { tk: 'tk-str', v: '"latency_p95_ms"' }, { tk: '', v: ': ' }, { tk: 'tk-num', v: '142' }, { tk: '', v: ',' }],
  [{ tk: '', v: '  ' }, { tk: 'tk-str', v: '"score"' }, { tk: '', v: ': ' }, { tk: 'tk-num', v: '94' }, { tk: '', v: ',' }],
  [{ tk: '', v: '  ' }, { tk: 'tk-str', v: '"shark_id"' }, { tk: '', v: ': ' }, { tk: 'tk-str', v: '"shark_7a9f"' }],
  [{ tk: '', v: '}' }],
];

export default function Code() {
  const [active, setActive] = useState(0);
  const cur = tabs[active];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
      {/* Left — intro */}
      <div className="lg:col-span-4">
        <h2 className="font-display text-[clamp(2rem,3.4vw,2.5rem)] font-bold text-text-primary leading-[1.05] tracking-display text-balance reveal">
          One call.
          <br />
          <span className="text-text-secondary italic font-light">Real signal back.</span>
        </h2>
        <p className="mt-6 text-text-secondary text-base leading-relaxed reveal">
          Drop the MCP server URL into your agent's runtime. Register, verify, transact — typed, async, well-documented. SDKs in Python, TypeScript, and Go.
        </p>

        <div className="mt-8 flex flex-col gap-3 reveal">
          {[
            { l: 'pip install agentshark', c: 'python' },
            { l: 'npm install agentshark', c: 'typescript' },
            { l: 'go get github.com/agentsharkhq/agentshark/sdk/go', c: 'go' },
          ].map((cmd) => (
            <div key={cmd.l} className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-border bg-raised/40 hover:border-border-strong transition-colors duration-500">
              <code className="font-mono text-[12.5px] text-text-secondary">
                <span className="text-accent mr-2">$</span>
                {cmd.l}
              </code>
              <span className="font-mono text-[10px] tracking-widest text-text-tertiary uppercase">{cmd.c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — code editor + response panel */}
      <div className="lg:col-span-8 reveal space-y-5">
        {/* Editor */}
        <div className="bezel-outer">
          <div className="bezel-inner overflow-hidden">
            {/* Tab bar */}
            <div className="flex items-center border-b border-border bg-abyss/40">
              {tabs.map((tab, i) => (
                <button
                  key={tab.name}
                  onClick={() => setActive(i)}
                  className={`group relative flex items-center gap-2 px-5 py-3.5 font-mono text-[12px] transition-colors duration-500 ${
                    i === active ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                  {tab.name}
                  {i === active && (
                    <span className="absolute bottom-0 left-3 right-3 h-px bg-accent" style={{ boxShadow: '0 0 8px var(--color-accent)' }} />
                  )}
                </button>
              ))}
              <div className="ml-auto pr-4 flex items-center gap-2 font-mono text-[10px] text-text-tertiary uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                ready
              </div>
            </div>

            {/* Code body */}
            <div className="p-6 md:p-8 bg-abyss/30 font-mono text-[13px] leading-relaxed overflow-x-auto">
              <pre className="text-text-primary">
                {cur.code.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="select-none w-8 flex-shrink-0 text-right pr-4 text-text-quaternary tabular">
                      {i + 1}
                    </span>
                    <span className="flex-1 min-w-0 whitespace-pre">
                      {line.length === 0 ? '\u00A0' : line.map((token, j) => (
                        <span key={j} className={token.tk}>{token.v}</span>
                      ))}
                    </span>
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>

        {/* Response panel */}
        <div className="bezel-outer">
          <div className="bezel-inner overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-abyss/40">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[10px] tracking-widest text-text-tertiary uppercase">Response · 200 OK</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-text-tertiary uppercase tracking-widest">
                <span>142ms</span>
                <span className="w-1 h-1 rounded-full bg-text-tertiary" />
                <span>application/json</span>
              </div>
            </div>
            <div className="p-6 md:p-8 bg-abyss/30 font-mono text-[13px] leading-relaxed overflow-x-auto">
              <pre>
                {responseLines.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="select-none w-8 flex-shrink-0 text-right pr-4 text-text-quaternary tabular">
                      {i + 1}
                    </span>
                    <span className="flex-1 min-w-0 whitespace-pre">
                      {line.map((token, j) => (
                        <span key={j} className={token.tk}>{token.v}</span>
                      ))}
                    </span>
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
