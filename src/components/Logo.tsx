import { Link } from 'react-router-dom';
import { BRAND } from '../data/site';

export default function Logo({
  tone = 'light',
  size = 'md',
}: {
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}) {
  const text = tone === 'light' ? 'text-white' : 'text-ink';
  const dims = size === 'lg' ? 'text-2xl md:text-3xl' : size === 'sm' ? 'text-base' : 'text-lg md:text-xl';
  const mark = size === 'lg' ? 'h-10 w-10' : size === 'sm' ? 'h-7 w-7' : 'h-8 w-8';

  return (
    <Link to="/" className="group inline-flex items-center gap-2.5" aria-label={`${BRAND.name} home`}>
      <span
        className={`${mark} relative grid shrink-0 place-items-center overflow-hidden bg-orange transition-transform duration-500 group-hover:rotate-6`}
        style={{ clipPath: 'polygon(18% 0,100% 0,82% 100%,0 100%)' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" fill="none">
          <path d="M4 18 L12 6 L14.5 12 L20 6" stroke="#050505" strokeWidth="3" strokeLinecap="square" />
        </svg>
      </span>
      <span className={`display ${dims} ${text} leading-none tracking-[-0.04em]`}>
        {BRAND.wordmarkA}
        <span className={tone === 'light' ? 'text-orange' : 'text-white'}>{BRAND.wordmarkB}</span>
      </span>
    </Link>
  );
}
