import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Cpu,
  CreditCard,
  Gauge,
  Heart,
  RotateCcw,
  Scale,
  Settings2,
  Zap,
  Fuel,
  Ruler,
} from 'lucide-react';
import {
  ACCESSORIES,
  BIKES,
  COLORS,
  PACKAGES,
  WHEELS,
  getBike,
} from '../data/bikes';
import { formatPKR, monthlyEmi } from '../lib/format';
import { GhostButton, PrimaryButton } from '../components/Buttons';
import BikeCard from '../components/BikeCard';
import MarqueeStrip from '../components/Marquee';
import { MARQUEE_TOP } from '../data/site';
import Reveal from '../components/Reveal';
import { useGarage } from '../lib/garage';
import NotFound from './NotFound';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BikeDetail() {
  const { id } = useParams<{ id: string }>();
  const bike = id ? getBike(id) : undefined;
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'overview' | 'specs'>('overview');
  const [configOpen, setConfigOpen] = useState(params.get('configure') === '1');

  const [colorId, setColorId] = useState(COLORS[0].id);
  const [wheelId, setWheelId] = useState(WHEELS[0].id);
  const [packageId, setPackageId] = useState(PACKAGES[0].id);
  const [accessoryIds, setAccessoryIds] = useState<string[]>([]);

  const configRef = useRef<HTMLDivElement>(null);
  const garage = useGarage();

  // reset configuration when navigating between bikes
  useEffect(() => {
    setColorId(COLORS[0].id);
    setWheelId(WHEELS[0].id);
    setPackageId(PACKAGES[0].id);
    setAccessoryIds([]);
    setTab('overview');
  }, [id]);

  useEffect(() => {
    if (configOpen && params.get('configure') === '1') {
      const t = window.setTimeout(
        () => configRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        260,
      );
      return () => window.clearTimeout(t);
    }
  }, [configOpen, params]);

  const color = COLORS.find((c) => c.id === colorId) ?? COLORS[0];
  const wheel = WHEELS.find((w) => w.id === wheelId) ?? WHEELS[0];
  const pack = PACKAGES.find((p) => p.id === packageId) ?? PACKAGES[0];
  const accessories = ACCESSORIES.filter((a) => accessoryIds.includes(a.id));

  const total = useMemo(() => {
    if (!bike) return 0;
    return (
      bike.price +
      color.price +
      wheel.price +
      pack.price +
      accessories.reduce((sum, a) => sum + a.price, 0)
    );
  }, [bike, color, wheel, pack, accessories]);

  const related = useMemo(
    () => BIKES.filter((b) => b.id !== id).slice(0, 4),
    [id],
  );

  if (!bike) return <NotFound />;

  const openConfig = () => {
    setConfigOpen(true);
    const next = new URLSearchParams(params);
    next.set('configure', '1');
    setParams(next, { replace: true });
  };

  const closeConfig = () => {
    setConfigOpen(false);
    const next = new URLSearchParams(params);
    next.delete('configure');
    setParams(next, { replace: true });
  };

  const resetConfig = () => {
    setColorId(COLORS[0].id);
    setWheelId(WHEELS[0].id);
    setPackageId(PACKAGES[0].id);
    setAccessoryIds([]);
  };

  const handleBuyNow = () => {
    navigate('/checkout', {
      state: {
        bikeId: bike.id,
        bikeName: bike.name,
        bikeImage: bike.image,
        configuration: [
          { label: 'Colour', value: color.name },
          { label: 'Wheels', value: wheel.name },
          { label: 'Package', value: pack.name },
          {
            label: 'Accessories',
            value: accessories.length ? accessories.map((a) => a.name).join(', ') : 'None',
          },
        ],
        total,
      },
    });
  };

  const specCards = [
    { Icon: Cpu, label: 'Engine', value: bike.specs.engine },
    { Icon: Zap, label: 'Performance', value: bike.specs.power },
    { Icon: Gauge, label: 'Torque', value: bike.specs.torque },
    { Icon: Scale, label: 'Weight', value: bike.specs.weight },
    { Icon: Settings2, label: 'Technology', value: bike.specs.electronics },
    { Icon: Ruler, label: 'Seat Height', value: bike.specs.seatHeight },
    { Icon: Fuel, label: 'Fuel Capacity', value: bike.specs.fuel },
    { Icon: Gauge, label: 'Top Speed', value: bike.specs.topSpeed },
  ];

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="grain relative isolate overflow-hidden bg-ink pb-16 pt-28 sm:pt-32 lg:pb-24">
        <img
          src={bike.scene}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/78 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_65%_at_72%_45%,rgba(255,90,0,0.28),transparent_66%)]" />

        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[0.72rem] text-white/45">
            <Link to="/" className="hover:text-orange">
              Home
            </Link>
            <ChevronRight size={13} />
            <Link to="/bikes" className="hover:text-orange">
              Bikes
            </Link>
            <ChevronRight size={13} />
            <span className="text-white/80">{bike.name}</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            {/* text */}
            <motion.div
              initial={{ opacity: 0, x: -34 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="order-2 lg:order-1"
            >
              <p className="eyebrow text-orange">{bike.categoryLabel}</p>
              <h1 className="display mt-4 text-[clamp(2.2rem,7.5vw,4.6rem)] text-white">{bike.name}</h1>
              <p className="mt-4 text-[1.02rem] text-white/60">{bike.tagline}</p>

              {/* tabs */}
              <div className="mt-8 flex gap-6 border-b border-white/10" role="tablist" aria-label="Bike information">
                {(['overview', 'specs'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={`relative pb-3 font-display text-[0.74rem] font-bold uppercase tracking-[0.2em] transition-colors ${
                      tab === t ? 'text-white' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {t === 'overview' ? 'Overview' : 'Specs'}
                    {tab === t && (
                      <motion.span
                        layoutId="detail-tab"
                        className="absolute inset-x-0 -bottom-px h-[2px] bg-orange"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[11rem] pt-6">
                <AnimatePresence mode="wait">
                  {tab === 'overview' ? (
                    <motion.div
                      key="ov"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <p className="max-w-lg text-[0.94rem] leading-relaxed text-white/60">
                        {bike.description}
                      </p>
                      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                        {bike.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-[0.82rem] text-white/55">
                            <Check size={14} className="mt-0.5 shrink-0 text-orange" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : (
                    <motion.dl
                      key="sp"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="max-w-lg divide-y divide-white/8"
                    >
                      {[
                        ['Engine', bike.specs.engine],
                        ['Power', bike.specs.power],
                        ['Torque', bike.specs.torque],
                        ['Weight', bike.specs.weight],
                        ['Brakes', bike.specs.brakes],
                        ['Suspension', bike.specs.suspension],
                      ].map(([k, v]) => (
                        <div key={k} className="flex items-baseline justify-between gap-6 py-2.5">
                          <dt className="text-[0.68rem] uppercase tracking-[0.2em] text-white/35">{k}</dt>
                          <dd className="text-right text-[0.85rem] font-semibold text-white">{v}</dd>
                        </div>
                      ))}
                    </motion.dl>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-4">
                <div>
                  <p className="text-[0.64rem] uppercase tracking-[0.22em] text-white/35">Price</p>
                  <p className="display mt-1.5 text-[clamp(1.8rem,4.6vw,2.6rem)] text-orange">
                    {formatPKR(bike.price)}
                  </p>
                  <p className="mt-1 text-[0.74rem] text-white/40">
                    EMI from {monthlyEmi(bike.price)} / month · {bike.availability}
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton onClick={openConfig} size="lg" icon={<Settings2 size={15} />}>
                  Configure &amp; Customize
                </PrimaryButton>
                <GhostButton
                  onClick={() => garage.toggle(bike.id)}
                  size="lg"
                  icon={
                    <Heart
                      size={15}
                      className={garage.has(bike.id) ? 'fill-orange text-orange' : ''}
                    />
                  }
                >
                  {garage.has(bike.id) ? 'In Your Garage' : 'Add to Garage'}
                </GhostButton>
              </div>
            </motion.div>

            {/* image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative order-1 lg:order-2"
            >
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 glow-orange sm:h-[34rem] sm:w-[34rem]"
              />
              <motion.img
                src={bike.image}
                alt={`${bike.name} studio render`}
                width={1400}
                height={1000}
                fetchPriority="high"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="relative mx-auto h-auto w-full max-w-3xl object-contain drop-shadow-[0_50px_70px_rgba(0,0,0,0.75)]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- specs ---------------- */}
      <section aria-labelledby="specs-heading" className="border-y border-white/8 bg-dark py-16 sm:py-24">
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3 text-orange">
              <span className="h-px w-10 bg-orange" />
              Technical Data
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="specs-heading" className="display text-[clamp(1.9rem,6vw,3.6rem)] text-white">
              Specification
            </h2>
          </Reveal>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {specCards.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: EASE }}
                className="group rounded-[10px] border border-white/8 bg-char p-5 transition-colors duration-300 hover:border-orange/40"
              >
                <s.Icon size={17} className="mb-4 text-orange transition-transform duration-300 group-hover:scale-110" />
                <p className="text-[0.64rem] uppercase tracking-[0.2em] text-white/35">{s.label}</p>
                <p className="mt-2 text-[0.92rem] font-semibold leading-snug text-white">{s.value}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- configurator ---------------- */}
      <div ref={configRef} id="configure" className="scroll-mt-24">
        <AnimatePresence initial={false}>
          {configOpen ? (
            <motion.section
              key="configurator"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              aria-label="Bike configurator"
              className="overflow-hidden bg-ink"
            >
              <div className="grid lg:grid-cols-[1.05fr_1fr]">
                {/* preview panel */}
                <div className="grain relative isolate overflow-hidden bg-char px-6 py-14 sm:px-10 lg:py-20">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-90"
                    style={{
                      background: `radial-gradient(75% 60% at 50% 45%, ${color.accent}33, transparent 68%)`,
                    }}
                  />
                  <div className="relative">
                    <button
                      type="button"
                      onClick={closeConfig}
                      className="mb-8 inline-flex items-center gap-2 text-[0.72rem] font-semibold text-white/50 transition-colors hover:text-orange"
                    >
                      <ArrowLeft size={14} /> Back to overview
                    </button>

                    <p className="eyebrow text-orange">Your Build</p>
                    <h2 className="display mt-3 text-[clamp(1.6rem,4.6vw,2.6rem)] text-white">{bike.name}</h2>

                    <motion.img
                      key={color.id + wheel.id}
                      src={bike.image}
                      alt={`${bike.name} in ${color.name}`}
                      width={1400}
                      height={1000}
                      loading="lazy"
                      initial={{ opacity: 0.4, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      style={{ filter: color.filter }}
                      className="mx-auto my-8 h-auto w-full max-w-xl object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
                    />

                    <ul className="grid gap-2 text-[0.82rem] sm:grid-cols-2">
                      <li className="flex items-center justify-between gap-3 rounded-lg border border-white/8 bg-white/[0.03] px-3.5 py-2.5">
                        <span className="text-white/45">Colour</span>
                        <span className="flex items-center gap-2 font-semibold text-white">
                          <span
                            className="h-3 w-3 rounded-full ring-1 ring-white/25"
                            style={{ background: color.swatch }}
                          />
                          {color.name}
                        </span>
                      </li>
                      <li className="flex items-center justify-between gap-3 rounded-lg border border-white/8 bg-white/[0.03] px-3.5 py-2.5">
                        <span className="text-white/45">Wheels</span>
                        <span className="flex items-center gap-2 font-semibold text-white">
                          <span
                            className="h-3 w-3 rounded-full ring-1 ring-white/25"
                            style={{ background: wheel.swatch }}
                          />
                          {wheel.name}
                        </span>
                      </li>
                      <li className="flex items-center justify-between gap-3 rounded-lg border border-white/8 bg-white/[0.03] px-3.5 py-2.5">
                        <span className="text-white/45">Package</span>
                        <span className="font-semibold text-white">{pack.name}</span>
                      </li>
                      <li className="flex items-center justify-between gap-3 rounded-lg border border-white/8 bg-white/[0.03] px-3.5 py-2.5">
                        <span className="text-white/45">Accessories</span>
                        <span className="font-semibold text-white">{accessories.length} selected</span>
                      </li>
                    </ul>

                    <div className="mt-8 rounded-[10px] border border-orange/30 bg-orange/[0.07] p-5">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-[0.64rem] uppercase tracking-[0.22em] text-white/45">
                            Configured price
                          </p>
                          <motion.p
                            key={total}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="display mt-1.5 text-[clamp(1.7rem,4.4vw,2.4rem)] text-orange"
                          >
                            {formatPKR(total)}
                          </motion.p>
                          <p className="mt-1 text-[0.74rem] text-white/45">
                            EMI from {monthlyEmi(total)} / month
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={resetConfig}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-[0.68rem] font-semibold text-white/60 transition-colors hover:border-orange hover:text-orange"
                        >
                          <RotateCcw size={12} /> Reset
                        </button>
                      </div>

                      <div className="mt-5 space-y-2.5">
                        <PrimaryButton onClick={handleBuyNow} full icon={<CreditCard size={15} />}>
                          Buy Now
                        </PrimaryButton>
                        <div className="flex flex-col gap-2.5 sm:flex-row">
                          <GhostButton onClick={() => garage.toggle(bike.id)} full>
                            {garage.has(bike.id) ? 'Saved to Garage' : 'Save this build'}
                          </GhostButton>
                          <GhostButton to="/contact?intent=order" full>
                            Request a Quote
                          </GhostButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* options panel */}
                <div className="bg-cream px-6 py-14 text-ink sm:px-10 lg:py-20">
                  <h3 className="display text-[clamp(1.5rem,4vw,2.2rem)]">Configure the Bike</h3>
                  <p className="mt-3 max-w-md text-[0.9rem] leading-relaxed text-ink/55">
                    Choose your colourway, wheels, package and accessories. Pricing updates instantly.
                  </p>

                  {/* colours */}
                  <fieldset className="mt-10">
                    <legend className="eyebrow mb-4 text-ink/45">Colourway</legend>
                    <div className="flex flex-wrap gap-3">
                      {COLORS.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setColorId(c.id)}
                          aria-pressed={c.id === colorId}
                          className="group flex w-[6.6rem] flex-col items-center gap-2"
                        >
                          <span
                            className={`grid h-14 w-14 place-items-center rounded-[10px] transition-all duration-300 ${
                              c.id === colorId
                                ? 'ring-2 ring-orange ring-offset-2 ring-offset-cream'
                                : 'ring-1 ring-ink/12 group-hover:ring-ink/35'
                            }`}
                            style={{ background: c.swatch }}
                          >
                            {c.id === colorId && (
                              <Check
                                size={18}
                                strokeWidth={3}
                                className={c.id === 'ceramic-white' ? 'text-ink' : 'text-white'}
                              />
                            )}
                          </span>
                          <span className="text-center text-[0.68rem] font-semibold leading-tight text-ink/65">
                            {c.name}
                            {c.price > 0 && (
                              <span className="mt-0.5 block text-[0.62rem] text-ink/40">
                                +{formatPKR(c.price)}
                              </span>
                            )}
                          </span>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* wheels */}
                  <fieldset className="mt-10">
                    <legend className="eyebrow mb-4 text-ink/45">Wheels</legend>
                    <div className="flex flex-wrap gap-3">
                      {WHEELS.map((w) => (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => setWheelId(w.id)}
                          aria-pressed={w.id === wheelId}
                          className="group flex w-[6.6rem] flex-col items-center gap-2"
                        >
                          <span
                            className={`grid h-12 w-12 place-items-center rounded-full transition-all duration-300 ${
                              w.id === wheelId
                                ? 'ring-2 ring-orange ring-offset-2 ring-offset-cream'
                                : 'ring-1 ring-ink/12 group-hover:ring-ink/35'
                            }`}
                            style={{ background: w.swatch }}
                          >
                            <span className="h-4 w-4 rounded-full bg-cream/85" />
                          </span>
                          <span className="text-center text-[0.68rem] font-semibold leading-tight text-ink/65">
                            {w.name}
                            {w.price > 0 && (
                              <span className="mt-0.5 block text-[0.62rem] text-ink/40">
                                +{formatPKR(w.price)}
                              </span>
                            )}
                          </span>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* packages */}
                  <fieldset className="mt-10">
                    <legend className="eyebrow mb-4 text-ink/45">Package</legend>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {PACKAGES.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPackageId(p.id)}
                          aria-pressed={p.id === packageId}
                          className={`rounded-[10px] border p-4 text-left transition-all duration-300 ${
                            p.id === packageId
                              ? 'border-orange bg-white shadow-[0_16px_36px_-24px_rgba(0,0,0,0.5)]'
                              : 'border-ink/10 bg-white/55 hover:border-ink/30'
                          }`}
                        >
                          <span className="flex items-center justify-between gap-2">
                            <span className="display text-[0.9rem]">{p.name}</span>
                            <span className="text-[0.72rem] font-bold text-orange">
                              {p.price === 0 ? 'Included' : `+${formatPKR(p.price)}`}
                            </span>
                          </span>
                          <span className="mt-1.5 block text-[0.76rem] text-ink/50">{p.desc}</span>
                          <span className="mt-2.5 flex flex-wrap gap-1">
                            {p.includes.slice(0, 3).map((inc) => (
                              <span
                                key={inc}
                                className="rounded-full bg-ink/6 px-2 py-0.5 text-[0.62rem] font-semibold text-ink/55"
                              >
                                {inc}
                              </span>
                            ))}
                          </span>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* accessories */}
                  <fieldset className="mt-10">
                    <legend className="eyebrow mb-4 text-ink/45">Accessories</legend>
                    <ul className="grid gap-2">
                      {ACCESSORIES.map((a) => {
                        const checked = accessoryIds.includes(a.id);
                        return (
                          <li key={a.id}>
                            <label
                              className={`flex cursor-pointer items-center gap-3 rounded-[10px] border p-3.5 transition-all duration-300 ${
                                checked ? 'border-orange bg-white' : 'border-ink/10 bg-white/55 hover:border-ink/30'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() =>
                                  setAccessoryIds((prev) =>
                                    prev.includes(a.id) ? prev.filter((x) => x !== a.id) : [...prev, a.id],
                                  )
                                }
                                className="sr-only"
                              />
                              <span
                                aria-hidden="true"
                                className={`grid h-5 w-5 shrink-0 place-items-center rounded-[4px] border transition-colors ${
                                  checked ? 'border-orange bg-orange text-ink' : 'border-ink/25'
                                }`}
                              >
                                {checked && <Check size={13} strokeWidth={3} />}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-[0.85rem] font-bold">{a.name}</span>
                                <span className="block text-[0.74rem] text-ink/50">{a.desc}</span>
                              </span>
                              <span className="shrink-0 text-[0.78rem] font-bold text-orange">
                                +{formatPKR(a.price)}
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </fieldset>
                </div>
              </div>
            </motion.section>
          ) : (
            <motion.div
              key="configcta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="bg-ink py-14"
            >
              <div className="shell flex flex-col items-center gap-5 rounded-[10px] border border-white/8 bg-char px-6 py-12 text-center">
                <Settings2 size={26} className="text-orange" />
                <h2 className="display text-[clamp(1.5rem,4.4vw,2.4rem)] text-white">
                  Make it yours
                </h2>
                <p className="max-w-md text-[0.92rem] leading-relaxed text-white/55">
                  Colourways, wheels, packages and accessories — build the exact {bike.short} you want and
                  see the price update live.
                </p>
                <PrimaryButton onClick={openConfig} size="lg" icon={<Settings2 size={15} />}>
                  Configure &amp; Customize
                </PrimaryButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------------- cinematic ---------------- */}
      <section aria-label={`${bike.name} in its element`} className="grain relative isolate h-[70svh] min-h-[420px] overflow-hidden">
        <img src={bike.scene} alt={`${bike.name} riding scene`} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.96)_4%,rgba(5,5,5,0.2)_55%,rgba(5,5,5,0.55)_100%)]" />
        <div className="shell absolute inset-x-0 bottom-12 sm:bottom-16">
          <Reveal>
            <p className="eyebrow mb-3 text-orange">{bike.categoryLabel}</p>
            <h2 className="display max-w-3xl text-[clamp(2rem,7vw,5rem)] text-white">{bike.tagline}</h2>
          </Reveal>
        </div>
      </section>

      {/* ---------------- related ---------------- */}
      <section aria-labelledby="related-heading" className="bg-dark py-16 sm:py-24">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <h2 id="related-heading" className="display text-[clamp(1.7rem,5vw,3rem)] text-white">
              You may also like
            </h2>
            <Link
              to="/bikes"
              className="group inline-flex items-center gap-2 border-b-2 border-white/15 pb-1 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-orange hover:text-orange"
            >
              All machines
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((b, i) => (
              <BikeCard key={b.id} bike={b} tone="dark" index={i} />
            ))}
          </div>
        </div>
      </section>

      <MarqueeStrip top={MARQUEE_TOP} />
    </>
  );
}
