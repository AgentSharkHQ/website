import { useState, useEffect, useRef } from 'react';

const navItems = [
  { label: 'Product', href: '#what' },
  { label: 'Stack', href: '#stack' },
  { label: 'Developers', href: '#developers' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: 'https://docs.agentshark.dev', external: true },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress(total > 0 ? Math.min(1, y / total) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none px-4 pt-4 md:pt-6"
      >
        <div
          ref={pillRef}
          className={`pointer-events-auto relative flex items-center gap-1 md:gap-2 pl-4 pr-1.5 py-1.5 rounded-full border transition-[background,border,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled
              ? 'border-border bg-raised/70 backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.04),0_8px_32px_-8px_rgba(0,0,0,0.6)]'
              : 'border-transparent bg-transparent'
          }`}
        >
          <a href="/" className="flex items-center gap-2.5 pr-3 md:pr-4 md:mr-1 border-r border-border h-7">
            <img src="/logo.svg" alt="AgentShark" className="w-5 h-5" />
            <span className="font-display text-sm font-semibold text-text-primary tracking-tight">AgentShark</span>
          </a>

          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="group relative px-3.5 py-1.5 text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-300 rounded-full"
              >
                {item.label}
                <span className="absolute left-1/2 -bottom-0.5 h-px w-0 bg-accent transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:w-3/4 -translate-x-1/2" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 pl-2 ml-1 border-l border-border h-7">
            <a
              href="https://app.agentshark.dev"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 bg-text-primary text-abyss text-[13px] font-semibold rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_0_24px_-4px_rgba(255,255,255,0.3)] active:scale-[0.98]"
            >
              Launch App
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-abyss/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors text-text-primary"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <div className="flex flex-col gap-[5px] items-center justify-center w-5 h-5">
              <span className={`hamburger-line ${open ? 'open top' : ''}`} />
              <span className={`hamburger-line ${open ? 'open mid' : ''}`} />
              <span className={`hamburger-line ${open ? 'open bot' : ''}`} />
            </div>
          </button>

          {/* Scroll progress hairline */}
          <div
            className="absolute left-0 right-0 -bottom-px h-px overflow-hidden rounded-full pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="h-full bg-gradient-to-r from-accent via-accent-bright to-cyan"
              style={{ width: `${progress * 100}%`, boxShadow: '0 0 8px var(--color-accent)' }}
            />
          </div>
        </div>
      </nav>

      {/* Mobile expanded menu — staggered mask reveal */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-abyss/85 backdrop-blur-3xl" />
        <div className="relative h-full flex flex-col items-center justify-center gap-10">
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className={`text-3xl font-display font-semibold tracking-tight transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: open ? `${100 + i * 70}ms` : '0ms',
                color: 'var(--color-text-primary)',
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://app.agentshark.dev"
            onClick={() => setOpen(false)}
            className={`mt-6 group inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-abyss text-sm font-semibold rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: open ? `${100 + navItems.length * 70}ms` : '0ms' }}
          >
            Launch App
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-abyss/15">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
