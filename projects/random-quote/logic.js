/** Pick a random quote from a list. */
export function pickQuote(quotes = [], rng = Math.random) {
  if (!Array.isArray(quotes) || quotes.length === 0) return null;
  const index = Math.floor(rng() * quotes.length) % quotes.length;
  return quotes[index];
}
