const KEY = 'bikeville.orders.v1';

export interface OrderLineItem {
  label: string;
  value: string;
}

export interface Order {
  id: string;
  createdAt: string;
  bikeId: string;
  bikeName: string;
  bikeImage: string;
  configuration: OrderLineItem[];
  total: number;
  paymentMethod: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  deliveryEstimateDays: number;
}

function readAll(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

function writeAll(orders: Order[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(orders));
  } catch {
    /* storage unavailable — non fatal */
  }
}

export function generateOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `BV-${stamp}${rand}`;
}

export function saveOrder(order: Order): Order {
  const orders = readAll();
  orders.unshift(order);
  writeAll(orders.slice(0, 25));
  return order;
}

export function getOrder(id: string): Order | undefined {
  return readAll().find((o) => o.id === id);
}
