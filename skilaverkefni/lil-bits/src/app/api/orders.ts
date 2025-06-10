// src/lib/api.ts
export async function fetchOrderByEmail(email: string) {
  const res = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
  if (!res.ok) return { success: false };
  const order = await res.json();
  return { success: true, order };
}
