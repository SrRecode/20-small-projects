/** Grade calculator: averages and letter grades. */
export function average(scores = []) {
  const nums = scores.map(Number).filter((n) => Number.isFinite(n));
  if (nums.length === 0) return null;
  return Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 100) / 100;
}

export function letterGrade(value) {
  if (value == null) return 'N/A';
  if (value >= 90) return 'A';
  if (value >= 80) return 'B';
  if (value >= 70) return 'C';
  if (value >= 60) return 'D';
  return 'F';
}
