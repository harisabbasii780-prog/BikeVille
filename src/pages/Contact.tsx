import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { BRAND, OPENING_HOURS } from '../data/site';
import { BIKES } from '../data/bikes';
import { PrimaryButton } from '../components/Buttons';
import MarqueeStrip from '../components/Marquee';
import { MARQUEE_TOP } from '../data/site';
import Reveal, { RevealWords } from '../components/Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

const INTENTS = [
  { id: 'buy', label: 'Buy a bike' },
  { id: 'sell', label: 'Sell / trade in' },
  { id: 'order', label: 'Request a quote' },
  { id: 'service', label: 'Book a service' },
  { id: 'testride', label: 'Book a test ride' },
];

export default function Contact() {
  const [params] = useSearchParams();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    intent: params.get('intent') ?? 'buy',
    bike: '',
    message: '',
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section className="grain relative isolate overflow-hidden bg-ink pb-16 pt-32 sm:pt-40">
        <img
          src="/images/scenes/riders.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/88 via-ink/80 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_75%_30%,rgba(255,90,0,0.26),transparent_66%)]" />
        <div className="shell relative">
          <p className="eyebrow mb-4 flex items-center gap-3 text-orange">
            <span className="h-px w-10 bg-orange" />
            Get in touch
          </p>
          <h1 className="display text-[clamp(2.6rem,10vw,6.5rem)] text-white">
            <RevealWords text="Talk to Us" />
          </h1>
          <p className="mt-5 max-w-xl text-[0.96rem] leading-relaxed text-white/55">
            Test rides, trade-ins, finance or a straight answer about which machine suits you. Real people,
            same-day replies.
          </p>
        </div>
      </section>

      <section className="bg-dark py-16 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          {/* form */}
          <div className="rounded-[10px] border border-white/8 bg-char p-6 sm:p-9">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex min-h-[26rem] flex-col items-center justify-center text-center"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-orange text-ink">
                  <Check size={28} strokeWidth={3} />
                </span>
                <h2 className="display mt-6 text-[1.8rem] text-white">Message sent</h2>
                <p className="mt-3 max-w-sm text-[0.92rem] leading-relaxed text-white/55">
                  Thanks {form.name || 'rider'} — one of our specialists will be in touch within a few
                  hours. Check your inbox at {form.email || 'your email'}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', email: '', phone: '', intent: 'buy', bike: '', message: '' });
                  }}
                  className="mt-7 rounded-full border border-white/15 px-6 py-3 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-orange hover:text-orange"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <h2 className="display text-[1.5rem] text-white">Send a message</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" htmlFor="name">
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={set('name')}
                      className={inputCls}
                      placeholder="Ali Hassan"
                    />
                  </Field>
                  <Field label="Email" htmlFor="email">
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={set('email')}
                      className={inputCls}
                      placeholder="you@email.com"
                    />
                  </Field>
                  <Field label="Phone" htmlFor="phone">
                    <input
                      id="phone"
                      value={form.phone}
                      onChange={set('phone')}
                      className={inputCls}
                      placeholder="0313 5586 0440"
                    />
                  </Field>
                  <Field label="I want to" htmlFor="intent">
                    <select id="intent" value={form.intent} onChange={set('intent')} className={inputCls}>
                      {INTENTS.map((i) => (
                        <option key={i.id} value={i.id} className="bg-char">
                          {i.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Machine of interest" htmlFor="bike">
                  <select id="bike" value={form.bike} onChange={set('bike')} className={inputCls}>
                    <option value="" className="bg-char">
                      Not sure yet
                    </option>
                    {BIKES.map((b) => (
                      <option key={b.id} value={b.id} className="bg-char">
                        {b.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Message" htmlFor="message">
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={set('message')}
                    className={`${inputCls} resize-none`}
                    placeholder="Tell us what you ride now and what you are after…"
                  />
                </Field>

                <PrimaryButton type="submit" size="lg" icon={<Send size={15} />}>
                  Send Message
                </PrimaryButton>
              </form>
            )}
          </div>

          {/* details */}
          <div className="space-y-4">
            {[
              { Icon: MapPin, title: 'Showroom', lines: BRAND.address },
              { Icon: Phone, title: 'Call us', lines: [BRAND.phone], href: `tel:${BRAND.phone.replace(/\s/g, '')}` },
              { Icon: Mail, title: 'Email', lines: [BRAND.email], href: `mailto:${BRAND.email}` },
            ].map(({ Icon, title, lines, href }, i) => (
              <Reveal key={title} delay={i * 0.07}>
                <div className="rounded-[10px] border border-white/8 bg-char p-5">
                  <Icon size={17} className="mb-3 text-orange" />
                  <p className="eyebrow text-white/40">{title}</p>
                  <div className="mt-2 space-y-0.5 text-[0.92rem] font-semibold text-white">
                    {href ? (
                      <a href={href} className="hover:text-orange">
                        {lines[0]}
                      </a>
                    ) : (
                      lines.map((l) => <p key={l}>{l}</p>)
                    )}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <div className="rounded-[10px] border border-white/8 bg-char p-5">
                <Clock size={17} className="mb-3 text-orange" />
                <p className="eyebrow text-white/40">Opening hours</p>
                <ul className="mt-3 space-y-2 text-[0.85rem]">
                  {OPENING_HOURS.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4 border-b border-white/6 pb-2 last:border-0">
                      <span className="text-white/50">{h.days}</span>
                      <span className="font-semibold text-white">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="relative overflow-hidden rounded-[10px] border border-white/8">
                <img
                  src="/images/scenes/street-night.webp"
                  alt="The Bikeville showroom district at night"
                  loading="lazy"
                  className="h-44 w-full object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <span className="absolute bottom-4 left-4 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white">
                  Sharah-e-Faisal · Karachi
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <MarqueeStrip top={MARQUEE_TOP} />
    </>
  );
}

const inputCls =
  'w-full rounded-[8px] border border-white/10 bg-ink px-4 py-3 text-[0.9rem] text-white placeholder:text-white/25 transition-colors focus:border-orange focus:outline-none';

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-[0.66rem] uppercase tracking-[0.2em] text-white/40">
        {label}
      </label>
      {children}
    </div>
  );
}
