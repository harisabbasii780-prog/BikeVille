import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { popularBikes } from '../../data/bikes';
import BikeCard from '../BikeCard';
import Reveal from '../Reveal';

export default function PopularBikes() {
  return (
    <section id="popular" aria-labelledby="popular-heading" className="relative bg-orange pt-20 sm:pt-28 lg:pt-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 8% 0%, rgba(0,0,0,0.55), transparent 40%), radial-gradient(circle at 92% 30%, rgba(0,0,0,0.45), transparent 45%)',
        }}
      />

      <div className="shell relative pb-32 sm:pb-40 lg:pb-52">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow mb-4 flex items-center gap-3 text-ink/55">
                <span className="h-px w-10 bg-ink/50" />
                Most Wanted
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id="popular-heading" className="display text-[clamp(2.3rem,7.4vw,5rem)] text-white">
                Popular Bikes
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <Link
              to="/bikes"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-ink"
            >
              View All
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {popularBikes.slice(0, 4).map((b, i) => (
            <BikeCard key={b.id} bike={b} tone="light" index={i} />
          ))}
        </div>
      </div>

      {/* wave transition into the light section below */}
      <svg
        className="absolute inset-x-0 bottom-0 block h-[60px] w-full sm:h-[100px] lg:h-[150px]"
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path fill="#ffffff" d="M0,92 C230,150 470,26 760,52 C1030,76 1220,152 1440,84 L1440,150 L0,150 Z" />
      </svg>
    </section>
  );
}
