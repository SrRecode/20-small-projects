/** Number guessing feedback. */
export function checkGuess(guess, target) {
  const g = Number(guess);
  const t = Number(target);
  if (!Number.isFinite(g) || !Number.isFinite(t)) throw new Error('Guess and target must be numbers');
  if (g === t) return 'correct';
  return g < t ? 'low' : 'high';
}

export function randomTarget(max = 100, rng = Math.random) {
  return Math.floor(rng() * max) + 1;
}
