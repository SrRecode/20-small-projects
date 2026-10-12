/** Score a password's strength (0-4) with actionable feedback. */
export function scorePassword(password = '') {
  const pw = String(password);
  let score = 0;
  const feedback = [];

  if (pw.length >= 8) score += 1;
  else feedback.push('Use at least 8 characters');

  if (pw.length >= 12) score += 1;
  else feedback.push('12 or more characters is stronger');

  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 1;
  else feedback.push('Mix upper and lower case');

  if (/\d/.test(pw)) score += 1;
  else feedback.push('Add a number');

  if (/[^A-Za-z0-9]/.test(pw)) score += 1;
  else feedback.push('Add a symbol');

  const capped = Math.min(4, score);
  const labels = ['very weak', 'weak', 'fair', 'good', 'strong'];
  return { score: capped, label: labels[capped], feedback };
}
