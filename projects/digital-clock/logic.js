/** Clock formatting supporting 12- and 24-hour output. */
export function formatClock(date, { hour12 = false } = {}) {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '--:--:--';
  const pad = (n) => String(n).padStart(2, '0');
  let hours = d.getHours();
  let suffix = '';
  if (hour12) {
    suffix = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12 || 12;
  }
  return `${pad(hours)}:${pad(d.getMinutes())}:${pad(d.getSeconds())}${suffix}`;
}
