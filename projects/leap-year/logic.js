/** Gregorian leap-year rule. */
export function isLeapYear(year) {
  const y = Number(year);
  if (!Number.isInteger(y) || y < 1) return false;
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}
