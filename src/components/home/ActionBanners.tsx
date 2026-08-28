import { motion } from 'framer-motion';
import { Search, Tag } from 'lucide-react';
import { LightButton, PrimaryButton } from '../Buttons';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ActionBanners() {
  return (
    <section aria-label="Buy or sell a bike" className="bg-cream pb-20 sm:pb-28 lg:pb-32">
      <div className="shell grid gap-4 lg:grid-cols-2">
        {/* find a bike */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="group relative min-h-[19rem] overflow-hidden rounded-[10px] bg-ink p-7 sm:p-10"
        >
          <img
            src="/images/scenes/riders.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-right transition-transform duration-[1100ms] ease-out group-hover:scale-105"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(100deg,rgba(5,5,5,0.96)_12%,rgba(5,5,5,0.7)_46%,rgba(5,5,5,0.18)_88%)]"
          />
          <div className="relative flex h-full max-w-sm flex-col">
            <span className="mb-6 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-orange backdrop-blur-sm">
              <Search size={18} />
            </span>
            <h3 className="display text-[clamp(1.5rem,4vw,2.3rem)] text-white">Are You Looking For a Bike?</h3>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-white/55">
              Browse the full range, filter by discipline and find the one that fits the way you ride.
            </p>
            <div className="mt-7">
              <LightButton to="/bikes">Find a Bike</LightButton>
            </div>
          </div>
        </motion.article>

        {/* sell a bike */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="group relative min-h-[19rem] overflow-hidden rounded-[10px] bg-orange p-7 sm:p-10"
        >
          <img
            src="/images/scenes/lineup.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-luminosity transition-transform duration-[1100ms] ease-out group-hover:scale-105"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(100deg,rgba(5,5,5,0.92)_10%,rgba(255,90,0,0.55)_58%,rgba(255,140,66,0.35)_100%)]"
          />
          <div className="relative flex h-full max-w-sm flex-col">
            <span className="mb-6 grid h-11 w-11 place-items-center rounded-full bg-white/12 text-white backdrop-blur-sm">
              <Tag size={18} />
            </span>
            <h3 className="display text-[clamp(1.5rem,4vw,2.3rem)] text-white">Want to Sell Your Bike?</h3>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-white/70">
              Get an instant valuation and trade in against your next machine. Paperwork handled in-house.
            </p>
            <div className="mt-7">
              <PrimaryButton to="/contact?intent=sell" className="!bg-white hover:!bg-ink hover:!text-white">
                Sell Now
              </PrimaryButton>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
