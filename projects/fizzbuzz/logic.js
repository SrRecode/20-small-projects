/** The classic FizzBuzz, returned as data instead of printed. */
export function fizzbuzz(count = 0) {
  const n = Math.max(0, Math.floor(Number(count) || 0));
  const out = [];
  for (let i = 1; i <= n; i += 1) {
    if (i % 15 === 0) out.push('FizzBuzz');
    else if (i % 3 === 0) out.push('Fizz');
    else if (i % 5 === 0) out.push('Buzz');
    else out.push(String(i));
  }
  return out;
}
