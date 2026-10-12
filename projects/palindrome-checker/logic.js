/** Palindrome check ignoring case, spaces and punctuation. */
export function normalize(text = '') {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

export function isPalindrome(text = '') {
  const clean = normalize(text);
  if (clean === '') return false;
  return clean === [...clean].reverse().join('');
}
