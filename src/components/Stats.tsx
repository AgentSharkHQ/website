import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const items = [
  { v: 96, p: '', s: '%', l: 'of A2A agents fail to respond', src: 'A2A Project Issue #1755', href: 'https://github.com/a2aproject/A2A/issues/1755', c: '#EF4444' },
  { v: 206, p: '$', s: 'B', l: 'in agent software spend (2026)', src: 'Gartner, June 2026', href: '', c: '#3388FF' },
  { v: 40, p: '', s: '%', l: 'of enterprise apps embed agents by end 2026', src: 'Gartner, 2026', href: '', c: '#22D3EE' },
  { v: 380, p: '', s: 'K+', l: 'developers building MCP agents', src: 'GitHub: OpenClaw, June 2026', href: '', c: '#818CF8' },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-150px' });

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
      {items.map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.12 }}>
          <div className="flex items-baseline gap-0.5" style={{ color: item.c }}>
            {item.p && <span className="text-2xl md:text-3xl font-light opacity-70">{item.p}</span>}
            <span className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight tabular-nums">{inView ? item.v : 0}</span>
            <span className="text-2xl md:text-3xl font-light opacity-70">{item.s}</span>
          </div>
          <p className="mt-2 text-text-secondary text-sm leading-relaxed">{item.l}</p>
          {item.href ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-xs text-text-tertiary hover:text-text-secondary transition-colors underline decoration-surface underline-offset-4">{item.src}</a> : <p className="mt-2 text-xs text-text-tertiary">{item.src}</p>}
        </motion.div>
      ))}
    </div>
  );
}
