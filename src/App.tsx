import { useEffect } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Numbers from './components/Numbers';
import What from './components/What';
import Features from './components/Features';
import How from './components/How';
import Flow from './components/Flow';
import Code from './components/Code';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative ${className}`}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10">{children}</div>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    // Observe single elements with .reveal
    const single = document.querySelectorAll('.reveal');
    // Observe containers with .reveal-stagger
    const stagger = document.querySelectorAll('.reveal-stagger');

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

    single.forEach((el) => io.observe(el));
    stagger.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-abyss">
      {/* Fixed ambient layers — grain, dot grid, orbs */}
      <div className="grain-overlay" />
      <div className="dot-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="relative z-10">
        <NavBar />

        <Hero />

        <TrustedBy />

        <Section className="py-20 md:py-24">
          <Numbers />
        </Section>

        <Section className="py-20 md:py-24">
          <What />
        </Section>

        <Section className="py-20 md:py-24">
          <Features />
        </Section>

        <Section className="py-20 md:py-24">
          <How />
        </Section>

        {/* Scrollytelling section — no padding wrapper so the sticky engages immediately */}
        <section className="relative">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10">
            <Flow />
          </div>
        </section>

        <Section className="py-20 md:py-24">
          <Code />
        </Section>

        <Section className="py-20 md:py-24">
          <Pricing />
        </Section>

        <Section className="py-20 md:py-24">
          <CTA />
        </Section>

        <Section className="py-12 border-t border-border">
          <Footer />
        </Section>
      </div>
    </div>
  );
}
