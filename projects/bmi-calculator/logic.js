/** Body-mass index with standard WHO categories. */
export function bmi(kilograms, metres) {
  const kg = Number(kilograms);
  const m = Number(metres);
  if (!(kg > 0) || !(m > 0)) return null;
  return Math.round((kg / (m * m)) * 10) / 10;
}

export function bmiCategory(value) {
  if (value == null) return 'unknown';
  if (value < 18.5) return 'underweight';
  if (value < 25) return 'normal';
  if (value < 30) return 'overweight';
  return 'obese';
}
