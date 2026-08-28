import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../../data/bikes';
import Reveal from '../Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BrowseByType() {
  return (
    <section id="types" aria-labelledby="types-heading" className="bg-cream text-ink">
      <div className="shell py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow mb-4 text-ink/40">Discover</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="types-heading" className="display text-[clamp(2.2rem,7vw,4.4rem)]">
              Browse by Type
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-lg text-[0.95rem] leading-relaxed text-ink/55">
              Six disciplines, one obsession. Pick the terrain and we will point you at the machine that
              owns it.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <motion.li
              key={c.id}
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: (i % 3) * 0.08, ease: EASE }}
            >
              <Link
                to={`/bikes?category=${c.id}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[10px] bg-ink sm:aspect-[3/4]"
              >
                <img
                  src={c.image}
                  alt={`${c.label} motorcycles`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-[transform,opacity,filter] duration-[900ms] ease-out group-hover:scale-110 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.94)_6%,rgba(5,5,5,0.25)_52%,rgba(5,5,5,0.35)_100%)] transition-opacity duration-700 group-hover:opacity-80"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(to top, rgba(255,90,0,0.42), transparent 55%)',
                  }}
                />

                <span className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rotate-45 bg-orange transition-transform duration-500 group-hover:scale-150" />
                  <span className="font-display text-[0.6rem] font-bold uppercase tracking-[0.26em] text-white/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>

                <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white opacity-0 transition-all duration-500 group-hover:border-orange group-hover:bg-orange group-hover:text-ink group-hover:opacity-100">
                  <ArrowUpRight size={17} />
                </span>

                <span className="absolute inset-x-5 bottom-5 block transition-transform duration-[600ms] ease-out group-hover:-translate-y-1.5">
                  <span className="display block text-[clamp(1.4rem,3.4vw,2rem)] text-white">{c.label}</span>
                  <span className="mt-1.5 flex items-center gap-2 text-[0.76rem] text-white/0 transition-colors duration-500 group-hover:text-white/75">
                    {c.blurb}
                  </span>
                  <span className="mt-3 block h-[2px] w-10 origin-left bg-orange transition-transform duration-[600ms] ease-out group-hover:scale-x-[3.2]" />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
