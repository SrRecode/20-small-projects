/** Random colour helpers. */
export function randomColor(rng = Math.random) {
  const value = Math.floor(rng() * 0xffffff);
  return `#${value.toString(16).padStart(6, '0')}`;
}

/** Choose black or white text for adequate contrast on a hex background. */
export function readableText(hex) {
  const clean = String(hex).replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(clean)) return '#000000';
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#000000' : '#ffffff';
}
