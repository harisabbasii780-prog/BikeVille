import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Gauge, Scale, Zap } from 'lucide-react';
import { BIKES } from '../../data/bikes';
import { formatPKR, monthlyEmi } from '../../lib/format';
import Reveal from '../Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BikeGallery() {
  const [active, setActive] = useState(1);
  const bike = BIKES[active];

  return (
    <section id="range" aria-labelledby="range-heading" className="relative overflow-hidden bg-bone text-ink">
      {/* transition lip from the dark section above */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/12 to-transparent" aria-hidden="true" />

      <div className="shell relative py-20 sm:py-28 lg:py-36">
        <Reveal>
          <p className="eyebrow mb-5 flex items-center gap-3 text-ink/40">
            <span className="h-px w-10 bg-orange" />
            The Full Range
          </p>
        </Reveal>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={0.05}>
            <h2 id="range-heading" className="display text-[clamp(2.8rem,11vw,8.5rem)] leading-[0.82]">
              <span className="text-orange">Our</span> Bikes
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <Link
              to="/bikes"
              className="group inline-flex items-center gap-2 border-b-2 border-ink/15 pb-1 font-display text-[0.72rem] font-bold uppercase tracking-[0.22em] transition-colors hover:border-orange hover:text-orange"
            >
              See all {BIKES.length} machines
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_20.5rem] lg:gap-12">
          {/* rail of machines */}
          <div className="no-scrollbar -mx-[clamp(1.15rem,4.2vw,4.5rem)] overflow-x-auto px-[clamp(1.15rem,4.2vw,4.5rem)] lg:mx-0 lg:self-center lg:px-0">
            <ul className="flex min-w-max snap-x snap-mandatory items-center gap-2 sm:gap-4">
              {BIKES.map((b, i) => {
                const isActive = i === active;
                return (
                  <li key={b.id} className="snap-center">
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      aria-label={`Preview ${b.name}`}
                      className="group relative block w-[9.5rem] cursor-pointer px-1 pb-6 pt-4 text-left sm:w-[13rem] xl:w-[15rem]"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-4 left-1/2 h-4 w-[72%] -translate-x-1/2 rounded-[50%] bg-ink/25 blur-md transition-opacity duration-500 ${
                          isActive ? 'opacity-70' : 'opacity-20'
                        }`}
                      />
                      <motion.img
                        src={b.image}
                        alt={b.name}
                        loading="lazy"
                        width={1400}
                        height={1000}
                        animate={{
                          scale: isActive ? 1.12 : 0.92,
                          opacity: isActive ? 1 : 0.34,
                          filter: isActive ? 'grayscale(0)' : 'grayscale(1)',
                        }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="relative h-auto w-full object-contain"
                      />
                      <span
                        className={`mt-1 block text-center font-display text-[0.6rem] font-bold uppercase tracking-[0.16em] transition-colors duration-300 ${
                          isActive ? 'text-orange' : 'text-ink/30'
                        }`}
                      >
                        {b.short}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* detail card */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={bike.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="relative overflow-hidden rounded-[10px] bg-ink p-7 text-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_0%,rgba(255,90,0,0.28),transparent_65%)]"
                />
                <div className="relative">
                  <p className="eyebrow text-orange">{bike.categoryLabel}</p>
                  <h3 className="display mt-2 text-[1.6rem] leading-tight">{bike.name}</h3>
                  <p className="mt-2 text-[0.82rem] text-white/45">{bike.tagline}</p>

                  <ul className="mt-6 grid grid-cols-3 gap-2 border-y border-white/10 py-4">
                    {[
                      { Icon: Zap, v: `${bike.specs.powerHp}`, u: 'HP' },
                      { Icon: Gauge, v: bike.specs.torque.split(' ')[0], u: 'Nm' },
                      { Icon: Scale, v: bike.specs.weight.split(' ')[0], u: 'kg' },
                    ].map((s) => (
                      <li key={s.u} className="text-center">
                        <s.Icon size={14} className="mx-auto mb-1.5 text-orange" />
                        <span className="display block text-[1.05rem] leading-none">{s.v}</span>
                        <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.16em] text-white/35">
                          {s.u}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <img
                    src={bike.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="mx-auto my-5 h-28 w-full object-contain"
                  />

                  <p className="text-[0.66rem] uppercase tracking-[0.2em] text-white/35">Starting from</p>
                  <p className="display mt-1 text-[1.7rem] text-orange">{formatPKR(bike.price)}</p>
                  <p className="mt-1 text-[0.72rem] text-white/40">or {monthlyEmi(bike.price)} / month</p>

                  <Link
                    to={`/bikes/${bike.id}`}
                    className="group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-orange font-display text-[0.72rem] font-bold uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-white"
                  >
                    Explore Bike
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>
      </div>
    </section>
  );
}
