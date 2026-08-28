const pkr = new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 });

/** Pakistani rupee amount, e.g. 2150000 -> "Rs 2,150,000" */
export function formatPKR(value: number): string {
  return `Rs ${pkr.format(Math.round(value))}`;
}

/** Rough monthly instalment over 36 months at ~9.5% p.a. */
export function monthlyEmi(price: number): string {
  const r = 0.095 / 12;
  const n = 36;
  const emi = (price * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return formatPKR(Math.round(emi / 100) * 100);
}

export function slugToTitle(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
