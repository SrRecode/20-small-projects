/** Shopping cart model with totals (pure functions + factory). */

export const catalog = [
  { id: 1, name: 'Apple', price: 1 },
  { id: 2, name: 'Banana', price: 0.5 },
  { id: 3, name: 'Orange', price: 0.75 },
];

const round = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const toQty = (q) => Math.max(0, Math.floor(Number(q) || 0));

function findProduct(id) {
  return catalog.find((p) => p.id === id) ?? null;
}

function ensureCart(cart) {
  return cart && typeof cart === 'object' ? cart : {};
}

export function add(cart, id, qty = 1) {
  const c = ensureCart(cart);
  const product = findProduct(id);
  if (!product) return c;
  const q = Math.max(1, Math.floor(Number(qty) || 1));
  const existing = c[id];
  const nextQty = (existing?.qty || 0) + q;
  return {
    ...c,
    [id]: {
      id: product.id,
      name: product.name,
      price: product.price,
      qty: nextQty,
    },
  };
}

export function setQty(cart, id, qty) {
  const c = ensureCart(cart);
  const product = findProduct(id);
  const q = toQty(qty);
  if (q <= 0) {
    const { [id]: _, ...rest } = c;
    return rest;
  }
  if (!product) {
    const existing = c[id];
    if (!existing) return c;
    return { ...c, [id]: { ...existing, qty: q } };
  }
  return {
    ...c,
    [id]: {
      id: product.id,
      name: product.name,
      price: product.price,
      qty: q,
    },
  };
}

export function qty(cart, id, delta) {
  const c = ensureCart(cart);
  const existing = c[id];
  const base = existing?.qty || 0;
  const d = Math.floor(Number(delta) || 0);
  return setQty(c, id, base + d);
}
export const changeQty = qty;

export function remove(cart, id) {
  const c = ensureCart(cart);
  const { [id]: _, ...rest } = c;
  return rest;
}

export function lineTotal(line) {
  if (!line) return 0;
  return round((Number(line.price) || 0) * (Number(line.qty) || 0));
}

function toLines(cart) {
  const c = ensureCart(cart);
  return Object.values(c).map((l) => ({ ...l }));
}

export function subtotal(cart, id) {
  const c = ensureCart(cart);
  if (id !== undefined && id !== null) {
    const line = c[id];
    return line ? lineTotal(line) : 0;
  }
  return round(toLines(c).reduce((acc, l) => acc + l.price * l.qty, 0));
}

export function total(cart, options = {}) {
  const base = subtotal(cart);
  const taxRate = Number(options.taxRate ?? 0) || 0;
  return round(base + base * taxRate);
}

export function count(cart) {
  const c = ensureCart(cart);
  return Object.values(c).reduce((acc, l) => acc + (Number(l.qty) || 0), 0);
}

export function createCart() {
  let cart = {};

  const api = {
    add({ name, price, qty = 1 }) {
      const label = String(name ?? '').trim();
      const unit = Number(price);
      const quantity = Math.max(1, Math.floor(Number(qty) || 1));
      if (!label) throw new Error('Name is required');
      if (!(unit >= 0)) throw new Error('Price must be a non-negative number');
      // find matching product id or assign next id based on entries
      let id = 1;
      const existingIds = Object.values(cart).map((l) => l.id);
      while (existingIds.includes(id)) id += 1;
      cart = add(cart, id, quantity);
      // overwrite with exact name/price from args
      cart = {
        ...cart,
        [id]: { id, name: label, price: unit, qty: cart[id].qty },
      };
      return cart[id];
    },
    setQty(id, qty) {
      cart = setQty(cart, id, qty);
      return cart;
    },
    subtotal() {
      return subtotal(cart);
    },
    total(options = {}) {
      return total(cart, options);
    },
    get count() {
      return count(cart);
    },
    all() {
      return toLines(cart).map((l) => ({ ...l, lineTotal: lineTotal(l) }));
    },
  };

  return api;
}
