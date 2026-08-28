import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type Common = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  full?: boolean;
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit';
  ariaLabel?: string;
};

const sizes: Record<string, string> = {
  sm: 'h-10 px-5 text-[0.7rem]',
  md: 'h-12 px-7 text-[0.74rem]',
  lg: 'h-14 px-9 text-[0.78rem]',
};

function Shell({ to, href, onClick, className, children, type = 'button', ariaLabel }: Common & { className: string }) {
  if (to) {
    return (
      <Link to={to} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

const base =
  'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden font-display font-bold uppercase tracking-[0.18em] transition-[transform,box-shadow,background-color,color] duration-300 ease-out select-none';

export function PrimaryButton(props: Common) {
  const { size = 'md', full, icon, children } = props;
  return (
    <Shell
      {...props}
      className={`${base} ${sizes[size]} ${full ? 'w-full' : ''} rounded-full bg-orange text-ink shadow-[0_10px_34px_-12px_rgba(255,90,0,0.85)] hover:shadow-[0_16px_46px_-10px_rgba(255,90,0,0.95)] hover:-translate-y-0.5 active:translate-y-0 ${props.className ?? ''}`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        {icon ?? <ArrowRight size={15} strokeWidth={2.6} />}
      </span>
    </Shell>
  );
}

export function GhostButton(props: Common) {
  const { size = 'md', full, icon, children } = props;
  return (
    <Shell
      {...props}
      className={`${base} ${sizes[size]} ${full ? 'w-full' : ''} rounded-full border border-white/20 bg-white/[0.03] text-white/90 backdrop-blur-sm hover:border-orange/70 hover:bg-orange/10 hover:text-white hover:-translate-y-0.5 ${props.className ?? ''}`}
    >
      <span className="relative z-10">{children}</span>
      {icon ? <span className="relative z-10">{icon}</span> : null}
    </Shell>
  );
}

export function DarkButton(props: Common) {
  const { size = 'md', full, icon, children } = props;
  return (
    <Shell
      {...props}
      className={`${base} ${sizes[size]} ${full ? 'w-full' : ''} rounded-full bg-ink text-white hover:bg-orange hover:text-ink hover:-translate-y-0.5 ${props.className ?? ''}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        {icon ?? <ArrowRight size={15} strokeWidth={2.6} />}
      </span>
    </Shell>
  );
}

export function LightButton(props: Common) {
  const { size = 'md', full, icon, children } = props;
  return (
    <Shell
      {...props}
      className={`${base} ${sizes[size]} ${full ? 'w-full' : ''} rounded-full bg-white text-ink hover:bg-orange hover:-translate-y-0.5 ${props.className ?? ''}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        {icon ?? <ArrowRight size={15} strokeWidth={2.6} />}
      </span>
    </Shell>
  );
}
