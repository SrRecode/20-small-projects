/** Roll dice and total them. */
export function rollDie(sides = 6, rng = Math.random) {
  if (!Number.isInteger(sides) || sides < 2) throw new Error('sides must be an integer >= 2');
  return Math.floor(rng() * sides) + 1;
}

export function rollDice(count = 1, sides = 6, rng = Math.random) {
  const n = Math.max(1, Math.floor(Number(count) || 1));
  return Array.from({ length: n }, () => rollDie(sides, rng));
}

export function sum(values = []) {
  return values.reduce((acc, v) => acc + v, 0);
}
