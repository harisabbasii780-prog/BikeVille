interface RowProps {
  items: string[];
  direction?: 'left' | 'right';
  duration?: number;
  tone?: 'dark' | 'orange';
}

function Row({ items, direction = 'left', duration = 40, tone = 'dark' }: RowProps) {
  const doubled = [...items, ...items];
  const textColor = tone === 'orange' ? 'text-ink' : 'text-white';
  const dotColor = tone === 'orange' ? 'bg-ink/70' : 'bg-orange';

  return (
    <div className="marquee-mask overflow-hidden py-3" aria-hidden="true">
      <div
        className={`marquee-track ${direction === 'left' ? 'marquee-l' : 'marquee-r'}`}
        style={{ ['--bv-dur' as string]: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center">
            <span
              className={`display px-6 text-[0.66rem] tracking-[0.26em] sm:text-[0.74rem] ${textColor}`}
            >
              {item}
            </span>
            <span className={`h-1.5 w-1.5 rotate-45 shrink-0 ${dotColor}`} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeStrip({
  top,
  bottom,
  tone = 'dark',
}: {
  top: string[];
  bottom?: string[];
  tone?: 'dark' | 'orange';
}) {
  const wrap =
    tone === 'orange'
      ? 'border-y border-ink/20 bg-orange'
      : 'border-y border-white/10 bg-ink';

  return (
    <div className={`relative z-20 w-full overflow-hidden ${wrap}`}>
      <Row items={top} direction="left" duration={42} tone={tone} />
      {bottom ? (
        <>
          <div className={tone === 'orange' ? 'h-px bg-ink/15' : 'h-px bg-white/10'} />
          <Row items={bottom} direction="right" duration={52} tone={tone} />
        </>
      ) : null}
    </div>
  );
}
