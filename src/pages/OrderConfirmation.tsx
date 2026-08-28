import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Download, MapPin, Phone, Truck } from 'lucide-react';
import { getOrder } from '../lib/orders';
import type { Order } from '../lib/orders';
import { formatPKR } from '../lib/format';
import { downloadReceiptImage } from '../lib/receipt';
import { PrimaryButton, GhostButton } from '../components/Buttons';
import Reveal from '../components/Reveal';
import NotFound from './NotFound';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [checked, setChecked] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setOrder(orderId ? getOrder(orderId) : undefined);
    setChecked(true);
  }, [orderId]);

  if (!checked) return null;
  if (!order) return <NotFound />;

  const onDownload = async () => {
    setDownloading(true);
    try {
      await downloadReceiptImage(order);
    } finally {
      setDownloading(false);
    }
  };

  const orderDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <section className="grain relative isolate overflow-hidden bg-ink pb-20 pt-28 sm:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_0%,rgba(255,90,0,0.2),transparent_66%)]" />
      <div className="shell relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-lg text-center"
        >
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-orange text-ink"
          >
            <Check size={28} strokeWidth={3} />
          </motion.span>
          <p className="eyebrow mt-6 text-orange">Order confirmed</p>
          <h1 className="display mt-3 text-[clamp(2rem,6.5vw,3.4rem)] text-white">
            You&apos;re Booked, {order.customer.name.split(' ')[0] || 'Rider'}
          </h1>
          <p className="mt-4 text-[0.94rem] leading-relaxed text-white/55">
            Order <span className="font-semibold text-white">{order.id}</span> was placed on {orderDate}.
            A confirmation has been sent to {order.customer.email}.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6">
          <Reveal>
            <div className="overflow-hidden rounded-[10px] border border-white/8 bg-char">
              <div className="flex flex-col gap-4 border-b border-white/8 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-ink">
                    <img src={order.bikeImage} alt="" loading="lazy" className="h-full w-full object-contain p-1.5" />
                  </span>
                  <div>
                    <p className="text-[1.05rem] font-semibold text-white">{order.bikeName}</p>
                    <p className="mt-0.5 text-[0.78rem] text-white/40">Configured build</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-[0.64rem] uppercase tracking-[0.22em] text-white/40">Amount paid</p>
                  <p className="display mt-1 text-[1.6rem] text-orange">{formatPKR(order.total)}</p>
                </div>
              </div>

              <ul className="divide-y divide-white/6">
                {order.configuration.map((line) => (
                  <li key={line.label} className="flex items-center justify-between gap-3 px-6 py-2.5 text-[0.84rem]">
                    <span className="text-white/45">{line.label}</span>
                    <span className="font-semibold text-white">{line.value}</span>
                  </li>
                ))}
                <li className="flex items-center justify-between gap-3 px-6 py-2.5 text-[0.84rem]">
                  <span className="text-white/45">Payment method</span>
                  <span className="font-semibold text-white">{order.paymentMethod}</span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[10px] border border-white/8 bg-char p-5">
                <p className="mb-3 flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-white/40">
                  <MapPin size={14} className="text-orange" /> Delivering to
                </p>
                <p className="text-[0.9rem] font-semibold text-white">{order.customer.name}</p>
                <p className="mt-1 text-[0.84rem] leading-relaxed text-white/55">
                  {order.customer.address}, {order.customer.city}
                </p>
                <p className="mt-2 flex items-center gap-2 text-[0.82rem] text-white/55">
                  <Phone size={13} className="text-orange" />
                  {order.customer.phone}
                </p>
              </div>
              <div className="rounded-[10px] border border-white/8 bg-char p-5">
                <p className="mb-3 flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-white/40">
                  <Truck size={14} className="text-orange" /> Delivery estimate
                </p>
                <p className="text-[1.4rem] font-bold text-white">
                  {order.deliveryEstimateDays} working days
                </p>
                <p className="mt-1 text-[0.82rem] leading-relaxed text-white/55">
                  Enclosed transport, full walkaround and first-start briefing on handover.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryButton
                onClick={onDownload}
                size="lg"
                full
                icon={<Download size={15} />}
                className="disabled:pointer-events-none disabled:opacity-60"
              >
                {downloading ? 'Preparing…' : 'Download Receipt'}
              </PrimaryButton>
              <GhostButton to="/bikes" size="lg" full>
                Browse More Bikes
              </GhostButton>
            </div>
          </Reveal>

          <p className="text-center text-[0.8rem] text-white/35">
            Questions about your order?{' '}
            <Link to="/contact" className="text-orange hover:underline">
              Talk to us
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
