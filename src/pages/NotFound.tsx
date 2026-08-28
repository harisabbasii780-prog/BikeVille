import { motion } from 'framer-motion';
import { GhostButton, PrimaryButton } from '../components/Buttons';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-[80svh] items-center overflow-hidden bg-ink">
      <img
        src="/images/scenes/street-night.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/80 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_50%_45%,rgba(255,90,0,0.24),transparent_68%)]" />

      <div className="shell relative py-28 text-center">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="eyebrow text-orange"
        >
          Wrong turn
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="display mt-4 text-[clamp(4rem,20vw,12rem)] leading-[0.8] text-white"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="mx-auto mt-5 max-w-md text-[0.96rem] leading-relaxed text-white/55"
        >
          This road does not exist. Turn around, head back to the showroom and pick something with a
          throttle.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <PrimaryButton to="/" size="lg">
            Back Home
          </PrimaryButton>
          <GhostButton to="/bikes" size="lg">
            Explore Bikes
          </GhostButton>
        </motion.div>
      </div>
    </section>
  );
}
