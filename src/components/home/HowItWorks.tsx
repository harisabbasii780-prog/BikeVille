import { motion } from 'framer-motion';
import { HOW_IT_WORKS } from '../../data/site';
import Reveal from '../Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HowItWorks() {
  const left = HOW_IT_WORKS.slice(0, 2);
  const right = HOW_IT_WORKS.slice(2);

  const Step = ({
    item,
    align,
    delay,
  }: {
    item: (typeof HOW_IT_WORKS)[number];
    align: 'left' | 'right';
    delay: number;
  }) => (
    <motion.li
      initial={{ opacity: 0, x: align === 'left' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={`group relative ${align === 'right' ? 'lg:text-right' : ''}`}
    >
      <span
        className={`display block text-[0.7rem] tracking-[0.3em] text-orange`}
      >
        {item.step}
      </span>
      <h3 className="display mt-3 text-[clamp(1.15rem,2.6vw,1.55rem)] text-ink">{item.title}</h3>
      <p className="mt-2.5 text-[0.88rem] leading-relaxed text-ink/55">{item.body}</p>
      <span
        aria-hidden="true"
        className={`mt-5 block h-[2px] w-12 origin-left bg-ink/12 transition-all duration-500 group-hover:w-24 group-hover:bg-orange ${
          align === 'right' ? 'lg:ml-auto lg:origin-right' : ''
        }`}
      />
    </motion.li>
  );

  return (
    <section id="how" aria-labelledby="how-heading" className="relative bg-bone text-ink">
      <div className="shell py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <p className="eyebrow mb-4 text-ink/40">The Process</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="how-heading" className="display text-[clamp(2rem,6vw,3.8rem)]">
              How It Works
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-md text-[0.92rem] leading-relaxed text-ink/55">
              Four steps between browsing and burning your first tank.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-[1fr_minmax(0,26rem)_1fr] lg:gap-8">
          <ul className="space-y-12">
            {left.map((s, i) => (
              <Step key={s.step} item={s} align="left" delay={i * 0.1} />
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative order-first lg:order-none"
          >
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/12 blur-3xl"
            />
            <motion.img
              src="/images/bikes/naked.webp"
              alt="Naked streetfighter motorcycle render"
              loading="lazy"
              width={1400}
              height={1000}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mx-auto h-auto w-full max-w-md object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.22)]"
            />
          </motion.div>

          <ul className="space-y-12">
            {right.map((s, i) => (
              <Step key={s.step} item={s} align="right" delay={i * 0.1} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
