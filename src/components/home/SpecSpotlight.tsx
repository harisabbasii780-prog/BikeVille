import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Settings2 } from 'lucide-react';
import { featuredBikes } from '../../data/bikes';
import { formatPKR, monthlyEmi } from '../../lib/format';
import { GhostButton, PrimaryButton } from '../Buttons';
import Reveal from '../Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function SpecSpotlight() {
  const [active, setActive] = useState(1);
  const bike = featuredBikes[active];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 1.1, 0.75]);

  const rows: Array<[string, string]> = [
    ['Model', `${bike.model} · ${bike.year}`],
    ['Engine', bike.specs.engine],
    ['Power', bike.specs.power],
    ['Torque', bike.specs.torque],
    ['Weight', bike.specs.weight],
    ['Transmission', bike.specs.transmission],
  ];

  return (
    <section
      ref={ref}
      id="performance"
      aria-labelledby="performance-heading"
      className="grain relative isolate overflow-hidden bg-ink py-20 sm:py-28 lg:py-36"
    >
      <div className="tech-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        style={{ scale: glowScale }}
        className="pointer-events-none absolute -left-40 top-1/3 h-[38rem] w-[38rem] glow-orange opacity-70"
      />

      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div>
              <p className="eyebrow mb-4 flex items-center gap-3 text-orange">
                <span className="h-px w-10 bg-orange" />
                Configuration
              </p>
              <h2 id="performance-heading" className="display text-[clamp(2.4rem,8vw,5.6rem)] text-white">
                Pure Performance
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose a machine to inspect">
              {featuredBikes.map((b, i) => (
                <button
                  key={b.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`rounded-full border px-4 py-2 font-display text-[0.62rem] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                    i === active
                      ? 'border-orange bg-orange text-ink'
                      : 'border-white/12 text-white/50 hover:border-white/35 hover:text-white'
                  }`}
                >
                  {b.short}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* image side */}
          <motion.div style={{ y: imgY }} className="relative">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 glow-orange sm:h-[32rem] sm:w-[32rem]"
            />
            <AnimatePresence mode="wait">
              <motion.img
                key={bike.id}
                src={bike.image}
                alt={`${bike.name} studio render`}
                loading="lazy"
                width={1400}
                height={1000}
                initial={{ opacity: 0, scale: 0.92, rotate: -1.5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative mx-auto h-auto w-full max-w-2xl object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.7)]"
              />
            </AnimatePresence>

            <div className="relative mt-2 flex flex-wrap justify-center gap-2">
              {bike.highlights.slice(0, 3).map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.66rem] font-semibold text-white/55"
                >
                  {h}
                </span>
              ))}
            </div>
          </motion.div>

          {/* detail side */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={bike.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="eyebrow text-orange">{bike.categoryLabel}</p>
                <h3 className="display mt-3 text-[clamp(1.7rem,4.4vw,2.6rem)] text-white">{bike.name}</h3>
                <p className="mt-3 max-w-lg text-[0.94rem] leading-relaxed text-white/55">{bike.description}</p>

                <dl className="mt-8 divide-y divide-white/8 border-y border-white/8">
                  {rows.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-6 py-3">
                      <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-white/35">{k}</dt>
                      <dd className="text-right text-[0.88rem] font-semibold text-white">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-[0.66rem] uppercase tracking-[0.2em] text-white/35">Price</p>
                    <p className="display mt-1 text-[clamp(1.8rem,4vw,2.4rem)] text-orange">
                      {formatPKR(bike.price)}
                    </p>
                    <p className="mt-1 text-[0.74rem] text-white/40">EMI from {monthlyEmi(bike.price)} / month</p>
                  </div>
                  <p className="flex items-center gap-2 text-[0.8rem] font-semibold text-white/70">
                    <CheckCircle2 size={16} className="text-orange" />
                    {bike.availability}
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <PrimaryButton to={`/bikes/${bike.id}?configure=1`} size="lg" icon={<Settings2 size={15} />}>
                    Configure &amp; Customize
                  </PrimaryButton>
                  <GhostButton to={`/bikes/${bike.id}`} size="lg">
                    Explore Bike
                  </GhostButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
