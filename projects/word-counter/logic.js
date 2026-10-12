/** Text statistics for a word counter. */
export function analyzeText(text = '') {
  const raw = String(text);
  const words = raw.trim() === '' ? [] : raw.trim().split(/\s+/);
  const sentences = (raw.match(/[.!?]+(\s|$)/g) ?? []).length;
  const characters = raw.length;
  const readingTimeMinutes = Math.max(words.length ? 1 : 0, Math.ceil(words.length / 200));
  return {
    words: words.length,
    characters,
    sentences,
    readingTimeMinutes,
  };
}
