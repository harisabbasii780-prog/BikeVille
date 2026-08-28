import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';
import { BRAND, FOOTER_COLUMNS, OPENING_HOURS } from '../data/site';
import Logo from './Logo';
import Reveal from './Reveal';

const SOCIALS = [
  { label: 'Instagram', Icon: Instagram, href: 'https://instagram.com' },
  { label: 'Facebook', Icon: Facebook, href: 'https://facebook.com' },
  { label: 'YouTube', Icon: Youtube, href: 'https://youtube.com' },
  { label: 'X', Icon: Twitter, href: 'https://x.com' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 bg-dark">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange/70 to-transparent" />

      <div className="shell relative py-14 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.85fr_0.85fr_1.1fr] lg:gap-8">
          {/* brand block */}
          <Reveal>
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-[0.88rem] leading-relaxed text-white/45">
                {BRAND.tagline} Performance machines, obsessive prep and delivery to your door.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {SOCIALS.map(({ label, Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange hover:bg-orange hover:text-ink"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* link columns */}
          {FOOTER_COLUMNS.map((col, i) => (
            <Reveal key={col.title} delay={0.06 * (i + 1)}>
              <div>
                <h3 className="eyebrow mb-5 text-white/35">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="group inline-flex items-center gap-1 text-[0.86rem] font-semibold text-white/65 transition-colors hover:text-orange"
                      >
                        {l.label}
                        <ArrowUpRight
                          size={12}
                          className="translate-y-px opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          {/* contact + hours */}
          <Reveal delay={0.24}>
            <div>
              <h3 className="eyebrow mb-5 text-white/35">Get in Touch</h3>
              <ul className="space-y-3 text-[0.86rem] font-semibold text-white/65">
                <li className="flex gap-2.5">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-orange" />
                  <span>
                    {BRAND.address[0]}
                    <br />
                    {BRAND.address[1]}
                  </span>
                </li>
                <li>
                  <a
                    href={`tel:${BRAND.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2.5 transition-colors hover:text-orange"
                  >
                    <Phone size={15} className="shrink-0 text-orange" />
                    {BRAND.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="flex items-center gap-2.5 break-all transition-colors hover:text-orange"
                  >
                    <Mail size={15} className="shrink-0 text-orange" />
                    {BRAND.email}
                  </a>
                </li>
              </ul>

              <div className="mt-6 rounded-xl border border-white/8 bg-white/[0.03] p-4">
                <p className="mb-2.5 flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-white/35">
                  <Clock size={13} className="text-orange" />
                  Opening hours
                </p>
                <ul className="space-y-1.5 text-[0.78rem] font-semibold text-white/55">
                  {OPENING_HOURS.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4">
                      <span>{h.days}</span>
                      <span className="text-white/80">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-[0.76rem] font-medium text-white/35">
            © {new Date().getFullYear()} {BRAND.name} Motorcycles. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex items-center gap-6">
            <Link to="/about#privacy" className="text-[0.76rem] font-medium text-white/35 transition-colors hover:text-orange">
              Privacy
            </Link>
            <Link to="/about#terms" className="text-[0.76rem] font-medium text-white/35 transition-colors hover:text-orange">
              Terms
            </Link>
            <Link to="/contact" className="text-[0.76rem] font-medium text-white/35 transition-colors hover:text-orange">
              Support
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
