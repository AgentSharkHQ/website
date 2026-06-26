import { useEffect, useRef, useState } from 'react';

type Stat = { v: number; p: string; s: string; l: string; src: string; c: string; big?: boolean };

const items: Stat[] = [
  { v: 11, p: '', s: '', l: 'missing layers in the agent stack. AgentShark is the platform that ships all of them.', src: 'A2A · MCP · x402 · ERC-8004', c: '#4F8AFF', big: true },
  { v: 96, p: '', s: '%', l: 'of A2A agents fail to respond on first probe', src: 'A2A Project · Issue #1755', c: '#F87171' },
  { v: 30, p: '$', s: 'T', l: 'projected agent economy GMV by 2030', src: 'McKinsey · 2026', c: '#22D3EE' },
  { v: 380, p: '', s: 'K+', l: 'developers building on OpenClaw alone', src: 'GitHub · June 2026', c: '#A78BFA' },
];

function Counter({ to, inView, dur = 1400 }: { to: number; inView: boolean; dur?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, inView, dur]);
  return <>{n}</>;
}

export default function Numbers() {
  const ref = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (!ghostRef.current) return;
        const rect = ghostRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        // -1 (above center) to 1 (below center)
        const t = (rect.top + rect.height / 2 - vh / 2) / vh;
        setScrollY(-t * 30); // subtle 30px range
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const big = items.find((i) => i.big)!;
  const small = items.filter((i) => !i.big);

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
      {/* Large anchor — Asymmetrical Bento hero tile */}
      <div className="lg:col-span-2 lg:row-span-2">
        <div className="bezel-outer h-full">
          <div className="bezel-inner p-7 md:p-10 h-full flex flex-col justify-between min-h-[320px] relative overflow-hidden">
            {/* Background number — huge, ghosted, scroll-parallaxed */}
            <div
              ref={ghostRef}
              className="absolute -right-4 -bottom-8 font-display font-bold leading-[0.85] tracking-hero pointer-events-none select-none tabular will-change-transform"
              style={{
                color: 'rgba(79, 138, 255, 0.04)',
                fontSize: 'clamp(10rem, 20vw, 16rem)',
                transform: `translate3d(0, ${scrollY}px, 0)`,
                transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              aria-hidden="true"
            >
              11
            </div>

            <div className="relative">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-text-tertiary uppercase">
                <span className="live-dot" />
                The state of the agent stack
              </span>
            </div>

            <div className="relative">
              <div className="flex items-baseline gap-2 tabular" style={{ color: big.c }}>
                <span className="font-display text-[clamp(4rem,8vw,6.5rem)] font-bold tracking-hero leading-[0.9]">
                  <Counter to={big.v} inView={inView} />
                </span>
                <span className="font-mono text-[10px] text-text-tertiary tracking-widest uppercase">layers</span>
              </div>
              <p className="mt-5 text-text-secondary text-base md:text-lg max-w-md leading-relaxed">
                {big.l}
              </p>
              <p className="mt-3 font-mono text-[10px] text-text-tertiary uppercase tracking-widest">
                {big.src}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Three small — stacked */}
      {small.map((item, i) => (
        <div key={i} className="bezel-outer">
          <div className="bezel-inner p-5 md:p-7">
            <div className="flex items-baseline gap-1 tabular" style={{ color: item.c }}>
              {item.p && <span className="text-sm font-light opacity-60">{item.p}</span>}
              <span className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                <Counter to={item.v} inView={inView} />
              </span>
              <span className="text-sm font-light opacity-60">{item.s}</span>
            </div>
            <p className="mt-2.5 text-text-secondary text-[13px] leading-relaxed">{item.l}</p>
            <p className="mt-2 font-mono text-[9px] text-text-tertiary uppercase tracking-widest">{item.src}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
