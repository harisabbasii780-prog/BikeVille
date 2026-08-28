import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Clock, Bike as BikeIcon } from 'lucide-react';
import { SHOWCASE_SLIDES, STATS } from '../../data/site';
import { PrimaryButton } from '../Buttons';

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 6500;
const STAT_ICONS = [Clock, BikeIcon];

export default function ShowroomShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 0.62, 0.9]);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % SHOWCASE_SLIDES.length), DURATION);
    return () => window.clearTimeout(t);
  }, [index, paused]);

  const slide = SHOWCASE_SLIDES[index];

  return (
    <section
      ref={ref}
      id="showroom"
      aria-labelledby="showroom-heading"
      className="grain relative isolate h-[min(92svh,860px)] min-h-[520px] w-full overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.02 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ opacity: { duration: 1.1, ease: EASE }, scale: { duration: 7.5, ease: 'linear' } }}
          className="absolute inset-0"
          style={{ y: imgY }}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.96)_2%,rgba(5,5,5,0.42)_45%,rgba(5,5,5,0.72)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_100%,rgba(255,90,0,0.28),transparent_65%)]"
      />

      <div className="shell relative flex h-full flex-col justify-between py-16 sm:py-20">
        {/* slide selector */}
        <div className="flex justify-end">
          <div className="w-full max-w-sm text-right">
            <AnimatePresence mode="wait">
              <motion.p
                key={slide.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="display text-[clamp(1.1rem,2.6vw,1.75rem)] text-white"
              >
                {slide.label}
              </motion.p>
            </AnimatePresence>
            <div className="mt-4 flex justify-end gap-2" role="tablist" aria-label="Showcase slides">
              {SHOWCASE_SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={s.label}
                  onClick={() => setIndex(i)}
                  className="group h-6 w-16 sm:w-24"
                >
                  <span className="block h-[3px] w-full overflow-hidden rounded-full bg-white/22">
                    <motion.span
                      key={`${s.id}-${index}`}
                      className="block h-full bg-orange"
                      initial={{ width: '0%' }}
                      animate={{ width: i === index ? '100%' : '0%' }}
                      transition={{ duration: i === index ? DURATION / 1000 : 0.35, ease: 'linear' }}
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* caption + stats */}
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <p className="eyebrow mb-4 flex items-center gap-3 text-orange">
                  <span className="h-px w-10 bg-orange" />
                  The Showroom
                </p>
                <h2
                  id="showroom-heading"
                  className="display text-[clamp(2.4rem,7.4vw,5.6rem)] text-white"
                >
                  {slide.heading}
                </h2>
                <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white/60 sm:text-base">
                  {slide.body}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8">
              <PrimaryButton to="/bikes" size="lg">
                Explore the Range
              </PrimaryButton>
            </div>
          </div>

          <ul className="flex gap-3">
            {STATS.slice(0, 2).map((s, i) => {
              const Icon = STAT_ICONS[i];
              return (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.12 * i, ease: EASE }}
                  className="glass min-w-[8.5rem] rounded-2xl px-5 py-4"
                >
                  <Icon size={16} className="mb-2.5 text-orange" />
                  <span className="display block text-[1.6rem] leading-none text-white">{s.value}</span>
                  <span className="mt-1.5 block text-[0.7rem] tracking-wide text-white/45">{s.label}</span>
                </motion.li>
              );
            })}
            <motion.li
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
              className="hidden sm:block"
            >
              <a
                href="#range"
                className="glass grid h-full min-w-[3.6rem] place-items-center rounded-2xl px-4 text-white/70 transition-colors hover:text-orange"
                aria-label="Jump to the bike range"
              >
                <ArrowUpRight size={20} />
              </a>
            </motion.li>
          </ul>
        </div>
      </div>
    </section>
  );
}
