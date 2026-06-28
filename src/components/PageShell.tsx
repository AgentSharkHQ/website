import { useEffect } from 'react';
import type { ReactNode } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

/**
 * Shared chrome for every page: ambient background, nav, footer, and the
 * scroll-reveal observer. `routePrefix` makes in-page anchor links
 * (#what, #pricing, ...) resolve back to the landing page when used on a
 * sub-route — pass "/" on /about, leave default "" on the landing page.
 */
export default function PageShell({
  children,
  routePrefix = '',
}: {
  children: ReactNode;
  routePrefix?: string;
}) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-abyss">
      <div className="grain-overlay" />
      <div className="dot-grid" />
      <div className="orb orb-3" />

      <div className="relative z-10">
        <NavBar routePrefix={routePrefix} />
        {children}
        <section className="relative">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10 py-12 border-t border-border">
            <Footer routePrefix={routePrefix} />
          </div>
        </section>
      </div>
    </div>
  );
}
