const columns = [
  {
    title: 'Product',
    links: [
      { l: 'Overview', h: '#what' },
      { l: 'The Stack', h: '#stack' },
      { l: 'How it works', h: '#developers' },
      { l: 'Pricing', h: '#pricing' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { l: 'Documentation', h: 'https://docs.agentshark.dev', ext: true },
      { l: 'API Reference', h: 'https://docs.agentshark.dev/api', ext: true },
      { l: 'MCP Server', h: 'https://docs.agentshark.dev/mcp', ext: true },
      { l: 'GitHub', h: 'https://github.com/agentsharkhq/agentshark', ext: true },
      { l: 'Status', h: 'https://status.agentshark.dev', ext: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { l: 'About', h: '#' },
      { l: 'Blog', h: 'https://blog.agentshark.dev', ext: true },
      { l: 'Brand', h: '#' },
      { l: 'Contact', h: 'mailto:hello@agentshark.dev' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { l: 'Privacy', h: '#' },
      { l: 'Terms', h: '#' },
      { l: 'Security', h: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
      {/* Brand + newsletter — left column */}
      <div className="lg:col-span-4 flex flex-col gap-5">
        <div className="flex items-center gap-2.5">
          <img src="/logo.svg" alt="AgentShark" className="w-6 h-6" />
          <span className="font-display text-sm font-semibold text-text-primary tracking-tight">AgentShark</span>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
          The operating system for the AI agent economy. One MCP server. Eleven layers.
        </p>

        {/* Newsletter — single-line input, no bezel */}
        <form onSubmit={(e) => e.preventDefault()} className="mt-1 max-w-sm">
          <label htmlFor="footer-newsletter" className="block font-mono text-[10px] tracking-widest text-text-tertiary uppercase mb-2">
            Get release notes
          </label>
          <div className="flex items-center gap-2">
            <input
              id="footer-newsletter"
              type="email"
              placeholder="you@company.com"
              className="flex-1 bg-transparent border-b border-border focus:border-accent py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none transition-colors"
              required
            />
            <button
              type="submit"
              className="group inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Subscribe"
            >
              <span>Subscribe</span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-border group-hover:border-accent transition-colors">
                <svg className="w-2.5 h-2.5 transition-transform duration-500 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Link columns */}
      <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-mono text-[10px] tracking-widest text-text-tertiary uppercase mb-3.5">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.l}>
                  <a
                    href={link.h}
                    target={link.ext ? '_blank' : undefined}
                    rel={link.ext ? 'noopener noreferrer' : undefined}
                    className="text-[13.5px] text-text-secondary hover:text-text-primary transition-colors duration-300"
                  >
                    {link.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom strip */}
      <div className="lg:col-span-12 pt-6 mt-2 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3 font-mono text-[10px] tracking-widest text-text-tertiary uppercase">
        <p>© 2026 AgentShark · Built for the agent economy</p>
        <div className="flex items-center gap-2">
          <span className="live-dot" style={{ background: 'var(--color-success)', boxShadow: '0 0 8px var(--color-success)' }} />
          <span>All systems operational</span>
        </div>
      </div>
    </div>
  );
}
