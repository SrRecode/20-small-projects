/** Caesar cipher. */
export function shiftChar(char, shift) {
  const code = char.charCodeAt(0);
  const isUpper = code >= 65 && code <= 90;
  const isLower = code >= 97 && code <= 122;
  if (!isUpper && !isLower) return char;
  const base = isUpper ? 65 : 97;
  const offset = (((code - base + shift) % 26) + 26) % 26;
  return String.fromCharCode(base + offset);
}

export function encrypt(text = '', shift = 3) {
  return [...String(text)].map((c) => shiftChar(c, Number(shift) || 0)).join('');
}

export function decrypt(text = '', shift = 3) {
  return encrypt(text, -(Number(shift) || 0));
}
