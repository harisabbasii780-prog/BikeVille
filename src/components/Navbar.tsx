import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu, Phone, Search, ShoppingBag, Trash2, X } from 'lucide-react';
import Logo from './Logo';
import { BRAND, NAV_LINKS } from '../data/site';
import { BIKES, CATEGORIES } from '../data/bikes';
import { useGarage } from '../lib/garage';
import { formatPKR } from '../lib/format';

const EASE = [0.22, 1, 0.36, 1] as const;

function IconAction({
  label,
  onClick,
  to,
  href,
  badge,
  className = '',
  children,
}: {
  label: string;
  onClick?: () => void;
  to?: string;
  href?: string;
  badge?: number;
  className?: string;
  children: ReactNode;
}) {
  const cls = `relative grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-orange sm:h-10 sm:w-10 ${className}`;
  const content = (
    <>
      {children}
      {typeof badge === 'number' && badge > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-orange px-1 text-[0.6rem] font-bold leading-none text-ink">
          {badge}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} aria-label={label} className={cls}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} aria-label={label} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={label} className={cls}>
      {content}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bikesOpen, setBikesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [garageOpen, setGarageOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const garage = useGarage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setBikesOpen(false);
    setGarageOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.hash]);

  const overlayActive = mobileOpen || garageOpen || searchOpen;
  useEffect(() => {
    document.body.style.overflow = overlayActive ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [overlayActive]);

  useEffect(() => {
    if (!searchOpen) return;
    const t = window.setTimeout(() => searchRef.current?.focus(), 300);
    return () => window.clearTimeout(t);
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMobileOpen(false);
      setBikesOpen(false);
      setGarageOpen(false);
      setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openSearch = () => {
    setGarageOpen(false);
    setMobileOpen(false);
    setSearchOpen(true);
  };
  const openGarage = () => {
    setSearchOpen(false);
    setMobileOpen(false);
    setGarageOpen((v) => !v);
  };
  const openMobile = () => {
    setSearchOpen(false);
    setGarageOpen(false);
    setMobileOpen(true);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/bikes?q=${encodeURIComponent(query.trim())}` : '/bikes');
    setSearchOpen(false);
    setQuery('');
  };

  const garageBikes = BIKES.filter((b) => garage.ids.includes(b.id));
  const desktopLinks = [...NAV_LINKS.slice(1), { label: 'About', to: '/about' }];
  const mobileLinks = [{ label: 'Home', to: '/' }, ...NAV_LINKS, { label: 'About', to: '/about' }];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        style={{
          backgroundColor: scrolled ? 'rgba(5,5,5,0.86)' : 'rgba(5,5,5,0.18)',
          borderBottomColor: scrolled ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          transition: 'background-color 400ms ease, border-color 400ms ease',
        }}
        className="fixed inset-x-0 top-0 z-50 border-b"
      >
        <nav
          className="shell flex h-16 items-center justify-between gap-2 sm:h-[4.25rem]"
          aria-label="Primary"
        >
          <Logo size="sm" />

          {/* desktop nav */}
          <div className="hidden items-center gap-0.5 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setBikesOpen(true)}
              onMouseLeave={() => setBikesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setBikesOpen((v) => !v)}
                aria-expanded={bikesOpen}
                aria-haspopup="true"
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.78rem] font-semibold tracking-wide text-white/80 transition-colors hover:text-orange"
              >
                Bikes
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${bikesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {bikesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="absolute left-1/2 top-full w-[min(94vw,560px)] -translate-x-1/2 pt-3"
                  >
                    <div className="glass overflow-hidden rounded-2xl p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
                      <div className="grid grid-cols-2 gap-1">
                        {CATEGORIES.map((c) => (
                          <Link
                            key={c.id}
                            to={`/bikes?category=${c.id}`}
                            className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/[0.06]"
                          >
                            <span className="h-11 w-14 shrink-0 overflow-hidden rounded-lg bg-char">
                              <img
                                src={c.image}
                                alt=""
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </span>
                            <span className="min-w-0">
                              <span className="display block text-[0.8rem] text-white group-hover:text-orange">
                                {c.label}
                              </span>
                              <span className="block truncate text-[0.7rem] text-white/45">{c.blurb}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        to="/bikes"
                        className="mt-1 block rounded-xl bg-orange/12 px-4 py-3 text-center text-[0.7rem] font-bold uppercase tracking-[0.24em] text-orange transition-colors hover:bg-orange hover:text-ink"
                      >
                        View all machines
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {desktopLinks.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-[0.78rem] font-semibold tracking-wide transition-colors hover:text-orange ${
                    isActive ? 'text-orange' : 'text-white/80'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* utilities */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <IconAction label="Search bikes" onClick={openSearch}>
              <Search size={17} />
            </IconAction>

            <IconAction
              label={`Your garage, ${garage.count} bikes saved`}
              onClick={openGarage}
              badge={garage.count}
            >
              <ShoppingBag size={17} />
            </IconAction>

            <IconAction label="Call us" href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="hidden lg:grid">
              <Phone size={16} />
            </IconAction>

            <IconAction label="Open menu" onClick={openMobile} className="lg:hidden">
              <Menu size={19} />
            </IconAction>
          </div>
        </nav>
      </motion.header>

      {/* search overlay — available at every breakpoint */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            key="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[5.5rem] sm:pt-28"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <button
              type="button"
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
              className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
            />
            <motion.form
              onSubmit={submitSearch}
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="glass relative z-10 w-full max-w-xl overflow-hidden rounded-2xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5 sm:px-5 sm:py-4">
                <Search size={18} className="shrink-0 text-orange" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search bikes, categories…"
                  aria-label="Search bikes"
                  className="min-w-0 flex-1 bg-transparent text-[0.92rem] text-white placeholder:text-white/35 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-orange"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="px-4 py-4 sm:px-5">
                <p className="eyebrow mb-3 text-white/35">Popular categories</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        navigate(`/bikes?category=${c.id}`);
                        setSearchOpen(false);
                      }}
                      className="rounded-full border border-white/10 px-3.5 py-1.5 text-[0.72rem] font-semibold text-white/70 transition-colors hover:border-orange/60 hover:text-orange"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* garage drawer — slides in from the right, same on every breakpoint */}
      <AnimatePresence>
        {garageOpen && (
          <motion.div
            key="garage-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[75]"
            role="dialog"
            aria-modal="true"
            aria-label="Your garage"
          >
            <button
              type="button"
              aria-label="Close garage"
              onClick={() => setGarageOpen(false)}
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: EASE }}
              className="grain absolute inset-y-0 right-0 flex w-full max-w-[24rem] flex-col overflow-hidden border-l border-white/10 bg-char shadow-[-30px_0_90px_-20px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-5 sm:px-6">
                <div className="min-w-0">
                  <p className="eyebrow text-orange">Your garage</p>
                  <p className="mt-1 text-[0.78rem] text-white/45">
                    {garage.count} machine{garage.count === 1 ? '' : 's'} saved
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setGarageOpen(false)}
                  aria-label="Close garage"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-orange hover:text-orange"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {garageBikes.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-white/5 text-white/30">
                      <ShoppingBag size={26} />
                    </span>
                    <p className="mt-5 text-[0.9rem] leading-relaxed text-white/45">
                      No machines saved yet. Add one from any bike page to compare later.
                    </p>
                  </div>
                ) : (
                  <ul>
                    {garageBikes.map((b) => (
                      <li
                        key={b.id}
                        className="flex items-center gap-4 border-b border-white/6 px-5 py-4 sm:px-6"
                      >
                        <span className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-ink">
                          <img
                            src={b.image}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-contain p-1.5"
                          />
                        </span>
                        <Link
                          to={`/bikes/${b.id}`}
                          className="min-w-0 flex-1"
                          onClick={() => setGarageOpen(false)}
                        >
                          <span className="block truncate text-[0.88rem] font-semibold text-white">
                            {b.name}
                          </span>
                          <span className="mt-0.5 block text-[0.78rem] font-bold text-orange">
                            {formatPKR(b.price)}
                          </span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => garage.remove(b.id)}
                          aria-label={`Remove ${b.name} from garage`}
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/35 transition-colors hover:bg-white/10 hover:text-orange"
                        >
                          <Trash2 size={15} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="space-y-3 border-t border-white/10 px-5 py-5 sm:px-6">
                {garage.count > 0 && (
                  <button
                    type="button"
                    onClick={garage.clear}
                    className="w-full text-center text-[0.72rem] font-semibold text-white/45 transition-colors hover:text-orange"
                  >
                    Clear garage
                  </button>
                )}
                <Link
                  to="/bikes"
                  onClick={() => setGarageOpen(false)}
                  className="flex h-14 w-full items-center justify-center rounded-full bg-orange font-display text-[0.75rem] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-white"
                >
                  Browse all bikes
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobilemenu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <motion.div
              initial={{ clipPath: 'circle(0% at 92% 5%)' }}
              animate={{ clipPath: 'circle(150% at 92% 5%)' }}
              exit={{ clipPath: 'circle(0% at 92% 5%)' }}
              transition={{ duration: 0.55, ease: EASE }}
              className="grain absolute inset-0 overflow-y-auto bg-ink"
            >
              <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 glow-orange opacity-70" />
              <div className="relative flex min-h-full flex-col px-6 pb-8 pt-5">
                <div className="flex items-center justify-between">
                  <Logo size="sm" />
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-orange hover:text-orange"
                  >
                    <X size={20} />
                  </button>
                </div>

                <motion.ul
                  className="mt-7"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.12 } } }}
                >
                  {mobileLinks.map((l, i) => (
                    <motion.li
                      key={l.label}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
                      }}
                    >
                      <NavLink
                        to={l.to}
                        className={({ isActive }) =>
                          `group flex items-center justify-between gap-3 border-b border-white/8 py-3.5 transition-colors ${
                            isActive ? 'text-orange' : 'text-white'
                          }`
                        }
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-display text-[0.68rem] font-bold text-orange/70">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="display text-[1.3rem] leading-none tracking-[-0.02em] transition-colors group-hover:text-orange">
                            {l.label}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="shrink-0 -translate-x-1 text-white/25 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-orange group-hover:opacity-100"
                        />
                      </NavLink>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                  className="mt-7"
                >
                  <p className="eyebrow mb-3 text-white/40">Categories</p>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((c) => (
                      <Link
                        key={c.id}
                        to={`/bikes?category=${c.id}`}
                        className="relative overflow-hidden rounded-xl border border-white/10 px-3 py-3 text-[0.78rem] font-semibold text-white/85 transition-colors hover:border-orange/60 hover:text-orange"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.48, duration: 0.5, ease: EASE }}
                  className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/8 pt-5 text-[0.78rem] text-white/60"
                >
                  <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 transition-colors hover:text-orange">
                    <Phone size={14} className="text-orange" />
                    {BRAND.phone}
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.56, duration: 0.5, ease: EASE }}
                  className="mt-auto pt-6"
                >
                  <Link
                    to="/bikes"
                    className="flex h-14 w-full items-center justify-center rounded-full bg-orange font-display text-[0.78rem] font-bold uppercase tracking-[0.2em] text-ink transition-transform duration-300 active:scale-[0.98]"
                  >
                    Explore Bikes
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
