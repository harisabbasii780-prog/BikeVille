import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Gauge, Sparkles, Trophy, Wrench, Cog, Disc3, Frame, Waves } from 'lucide-react';
import { GhostButton, PrimaryButton } from '../Buttons';
import { featuredBikes } from '../../data/bikes';
import { HERO_FEATURES, SPEC_STRIP } from '../../data/site';

const EASE = [0.22, 1, 0.36, 1] as const;
const FEATURE_ICONS = [Trophy, Sparkles, Gauge];
const STRIP_ICONS = [Cog, Waves, Disc3, Frame];

export default function Hero() {
  const [active, setActive] = useState(0);
  const bike = featuredBikes[active];

  return (
    <section
      id="hero"
      className="grain relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink pb-28 pt-28 sm:pt-32 lg:pb-36"
      aria-labelledby="hero-heading"
    >
      {/* backdrop */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/scenes/showroom.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full scale-105 object-cover opacity-[0.28]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[radial-gradient(115%_85%_at_50%_45%,rgba(255,90,0,0.20),transparent_62%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/82 to-ink" />
        <div className="tech-grid absolute inset-0 opacity-60" />
      </div>

      {/* ambient orange floor glow */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/3 glow-orange blur-[6px]"
      />

      <div className="shell relative grid w-full items-center gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)_minmax(0,17.5rem)] lg:gap-6 xl:gap-10">
        {/* ---------------- left: message card ---------------- */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className="glass order-2 rounded-[28px] p-6 sm:p-8 lg:order-1"
        >
          <h1 id="hero-heading" className="display text-white">
            <span className="block text-[0.66rem] font-bold tracking-[0.42em] text-white/45">READY TO</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={`${bike.id}-a`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mt-1 block text-[clamp(2.6rem,7.6vw,3.9rem)] text-orange drop-shadow-[0_0_28px_rgba(255,90,0,0.45)]"
              >
                {bike.readyWords[0]}
              </motion.span>
            </AnimatePresence>
            <span className="mt-3 block text-[0.66rem] font-bold tracking-[0.42em] text-white/45">READY TO</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={`${bike.id}-b`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, delay: 0.06, ease: EASE }}
                className="mt-1 block text-[clamp(2.6rem,7.6vw,3.9rem)] text-white"
              >
                {bike.readyWords[1]}
              </motion.span>
            </AnimatePresence>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            className="mt-6 max-w-sm text-[0.92rem] leading-relaxed text-white/60"
          >
            Experience the thrill of performance and precision with the {bike.name}. Built for adrenaline.
            Born to dominate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
            className="mt-7 flex flex-col gap-3"
          >
            <PrimaryButton to="/bikes" size="lg" full>
              Explore Bikes
            </PrimaryButton>
            <GhostButton to="/about#accessories" size="lg" full>
              View Accessories
            </GhostButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
            className="mt-7 flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange/15 text-orange">
              <Gauge size={18} />
            </span>
            <span>
              <span className="display block text-[1.35rem] leading-none text-white">
                {bike.specs.powerHp} HP
              </span>
              <span className="mt-1 block text-[0.72rem] tracking-wide text-white/45">Peak Power</span>
            </span>
          </motion.div>
        </motion.div>

        {/* ---------------- center: the machine ---------------- */}
        <div className="relative order-1 flex flex-col items-center lg:order-2">
          <div className="relative w-full max-w-[46rem]">
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 glow-orange"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={bike.id}
                initial={{ opacity: 0, scale: 0.9, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -40 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative"
              >
                <motion.img
                  src={bike.image}
                  alt={`${bike.name} — ${bike.tagline}`}
                  width={1400}
                  height={1000}
                  fetchPriority="high"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 mx-auto h-auto w-full max-h-[46vh] object-contain drop-shadow-[0_46px_60px_rgba(0,0,0,0.75)] sm:max-h-[52vh]"
                />
                <img
                  src={bike.image}
                  alt=""
                  aria-hidden="true"
                  className="reflect pointer-events-none absolute inset-x-0 top-full mx-auto -mt-6 h-auto w-full max-h-[16vh] object-contain opacity-30 blur-[2px]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* model switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
            className="relative z-20 mt-4 flex flex-wrap items-center justify-center gap-2"
            role="tablist"
            aria-label="Select a featured machine"
          >
            {featuredBikes.map((b, i) => (
              <button
                key={b.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`rounded-full border px-4 py-2 font-display text-[0.63rem] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                  i === active
                    ? 'border-transparent bg-white text-ink shadow-[0_8px_24px_-8px_rgba(255,255,255,0.5)]'
                    : 'border-white/12 bg-white/[0.04] text-white/55 hover:border-orange/50 hover:text-white'
                }`}
              >
                {b.short}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ---------------- right: value cards ---------------- */}
        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.55 } } }}
          className="order-3 grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1"
        >
          {HERO_FEATURES.map((f, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <motion.li
                key={f.title}
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
                }}
                className="group rounded-2xl border border-white/8 bg-white/[0.03] p-4 backdrop-blur-md transition-colors duration-300 hover:border-orange/45 hover:bg-orange/[0.07]"
              >
                <span className="mb-3 grid h-8 w-8 place-items-center rounded-lg bg-orange/15 text-orange transition-transform duration-300 group-hover:scale-110">
                  <Icon size={15} />
                </span>
                <h2 className="text-[0.84rem] font-bold text-white">{f.title}</h2>
                <p className="mt-1 text-[0.74rem] leading-snug text-white/45">{f.body}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      {/* ---------------- bottom: spec strip ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: EASE }}
        className="shell relative z-10 mt-10 lg:absolute lg:inset-x-0 lg:bottom-8 lg:mt-0"
      >
        <ul className="glass no-scrollbar mx-auto flex max-w-4xl snap-x gap-3 overflow-x-auto rounded-2xl px-4 py-3.5 sm:justify-between sm:gap-5 sm:px-6">
          {SPEC_STRIP.map((s, i) => {
            const Icon = STRIP_ICONS[i];
            return (
              <li key={s.title} className="flex min-w-[9.5rem] shrink-0 snap-start items-center gap-2.5 sm:min-w-0">
                <Icon size={17} className="shrink-0 text-orange" />
                <span>
                  <span className="block text-[0.76rem] font-bold text-white">{s.title}</span>
                  <span className="block text-[0.68rem] text-white/40">{s.body}</span>
                </span>
              </li>
            );
          })}
          <li className="hidden items-center gap-2 xl:flex">
            <Wrench size={17} className="shrink-0 text-orange" />
            <span>
              <span className="block text-[0.76rem] font-bold text-white">Free 3 Services</span>
              <span className="block text-[0.68rem] text-white/40">On every new bike</span>
            </span>
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
