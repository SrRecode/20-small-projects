/** Convert between Celsius, Fahrenheit and Kelvin. */
const TO_CELSIUS = {
  C: (v) => v,
  F: (v) => (v - 32) * (5 / 9),
  K: (v) => v - 273.15,
};

const FROM_CELSIUS = {
  C: (v) => v,
  F: (v) => v * (9 / 5) + 32,
  K: (v) => v + 273.15,
};

export function convertTemperature(value, from, to) {
  if (!(from in TO_CELSIUS) || !(to in FROM_CELSIUS)) {
    throw new Error('Units must be one of C, F, K');
  }
  const celsius = TO_CELSIUS[from](Number(value));
  return Math.round(FROM_CELSIUS[to](celsius) * 100) / 100;
}
