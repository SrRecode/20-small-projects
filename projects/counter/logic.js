/** Counter with clamping bounds. Pure so it can be unit tested. */
export function adjust(value, delta, { min = -Infinity, max = Infinity } = {}) {
  const next = value + delta;
  return Math.min(max, Math.max(min, next));
}
