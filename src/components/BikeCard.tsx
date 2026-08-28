import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Bike } from '../data/bikes';
import { formatPKR } from '../lib/format';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BikeCard({
  bike,
  tone = 'light',
  index = 0,
}: {
  bike: Bike;
  tone?: 'light' | 'dark';
  index?: number;
}) {
  const light = tone === 'light';

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: Math.min(index, 5) * 0.07, ease: EASE }}
      className="group h-full"
    >
      <Link
        to={`/bikes/${bike.id}`}
        className={`relative flex h-full flex-col overflow-hidden rounded-[10px] border transition-all duration-500 ease-out group-hover:-translate-y-2 ${
          light
            ? 'border-ink/8 bg-white text-ink shadow-[0_18px_40px_-30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_40px_70px_-34px_rgba(0,0,0,0.55)]'
            : 'border-white/8 bg-char text-white group-hover:border-orange/40 group-hover:shadow-[0_40px_70px_-36px_rgba(255,90,0,0.55)]'
        }`}
      >
        {/* orange sweep on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-orange transition-transform duration-500 ease-out group-hover:scale-x-100"
        />

        <div
          className={`relative overflow-hidden ${light ? 'bg-[#f2f0ed]' : 'bg-ink'}`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(70% 70% at 50% 60%, rgba(255,90,0,0.22), transparent 70%)',
            }}
          />
          <img
            src={bike.image}
            alt={bike.name}
            loading="lazy"
            width={1400}
            height={1000}
            className="relative aspect-[4/3] w-full object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className={`eyebrow ${light ? 'text-ink/35' : 'text-white/35'}`}>{bike.categoryLabel}</p>
          <h3 className="display mt-2 text-[1.05rem] leading-tight transition-colors duration-300 group-hover:text-orange sm:text-[1.15rem]">
            {bike.name}
          </h3>

          <ul
            className={`mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[0.7rem] font-semibold ${
              light ? 'text-ink/45' : 'text-white/45'
            }`}
          >
            <li>{bike.specs.powerHp} HP</li>
            <li aria-hidden="true">·</li>
            <li>{bike.specs.torque.split(' ')[0]} Nm</li>
            <li aria-hidden="true">·</li>
            <li>{bike.specs.weight.split(' ')[0]} kg</li>
          </ul>

          <div className="mt-auto flex items-end justify-between gap-3 pt-6">
            <div>
              <p className={`text-[0.62rem] uppercase tracking-[0.2em] ${light ? 'text-ink/35' : 'text-white/35'}`}>
                From
              </p>
              <p className="display mt-1 text-[1.25rem] leading-none">{formatPKR(bike.price)}</p>
            </div>
            <span
              aria-hidden="true"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-orange text-ink transition-transform duration-400 ease-out group-hover:rotate-45 group-hover:scale-110"
            >
              <ArrowUpRight size={19} strokeWidth={2.4} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
