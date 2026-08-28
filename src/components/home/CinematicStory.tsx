import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { STORY_CHAPTERS } from '../../data/site';

const EASE = [0.22, 1, 0.36, 1] as const;
const COUNT = STORY_CHAPTERS.length;

function Chapter({
  progress,
  index,
  chapter,
}: {
  progress: MotionValue<number>;
  index: number;
  chapter: (typeof STORY_CHAPTERS)[number];
}) {
  const slice = 1 / COUNT;
  const start = index * slice;
  const end = start + slice;
  const fadeIn = index === 0 ? start : start + slice * 0.12;
  const fadeOut = index === COUNT - 1 ? end : end - slice * 0.12;

  const opacity = useTransform(
    progress,
    [start - slice * 0.12, fadeIn, fadeOut, end + slice * 0.12],
    [0, 1, 1, 0],
  );
  const scale = useTransform(progress, [start - slice * 0.2, end + slice * 0.2], [1.14, 1.0]);
  const textY = useTransform(progress, [start, end], ['26px', '-26px']);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.img
        src={chapter.image}
        alt={chapter.alt}
        loading="lazy"
        style={{ scale }}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.97)_4%,rgba(5,5,5,0.35)_52%,rgba(5,5,5,0.6)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_15%_95%,rgba(255,90,0,0.3),transparent_62%)]" />

      <motion.div style={{ y: textY }} className="shell absolute inset-x-0 bottom-14 sm:bottom-20">
        <p className="eyebrow mb-4 flex items-center gap-3 text-orange">
          <span className="h-px w-8 bg-orange" />
          {chapter.kicker}
        </p>
        <h3 className="display max-w-3xl text-[clamp(2.3rem,8vw,6rem)] text-white">{chapter.heading}</h3>
        <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-white/62 sm:text-base">
          {chapter.body}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function CinematicStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <section aria-label="Cinematic brand story" className="relative bg-ink">
      <div ref={ref} style={{ height: `${COUNT * 100}svh` }} className="relative">
        <div className="grain sticky top-0 h-[100svh] w-full overflow-hidden">
          {STORY_CHAPTERS.map((c, i) => (
            <Chapter key={c.id} chapter={c} index={i} progress={scrollYProgress} />
          ))}

          {/* chapter rail */}
          <div className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 sm:right-8 md:flex">
            {STORY_CHAPTERS.map((c, i) => (
              <ChapterTick key={c.id} progress={scrollYProgress} index={i} label={c.heading} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent"
          />
        </div>
      </div>
    </section>
  );
}

function ChapterTick({
  progress,
  index,
  label,
}: {
  progress: MotionValue<number>;
  index: number;
  label: string;
}) {
  const slice = 1 / COUNT;
  const height = useTransform(progress, [index * slice, (index + 1) * slice], ['0%', '100%']);
  return (
    <span className="flex items-center gap-3" title={label}>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="block h-14 w-[3px] overflow-hidden rounded-full bg-white/20">
        <motion.span style={{ height }} className="block w-full bg-orange" />
      </span>
    </span>
  );
}
