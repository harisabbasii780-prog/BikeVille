import { motion } from 'framer-motion';
import {
  Award,
  Bike,
  Compass,
  CreditCard,
  ShieldCheck,
  Truck,
  Wrench,
} from 'lucide-react';
import { BRAND, STATS } from '../data/site';
import { PrimaryButton } from '../components/Buttons';
import MarqueeStrip from '../components/Marquee';
import { MARQUEE_TOP } from '../data/site';
import Reveal, { RevealWords } from '../components/Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  {
    id: 'delivery',
    Icon: Truck,
    title: 'Doorstep Delivery',
    body: 'Enclosed transport to any address in the country within seven working days. Handover includes a full walkaround, first-start briefing and a tank of fuel.',
  },
  {
    id: 'service',
    Icon: Wrench,
    title: 'Servicing & Workshop',
    body: 'Three free services on every new machine, factory-trained technicians, calibrated torque on every fastener and genuine parts only — no exceptions.',
  },
  {
    id: 'finance',
    Icon: CreditCard,
    title: 'Finance & EMI',
    body: 'Approvals in under 24 hours with instalments from Rs 4,999 a month. Trade-in valuations are honest, instant and deducted straight off your build price.',
  },
  {
    id: 'accessories',
    Icon: ShieldCheck,
    title: 'Genuine Accessories',
    body: 'Exhausts, luggage, protection and rider gear straight from the factory catalogue — fitted in-house and covered by the same warranty as the bike.',
  },
  {
    id: 'workshop',
    Icon: Award,
    title: 'Race Preparation',
    body: 'Suspension re-valving, ECU mapping and full race prep by the crew that runs our own national championship entries every season.',
  },
  {
    id: 'rides',
    Icon: Compass,
    title: 'Sunday Ride-Outs',
    body: 'Every Sunday, 06:00, from the showroom forecourt. Coffee, 180 kilometres of good tarmac and a support van that carries the spares.',
  },
];

export default function About() {
  return (
    <>
      {/* hero */}
      <section className="grain relative isolate overflow-hidden bg-ink pb-16 pt-32 sm:pt-40">
        <img
          src="/images/scenes/showroom.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/88 via-ink/78 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_25%_30%,rgba(255,90,0,0.26),transparent_66%)]" />
        <div className="shell relative">
          <p className="eyebrow mb-4 flex items-center gap-3 text-orange">
            <span className="h-px w-10 bg-orange" />
            Since {BRAND.founded}
          </p>
          <h1 className="display text-[clamp(2.6rem,10vw,6.5rem)] text-white">
            <RevealWords text="Orange Runs Deep" />
          </h1>
          <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-white/58">
            {BRAND.name} started as a two-bay workshop with one race bike and a bad habit of saying yes to
            impossible deadlines. Twenty-five years later we still build every machine like it has to win
            on Sunday.
          </p>
          <div className="mt-10 flex flex-wrap gap-8">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: EASE }}
              >
                <p className="display text-[clamp(1.8rem,5vw,3rem)] text-orange">{s.value}</p>
                <p className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-white/40">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* story */}
      <section className="bg-bone py-20 text-ink sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <p className="eyebrow mb-4 flex items-center gap-3 text-ink/40">
                <span className="h-px w-10 bg-orange" />
                Our Story
              </p>
              <h2 className="display text-[clamp(2rem,6vw,3.6rem)] leading-[0.95]">
                Built by riders,
                <br />
                <span className="text-orange">for riders.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-[0.96rem] leading-relaxed text-ink/65">
              <p>
                Everything on our floor has been ridden by someone who works here. Not around a car park
                — properly ridden, in the rain, at night, loaded, on a track day and up a mountain pass
                with too much luggage.
              </p>
              <p>
                That is why the specs on this site read like they were written by a mechanic rather than
                a marketing department. If a bike is heavy, we say so. If a suspension setup needs
                changing for your weight, we change it before it leaves the workshop.
              </p>
              <p>
                We sell performance motorcycles because they are the most honest machines ever built. No
                filters, no assistance you did not ask for, no hiding.
              </p>
              <div className="pt-3">
                <PrimaryButton to="/bikes" size="lg">
                  See the Range
                </PrimaryButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* full-bleed image */}
      <section aria-hidden="true" className="relative h-[46svh] min-h-[300px] overflow-hidden">
        <img src="/images/scenes/trail.webp" alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.55),rgba(5,5,5,0.25),rgba(5,5,5,0.95))]" />
      </section>

      {/* services */}
      <section aria-labelledby="services-heading" className="bg-ink py-20 sm:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3 text-orange">
              <span className="h-px w-10 bg-orange" />
              What we do
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="services-heading" className="display text-[clamp(2rem,6.4vw,4rem)] text-white">
              Everything After the Sale
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <motion.li
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
                className="group scroll-mt-28 rounded-[10px] border border-white/8 bg-char p-6 transition-colors duration-300 hover:border-orange/40"
              >
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-[8px] bg-orange/12 text-orange transition-transform duration-300 group-hover:scale-110">
                  <s.Icon size={19} />
                </span>
                <h3 className="display text-[1.05rem] text-white">{s.title}</h3>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-white/50">{s.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* legal */}
      <section className="bg-dark py-16 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <div id="privacy" className="scroll-mt-28">
            <Reveal>
              <h2 className="display flex items-center gap-3 text-[1.5rem] text-white">
                <ShieldCheck size={20} className="text-orange" /> Privacy
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-4 space-y-3 text-[0.88rem] leading-relaxed text-white/50">
                <p>
                  We collect only what we need to sell, deliver and service your motorcycle: your name,
                  contact details and the configuration you build on this site.
                </p>
                <p>
                  We never sell your data. Marketing emails are opt-in and one click to leave. Saved
                  garage builds live in your own browser storage, not on our servers.
                </p>
                <p>
                  You can request a full export or deletion of your record at any time by writing to{' '}
                  <a href={`mailto:${BRAND.email}`} className="text-orange hover:underline">
                    {BRAND.email}
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>

          <div id="terms" className="scroll-mt-28">
            <Reveal delay={0.08}>
              <h2 className="display flex items-center gap-3 text-[1.5rem] text-white">
                <Bike size={20} className="text-orange" /> Terms
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-4 space-y-3 text-[0.88rem] leading-relaxed text-white/50">
                <p>
                  Prices shown are ex-showroom and exclude registration, insurance and road tax unless
                  stated. Configured prices are indicative until confirmed in writing by a specialist.
                </p>
                <p>
                  Delivery windows assume stock availability and clear payment. Race-only machines are
                  supplied without registration documents and are not road legal.
                </p>
                <p>
                  Free servicing applies to the first three scheduled intervals, carried out at our own
                  workshop, and excludes consumables damaged by competition use.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <MarqueeStrip top={MARQUEE_TOP} />
    </>
  );
}
