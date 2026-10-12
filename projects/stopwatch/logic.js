/** Stopwatch formatting and accumulation. */
export function formatTime(ms) {
  const safe = Math.max(0, Math.floor(ms));
  const centis = Math.floor(safe / 10) % 100;
  const seconds = Math.floor(safe / 1000) % 60;
  const minutes = Math.floor(safe / 60000) % 60;
  const hours = Math.floor(safe / 3600000);
  const pad = (n) => String(n).padStart(2, '0');
  const core = `${pad(minutes)}:${pad(seconds)}.${pad(centis)}`;
  return hours > 0 ? `${pad(hours)}:${core}` : core;
}

export function accumulate(elapsed, delta) {
  return Math.max(0, elapsed + delta);
}
