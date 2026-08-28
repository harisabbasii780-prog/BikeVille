import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GhostButton, PrimaryButton } from '../Buttons';
import { RevealWords } from '../Reveal';
import { BRAND } from '../../data/site';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.16, 1.02]);

  return (
    <section
      ref={ref}
      id="cta"
      aria-labelledby="cta-heading"
      className="grain relative isolate flex min-h-[78svh] items-center overflow-hidden bg-ink"
    >
      <motion.img
        src="/images/scenes/horizon.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.97)_5%,rgba(5,5,5,0.55)_50%,rgba(5,5,5,0.85)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_60%,rgba(255,90,0,0.24),transparent_70%)]"
      />

      <div className="shell relative py-24 text-center sm:py-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="eyebrow mb-6 text-orange"
        >
          {BRAND.claim}
        </motion.p>

        <h2 id="cta-heading" className="display mx-auto max-w-5xl text-[clamp(2.5rem,9.5vw,7rem)] text-white">
          <RevealWords text="Find Your Next Ride" />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          className="mx-auto mt-7 max-w-xl text-[0.98rem] leading-relaxed text-white/60"
        >
          Book a test ride, configure your build or just come and stand next to something loud. The
          workshop doors are open seven days a week.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <PrimaryButton to="/bikes" size="lg">
            Explore Bikes
          </PrimaryButton>
          <GhostButton to="/contact" size="lg">
            Contact Us
          </GhostButton>
        </motion.div>
      </div>
    </section>
  );
}
