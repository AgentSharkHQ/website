import { useEffect, useRef, useState } from 'react';

const wordmarks = [
  { name: 'MCP', sub: 'Model Context Protocol' },
  { name: 'A2A', sub: 'Agent-to-Agent v1.0' },
  { name: 'x402', sub: 'HTTP 402 Payments' },
  { name: 'ERC-8004', sub: 'On-chain Identity' },
  { name: 'OpenClaw', sub: '380K · Agent Runtime' },
  { name: 'Hermes', sub: 'Self-improving Agent' },
  { name: 'LangGraph', sub: 'Agent Orchestration' },
  { name: 'CrewAI', sub: 'Multi-agent Teams' },
  { name: 'AutoGen', sub: 'Microsoft Research' },
  { name: 'Claude', sub: 'MCP-native Client' },
];

function Wordmark({ name, sub }: { name: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-border bg-raised/30 hover:bg-raised/60 hover:border-border-strong transition-colors duration-300">
      <span className="font-display text-sm font-semibold text-text-primary tracking-tight whitespace-nowrap">{name}</span>
      <span className="hidden md:inline w-px h-3 bg-border" />
      <span className="hidden md:inline font-mono text-[10px] tracking-widest text-text-tertiary uppercase whitespace-nowrap">{sub}</span>
    </div>
  );
}

/**
 * TrustedBy — protocol marquee.
 *
 * Animation is JS-driven (requestAnimationFrame) instead of CSS @keyframes.
 * Why: CSS @keyframes snap from -50% back to 0% at iteration end. Even with
 * identical duplicated content, the snap is visible (subpixel rendering,
 * font hinting, pill-edge anti-aliasing) and reads as a jump. A CSS
 * `animation-play-state: paused` also freezes the bar mid-frame, which the
 * eye reads as a jump because the expected position doesn't match the
 * actual position.
 *
 * The JS loop increments an unbounded `position` value (pixels travelled
 * leftward). The track renders 3 copies of the wordmark list, so as long
 * as the offset is an integer multiple of one copy width, the visible
 * content is identical. By never wrapping the position back to 0, the
 * track moves continuously — there is no "snap point" where the visible
 * content could shift. Position grows unbounded, but JS numbers safely
 * hold 2^53 (~285,000 years of continuous animation before precision loss).
 *
 * The hover-pause uses the same easing approach: `speed` lerps toward
 * `targetSpeed` at a fixed rate, so the bar decelerates into stillness
 * over ~250ms rather than slamming to a stop.
 */
export default function TrustedBy() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const items = [...wordmarks, ...wordmarks, ...wordmarks];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // We render 3 copies of the wordmark list, so one "copy width" is
    // exactly scrollWidth / 3. As long as the track is translated by an
    // integer multiple of one copy width, the visible content is identical
    // (because the copies are identical). So the animation just keeps
    // incrementing a "position" value and uses it raw — no modulo wrap
    // is needed at the offset level, and that means no wrap discontinuity
    // is ever visible to the user.
    const getCopyWidth = () => el.scrollWidth / 3;

    // State held in a plain object (not React state) to avoid re-renders
    // on every animation frame.
    const state = {
      position: 0,        // total pixels the track has travelled leftward
      speed: reduced ? 0 : 1,    // current speed multiplier, eased toward target
      targetSpeed: reduced ? 0 : 1,
      lastTime: performance.now(),
    };

    const onEnter = () => { state.targetSpeed = 0; };
    const onLeave = () => { state.targetSpeed = 1; };

    // Use the entire marquee wrapper (parent .relative) as the hover target
    // so the bar pauses when the cursor is anywhere over the strip, not
    // just when it's exactly over a wordmark pill.
    const section = el.parentElement;
    if (section) {
      section.addEventListener('mouseenter', onEnter);
      section.addEventListener('mouseleave', onLeave);
      section.addEventListener('touchstart', onEnter, { passive: true });
      section.addEventListener('touchend', onLeave, { passive: true });
    }

    let rafId = 0;
    // Time (ms) the track takes to travel one full copy width.
    // 38s for a ~3440px-wide copy is roughly 90px/sec — a calm, premium pace.
    const DURATION_MS = 38000;
    // Easing rate for the speed → targetSpeed interpolation. 0.12 = ~250ms
    // to reach ~99% of the target, which feels like a natural decelerate
    // rather than a hard stop.
    const EASE_RATE = 0.12;

    const tick = (now: number) => {
      // Cap dt at 100ms so a long tab-hide (which pauses RAF) doesn't cause
      // a visible jump when the user returns to the tab.
      const dt = Math.min(now - state.lastTime, 100);
      state.lastTime = now;

      // Smoothly approach the target speed. This is what makes the pause
      // feel natural — the bar decelerates into stillness over ~250ms
      // rather than slamming to a stop, and accelerates back smoothly.
      state.speed += (state.targetSpeed - state.speed) * EASE_RATE;

      // Advance the absolute position. When speed is 0, position stops
      // advancing and the bar is visually frozen. When speed is 1, it
      // advances at the full DURATION_MS / copyWidth rate.
      state.position += (dt / DURATION_MS) * state.speed * getCopyWidth();

      // The offset is a (large) negative number that grows each frame.
      // Because the track content is periodic with period = one copy
      // width, the *visible* content is identical to translate3d at
      // any offset that's an integer multiple of copyWidth away.
      // We deliberately do NOT modulo the offset here. The track moves
      // continuously, never "snaps" back. Position grows unbounded;
      // JavaScript's safe integer limit is 2^53, which is roughly
      // 285,000 years of continuous animation before any precision loss.
      el.style.transform = `translate3d(${-state.position}px, 0, 0)`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (section) {
        section.removeEventListener('mouseenter', onEnter);
        section.removeEventListener('mouseleave', onLeave);
        section.removeEventListener('touchstart', onEnter);
        section.removeEventListener('touchend', onLeave);
      }
    };
  }, [reduced]);

  return (
    <section className="relative py-10 md:py-14 border-y border-border bg-void/30 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">
            Built for every protocol the agent economy is built on
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary uppercase">
            protocol-neutral · no lock-in
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Edge fades — wide enough to fully mask a single wordmark pill
            (max ~360px wide) as it scrolls in from either side. 320px
            covers even the longest "Microsoft Research" pill with margin. */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{ width: '320px', background: 'linear-gradient(to right, var(--color-abyss) 0%, var(--color-abyss) 30%, transparent 100%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{ width: '320px', background: 'linear-gradient(to left, var(--color-abyss) 0%, var(--color-abyss) 30%, transparent 100%)' }}
          aria-hidden="true"
        />

        {/* Track — 3 copies of the list so the modulo wrap is invisible
            (progress at 0.99 and 0.01 show the same wordmark in the same
            position, separated by exactly one copy width). */}
        <div ref={trackRef} className="marquee-track" style={{ willChange: 'transform' }}>
          {items.map((w, i) => (
            <Wordmark key={`${w.name}-${i}`} name={w.name} sub={w.sub} />
          ))}
        </div>
      </div>
    </section>
  );
}
