import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { STATS, TRUST_POINTS } from '../../data/site';
import { PrimaryButton } from '../Buttons';
import Reveal from '../Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TrustSection() {
  return (
    <section id="trust" aria-labelledby="trust-heading" className="bg-white text-ink">
      <div className="shell grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
        {/* stacked imagery */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative z-10 w-[78%] rounded-[10px] bg-[#f2f0ed] p-6 shadow-[0_40px_80px_-50px_rgba(0,0,0,0.5)]"
          >
            <img
              src="/images/bikes/adventure.webp"
              alt="Adventure touring motorcycle studio render"
              loading="lazy"
              width={1400}
              height={1000}
              className="h-auto w-full object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="absolute -bottom-10 right-0 z-20 w-[52%] rounded-[10px] bg-white p-5 shadow-[0_30px_70px_-34px_rgba(0,0,0,0.55)] ring-1 ring-ink/5"
          >
            <img
              src="/images/bikes/enduro.webp"
              alt="Enduro motorcycle studio render"
              loading="lazy"
              width={1400}
              height={1000}
              className="h-auto w-full object-contain"
            />
          </motion.div>

          <span
            aria-hidden="true"
            className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-orange/12 blur-2xl"
          />
        </div>

        {/* copy */}
        <div className="mt-12 lg:mt-0">
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3 text-ink/40">
              <span className="h-px w-10 bg-orange" />
              Why Bikeville
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="trust-heading" className="display text-[clamp(2rem,5.6vw,3.6rem)] leading-[0.95]">
              Ridden by Passion.
              <br />
              <span className="text-orange">Powered by Trust.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {TRUST_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[0.9rem] leading-snug text-ink/70">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange text-ink">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-10 grid grid-cols-3 gap-4 border-y border-ink/10 py-7">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              >
                <p className="display text-[clamp(1.6rem,4.6vw,2.6rem)] text-ink">{s.value}</p>
                <p className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-ink/45">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.16}>
            <div className="mt-8">
              <PrimaryButton to="/about" size="lg">
                Our Story
              </PrimaryButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
