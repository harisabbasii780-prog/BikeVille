import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Banknote,
  Building2,
  ChevronRight,
  CreditCard,
  Lock,
  Smartphone,
  Truck,
} from 'lucide-react';
import { formatPKR } from '../lib/format';
import { generateOrderId, saveOrder } from '../lib/orders';
import type { Order, OrderLineItem } from '../lib/orders';
import { PrimaryButton } from '../components/Buttons';
import Reveal from '../components/Reveal';

const EASE = [0.22, 1, 0.36, 1] as const;

interface CheckoutState {
  bikeId: string;
  bikeName: string;
  bikeImage: string;
  configuration: OrderLineItem[];
  total: number;
}

const PAYMENT_METHODS = [
  { id: 'card', label: 'Debit / Credit Card', desc: 'Visa, Mastercard, UnionPay', Icon: CreditCard },
  { id: 'easypaisa', label: 'Easypaisa / JazzCash', desc: 'Pay via mobile wallet', Icon: Smartphone },
  { id: 'bank', label: 'Bank Transfer', desc: 'Direct transfer to our account', Icon: Building2 },
  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when your bike arrives', Icon: Banknote },
];

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

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as CheckoutState | null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Karachi');
  const [method, setMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const deliveryEstimateDays = 7;

  const totalWithDelivery = useMemo(() => (state ? state.total : 0), [state]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!state) return;
    setSubmitting(true);

    const order: Order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      bikeId: state.bikeId,
      bikeName: state.bikeName,
      bikeImage: state.bikeImage,
      configuration: state.configuration,
      total: totalWithDelivery,
      paymentMethod: PAYMENT_METHODS.find((p) => p.id === method)?.label ?? method,
      customer: { name, email, phone, address, city },
      deliveryEstimateDays,
    };

    // simulate a brief processing step for a realistic payment feel
    window.setTimeout(() => {
      saveOrder(order);
      navigate(`/order-confirmed/${order.id}`, { replace: true });
    }, 900);
  };

  if (!state) {
    return (
      <section className="grain relative isolate flex min-h-[70svh] items-center overflow-hidden bg-ink pt-24">
        <div className="shell relative py-16 text-center">
          <p className="eyebrow mb-4 text-orange">Checkout</p>
          <h1 className="display text-[clamp(2rem,6vw,3.4rem)] text-white">No build selected yet</h1>
          <p className="mx-auto mt-4 max-w-md text-[0.94rem] leading-relaxed text-white/55">
            Choose a machine and configure it first — pricing and delivery details will carry
            straight through to checkout.
          </p>
          <div className="mt-8 flex justify-center">
            <PrimaryButton to="/bikes" size="lg">
              Browse Bikes
            </PrimaryButton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="grain relative isolate overflow-hidden bg-ink pb-20 pt-28 sm:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(55%_50%_at_80%_10%,rgba(255,90,0,0.16),transparent_66%)]" />
      <div className="shell relative">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[0.72rem] text-white/45">
          <Link to="/" className="hover:text-orange">
            Home
          </Link>
          <ChevronRight size={13} />
          <Link to={`/bikes/${state.bikeId}`} className="hover:text-orange">
            {state.bikeName}
          </Link>
          <ChevronRight size={13} />
          <span className="text-white/80">Checkout</span>
        </nav>

        <div className="mb-10">
          <p className="eyebrow mb-4 flex items-center gap-3 text-orange">
            <span className="h-px w-10 bg-orange" />
            Secure checkout
          </p>
          <h1 className="display text-[clamp(2.2rem,7vw,4rem)] text-white">Complete Your Order</h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          {/* form */}
          <Reveal>
            <form onSubmit={onSubmit} className="space-y-8">
              <div className="rounded-[10px] border border-white/8 bg-char p-6 sm:p-8">
                <h2 className="display text-[1.3rem] text-white">Delivery Details</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" htmlFor="co-name">
                    <input
                      id="co-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputCls}
                      placeholder="Ali Hassan"
                    />
                  </Field>
                  <Field label="Phone" htmlFor="co-phone">
                    <input
                      id="co-phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputCls}
                      placeholder="0313 5586 0440"
                    />
                  </Field>
                  <Field label="Email" htmlFor="co-email">
                    <input
                      id="co-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputCls}
                      placeholder="you@email.com"
                    />
                  </Field>
                  <Field label="City" htmlFor="co-city">
                    <input
                      id="co-city"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={inputCls}
                      placeholder="Karachi"
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Delivery address" htmlFor="co-address">
                      <input
                        id="co-address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={inputCls}
                        placeholder="House / street, area, landmark"
                      />
                    </Field>
                  </div>
                </div>
                <p className="mt-4 flex items-center gap-2 text-[0.78rem] text-white/40">
                  <Truck size={14} className="text-orange" />
                  Estimated delivery in {deliveryEstimateDays} working days via enclosed transport.
                </p>
              </div>

              <div className="rounded-[10px] border border-white/8 bg-char p-6 sm:p-8">
                <h2 className="display text-[1.3rem] text-white">Payment Method</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {PAYMENT_METHODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethod(m.id)}
                      aria-pressed={method === m.id}
                      className={`flex items-start gap-3 rounded-[10px] border p-4 text-left transition-colors ${
                        method === m.id
                          ? 'border-orange bg-orange/10'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                      }`}
                    >
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                          method === m.id ? 'bg-orange text-ink' : 'bg-white/8 text-white/60'
                        }`}
                      >
                        <m.Icon size={16} />
                      </span>
                      <span>
                        <span className="block text-[0.86rem] font-semibold text-white">{m.label}</span>
                        <span className="mt-0.5 block text-[0.74rem] text-white/45">{m.desc}</span>
                      </span>
                    </button>
                  ))}
                </div>

                {method === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="mt-6 grid gap-4 sm:grid-cols-2"
                  >
                    <div className="sm:col-span-2">
                      <Field label="Card number" htmlFor="co-card">
                        <input
                          id="co-card"
                          required
                          inputMode="numeric"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className={inputCls}
                          placeholder="4242 4242 4242 4242"
                          maxLength={19}
                        />
                      </Field>
                    </div>
                    <Field label="Expiry" htmlFor="co-expiry">
                      <input
                        id="co-expiry"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className={inputCls}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </Field>
                    <Field label="CVV" htmlFor="co-cvv">
                      <input
                        id="co-cvv"
                        required
                        inputMode="numeric"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className={inputCls}
                        placeholder="123"
                        maxLength={4}
                      />
                    </Field>
                  </motion.div>
                )}

                {method === 'bank' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="mt-6 rounded-[10px] border border-white/10 bg-ink p-4 text-[0.82rem] leading-relaxed text-white/55"
                  >
                    Transfer the full amount to <span className="text-white">BIKEVILLE (Pvt) Ltd — HBL, A/C
                    0149-7912345-01</span>, then keep your transaction slip — we&apos;ll confirm within a
                    few hours of order placement.
                  </motion.div>
                )}

                {method === 'easypaisa' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="mt-6 rounded-[10px] border border-white/10 bg-ink p-4 text-[0.82rem] leading-relaxed text-white/55"
                  >
                    You&apos;ll receive a payment request on <span className="text-white">0313 5586 0440</span> after
                    placing the order — approve it from your Easypaisa or JazzCash app.
                  </motion.div>
                )}

                <p className="mt-6 flex items-center gap-2 text-[0.74rem] text-white/35">
                  <Lock size={13} className="text-orange" />
                  This is a demo checkout — no real payment is processed.
                </p>
              </div>

              <PrimaryButton type="submit" size="lg" full icon={<Lock size={15} />} className="disabled:pointer-events-none disabled:opacity-60">
                {submitting ? 'Processing…' : `Pay ${formatPKR(totalWithDelivery)} & Place Order`}
              </PrimaryButton>
            </form>
          </Reveal>

          {/* order summary */}
          <Reveal delay={0.1}>
            <div className="sticky top-24 space-y-4">
              <div className="overflow-hidden rounded-[10px] border border-white/8 bg-char">
                <div className="flex items-center gap-4 border-b border-white/8 p-5">
                  <span className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-ink">
                    <img
                      src={state.bikeImage}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-contain p-1.5"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[0.98rem] font-semibold text-white">{state.bikeName}</p>
                    <p className="mt-0.5 text-[0.76rem] text-white/40">Configured build</p>
                  </div>
                </div>

                <ul className="divide-y divide-white/6">
                  {state.configuration.map((line) => (
                    <li key={line.label} className="flex items-center justify-between gap-3 px-5 py-2.5 text-[0.82rem]">
                      <span className="text-white/45">{line.label}</span>
                      <span className="font-semibold text-white">{line.value}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/8 p-5">
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-[0.66rem] uppercase tracking-[0.22em] text-white/45">Total</p>
                    <p className="display text-[1.6rem] text-orange">{formatPKR(totalWithDelivery)}</p>
                  </div>
                  <p className="mt-1 text-right text-[0.72rem] text-white/35">Inclusive of delivery</p>
                </div>
              </div>

              <div className="rounded-[10px] border border-white/8 bg-white/[0.02] p-5 text-[0.8rem] leading-relaxed text-white/45">
                Free 3 services, factory-trained technicians and genuine parts on every machine we
                deliver.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
