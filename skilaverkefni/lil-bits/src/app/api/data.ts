import type { Order } from '../../types';

const orders: Order[] = [];
let nextId = 1;

export function addOrder(o: Order): Order {
  const idx = orders.findIndex((x) => x.email === o.email);
  if (idx !== -1) {
    o.id = orders[idx].id;
    orders[idx] = o;
    return o;
  }
  o.id = nextId.toString();
  nextId++;
  orders.push(o);
  return o;
}

export function updateOrder(o: Order): Order | null {
  const idx = orders.findIndex((x) => x.email === o.email);
  if (idx === -1) return null;
  o.id = orders[idx].id;
  orders[idx] = o;
  return o;
}

export function findOrder(email: string): Order | null {
  return orders.find((x) => x.email === email) || null;
}
