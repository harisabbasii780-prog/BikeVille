import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { BIKES, CATEGORIES } from '../data/bikes';
import BikeCard from '../components/BikeCard';
import MarqueeStrip from '../components/Marquee';
import { MARQUEE_TOP } from '../data/site';
import { RevealWords } from '../components/Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;
const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price ↑' },
  { id: 'price-desc', label: 'Price ↓' },
  { id: 'power', label: 'Power' },
];

export default function Bikes() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') ?? 'all';
  const q = params.get('q') ?? '';
  const sort = params.get('sort') ?? 'featured';

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all' || value === '') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    let list = [...BIKES];
    if (category !== 'all') list = list.filter((b) => b.category === category);
    if (q.trim()) {
      const term = q.trim().toLowerCase();
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(term) ||
          b.categoryLabel.toLowerCase().includes(term) ||
          b.tagline.toLowerCase().includes(term) ||
          b.specs.engine.toLowerCase().includes(term),
      );
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'power') list.sort((a, b) => b.specs.powerHp - a.specs.powerHp);
    return list;
  }, [category, q, sort]);

  const activeCat = CATEGORIES.find((c) => c.id === category);

  return (
    <>
      {/* header */}
      <section className="grain relative isolate overflow-hidden bg-ink pb-14 pt-32 sm:pt-40">
        <img
          src={activeCat?.image ?? '/images/scenes/lineup.webp'}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/80 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_20%,rgba(255,90,0,0.24),transparent_65%)]" />

        <div className="shell relative">
          <p className="eyebrow mb-4 flex items-center gap-3 text-orange">
            <span className="h-px w-10 bg-orange" />
            {results.length} machine{results.length === 1 ? '' : 's'} available
          </p>
          <h1 className="display text-[clamp(2.6rem,10vw,6.5rem)] text-white">
            <RevealWords text={activeCat ? `${activeCat.label} Range` : 'The Full Range'} />
          </h1>
          <p className="mt-5 max-w-xl text-[0.96rem] leading-relaxed text-white/55">
            Every machine is prepped, PDI-certified and delivered ready to ride. Filter by discipline, sort
            by whatever matters to you.
          </p>
        </div>
      </section>

      {/* controls */}
      <section className="sticky top-[60px] z-30 border-y border-white/8 bg-ink/85 backdrop-blur-xl">
        <div className="shell flex flex-wrap items-center gap-3 py-3.5">
          <div className="no-scrollbar -mx-1 flex flex-1 gap-2 overflow-x-auto px-1">
            <button
              type="button"
              onClick={() => update('category', null)}
              className={`shrink-0 rounded-full border px-4 py-2 font-display text-[0.63rem] font-bold uppercase tracking-[0.18em] transition-colors ${
                category === 'all'
                  ? 'border-orange bg-orange text-ink'
                  : 'border-white/12 text-white/55 hover:border-white/35 hover:text-white'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => update('category', c.id)}
                className={`shrink-0 rounded-full border px-4 py-2 font-display text-[0.63rem] font-bold uppercase tracking-[0.18em] transition-colors ${
                  category === c.id
                    ? 'border-orange bg-orange text-ink'
                    : 'border-white/12 text-white/55 hover:border-white/35 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label className="flex h-9 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3">
              <Search size={14} className="text-orange" />
              <span className="sr-only">Search bikes</span>
              <input
                value={q}
                onChange={(e) => update('q', e.target.value)}
                placeholder="Search…"
                className="w-24 bg-transparent text-[0.78rem] text-white placeholder:text-white/35 focus:outline-none sm:w-36"
              />
              {q && (
                <button type="button" onClick={() => update('q', null)} aria-label="Clear search">
                  <X size={13} className="text-white/45 hover:text-orange" />
                </button>
              )}
            </label>

            <label className="flex h-9 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3">
              <SlidersHorizontal size={14} className="text-orange" />
              <span className="sr-only">Sort bikes</span>
              <select
                value={sort}
                onChange={(e) => update('sort', e.target.value)}
                className="bg-transparent text-[0.76rem] font-semibold text-white focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id} className="bg-char text-white">
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      {/* grid */}
      <section className="bg-dark py-14 sm:py-20">
        <div className="shell">
          {results.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mx-auto max-w-md rounded-[10px] border border-white/8 bg-char p-10 text-center"
            >
              <h2 className="display text-[1.4rem] text-white">Nothing matches</h2>
              <p className="mt-3 text-[0.9rem] text-white/50">
                Try clearing the filters or searching for a different discipline.
              </p>
              <button
                type="button"
                onClick={() => setParams(new URLSearchParams(), { replace: true })}
                className="mt-6 rounded-full bg-orange px-6 py-3 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ink"
              >
                Reset filters
              </button>
            </motion.div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((b, i) => (
                <BikeCard key={b.id} bike={b} tone="dark" index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <MarqueeStrip top={MARQUEE_TOP} />
    </>
  );
}
