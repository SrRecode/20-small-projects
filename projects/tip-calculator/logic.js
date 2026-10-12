/** Tip calculator: splits a bill plus tip across people. */
export function calculateTip({ bill = 0, tipPercent = 0, people = 1 } = {}) {
  const amount = Number(bill) || 0;
  const pct = Number(tipPercent) || 0;
  const count = Math.max(1, Math.floor(Number(people) || 1));
  const tip = round(amount * (pct / 100));
  const total = round(amount + tip);
  return { tip, total, perPerson: round(total / count) };
}

function round(n) {
  return Math.round(n * 100) / 100;
}
