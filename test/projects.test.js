import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { projects, slugs } from '../src/manifest.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const load = (slug) => import(`../projects/${slug}/logic.js`);

describe('counter', () => {
  test('adjust adds a delta', async () => {
    const { adjust } = await load('counter');
    assert.equal(adjust(2, 3), 5);
  });
  test('adjust clamps to bounds', async () => {
    const { adjust } = await load('counter');
    assert.equal(adjust(10, 5, { min: 0, max: 10 }), 10);
    assert.equal(adjust(0, -1, { min: 0, max: 10 }), 0);
  });
});

describe('stopwatch', () => {
  test('formats centiseconds, seconds and minutes', async () => {
    const { formatTime } = await load('stopwatch');
    assert.equal(formatTime(0), '00:00.00');
    assert.equal(formatTime(1234), '00:01.23');
    assert.equal(formatTime(61000), '01:01.00');
  });
  test('includes hours when needed', async () => {
    const { formatTime } = await load('stopwatch');
    assert.equal(formatTime(3661000), '01:01:01.00');
  });
  test('accumulate never goes negative', async () => {
    const { accumulate } = await load('stopwatch');
    assert.equal(accumulate(100, -500), 0);
    assert.equal(accumulate(100, 50), 150);
  });
});

describe('tip-calculator', () => {
  test('computes tip, total and per-person share', async () => {
    const { calculateTip } = await load('tip-calculator');
    assert.deepEqual(calculateTip({ bill: 100, tipPercent: 15, people: 2 }), {
      tip: 15,
      total: 115,
      perPerson: 57.5,
    });
  });
  test('defaults to one person', async () => {
    const { calculateTip } = await load('tip-calculator');
    assert.equal(calculateTip({ bill: 50, tipPercent: 10 }).perPerson, 55);
  });
});

describe('bmi-calculator', () => {
  test('computes a rounded BMI', async () => {
    const { bmi } = await load('bmi-calculator');
    assert.equal(bmi(70, 1.75), 22.9);
  });
  test('returns null for invalid input', async () => {
    const { bmi, bmiCategory } = await load('bmi-calculator');
    assert.equal(bmi(0, 1.75), null);
    assert.equal(bmiCategory(null), 'unknown');
  });
  test('categorises correctly', async () => {
    const { bmiCategory } = await load('bmi-calculator');
    assert.equal(bmiCategory(17), 'underweight');
    assert.equal(bmiCategory(22), 'normal');
    assert.equal(bmiCategory(27), 'overweight');
    assert.equal(bmiCategory(31), 'obese');
  });
});

describe('temperature-converter', () => {
  test('converts C to F and K', async () => {
    const { convertTemperature } = await load('temperature-converter');
    assert.equal(convertTemperature(0, 'C', 'F'), 32);
    assert.equal(convertTemperature(0, 'C', 'K'), 273.15);
  });
  test('round-trips and rejects bad units', async () => {
    const { convertTemperature } = await load('temperature-converter');
    assert.equal(convertTemperature(212, 'F', 'C'), 100);
    assert.throws(() => convertTemperature(1, 'X', 'C'), /Units must be/);
  });
});

describe('color-flipper', () => {
  test('randomColor returns a 6-digit hex', async () => {
    const { randomColor } = await load('color-flipper');
    assert.match(randomColor(() => 0.5), /^#[0-9a-f]{6}$/);
  });
  test('readableText picks contrasting colour', async () => {
    const { readableText } = await load('color-flipper');
    assert.equal(readableText('#ffffff'), '#000000');
    assert.equal(readableText('#000000'), '#ffffff');
  });
});

describe('random-quote', () => {
  test('picks deterministically with an injected rng', async () => {
    const { pickQuote } = await load('random-quote');
    assert.equal(pickQuote(['a', 'b', 'c'], () => 0), 'a');
    assert.equal(pickQuote(['a', 'b', 'c'], () => 0.99), 'c');
  });
  test('returns null for an empty list', async () => {
    const { pickQuote } = await load('random-quote');
    assert.equal(pickQuote([]), null);
  });
});

describe('dice-roller', () => {
  test('rollDie stays within range', async () => {
    const { rollDie } = await load('dice-roller');
    assert.equal(rollDie(6, () => 0), 1);
    assert.equal(rollDie(6, () => 0.999), 6);
  });
  test('rollDice returns the requested count and sum totals', async () => {
    const { rollDice, sum } = await load('dice-roller');
    const rolls = rollDice(4, 6, () => 0);
    assert.deepEqual(rolls, [1, 1, 1, 1]);
    assert.equal(sum(rolls), 4);
  });
  test('rejects invalid sides', async () => {
    const { rollDie } = await load('dice-roller');
    assert.throws(() => rollDie(1), /sides/);
  });
});

describe('password-strength', () => {
  test('scores a strong password at 4', async () => {
    const { scorePassword } = await load('password-strength');
    assert.equal(scorePassword('Str0ng!Passw0rd').score, 4);
  });
  test('scores a weak password low and gives feedback', async () => {
    const { scorePassword } = await load('password-strength');
    const result = scorePassword('abc');
    assert.ok(result.score <= 1);
    assert.ok(result.feedback.length > 0);
  });
});

describe('palindrome-checker', () => {
  test('detects palindromes ignoring case and punctuation', async () => {
    const { isPalindrome } = await load('palindrome-checker');
    assert.equal(isPalindrome('A man, a plan, a canal: Panama'), true);
    assert.equal(isPalindrome('Hello'), false);
  });
  test('empty string is not a palindrome', async () => {
    const { isPalindrome } = await load('palindrome-checker');
    assert.equal(isPalindrome('   '), false);
  });
});

describe('word-counter', () => {
  test('counts words, characters and sentences', async () => {
    const { analyzeText } = await load('word-counter');
    const result = analyzeText('Hello world. This is fine!');
    assert.equal(result.words, 5);
    assert.equal(result.sentences, 2);
    assert.equal(result.characters, 26);
  });
  test('empty text yields zero words and no reading time', async () => {
    const { analyzeText } = await load('word-counter');
    assert.equal(analyzeText('').words, 0);
    assert.equal(analyzeText('').readingTimeMinutes, 0);
  });
});

describe('fizzbuzz', () => {
  test('produces the expected sequence', async () => {
    const { fizzbuzz } = await load('fizzbuzz');
    assert.deepEqual(fizzbuzz(15), [
      '1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz',
    ]);
  });
});

describe('rock-paper-scissors', () => {
  test('resolves every outcome', async () => {
    const { playRound } = await load('rock-paper-scissors');
    assert.equal(playRound('rock', 'scissors'), 'win');
    assert.equal(playRound('rock', 'paper'), 'lose');
    assert.equal(playRound('rock', 'rock'), 'draw');
  });
  test('rejects invalid choices', async () => {
    const { playRound } = await load('rock-paper-scissors');
    assert.throws(() => playRound('fire', 'rock'), /Invalid/);
  });
});

describe('number-guessing', () => {
  test('gives low/high/correct feedback', async () => {
    const { checkGuess } = await load('number-guessing');
    assert.equal(checkGuess(5, 10), 'low');
    assert.equal(checkGuess(15, 10), 'high');
    assert.equal(checkGuess(10, 10), 'correct');
  });
});

describe('digital-clock', () => {
  test('formats 24-hour time', async () => {
    const { formatClock } = await load('digital-clock');
    assert.equal(formatClock(new Date(2026, 0, 1, 9, 5, 3)), '09:05:03');
  });
  test('formats 12-hour time with a suffix', async () => {
    const { formatClock } = await load('digital-clock');
    assert.equal(formatClock(new Date(2026, 0, 1, 15, 0, 0), { hour12: true }), '03:00:00 PM');
    assert.equal(formatClock(new Date(2026, 0, 1, 0, 0, 0), { hour12: true }), '12:00:00 AM');
  });
});

describe('todo-list', () => {
  test('adds, toggles, filters and clears', async () => {
    const { createTodoList } = await load('todo-list');
    const list = createTodoList();
    const a = list.add('Write tests');
    list.add('Ship it');
    list.toggle(a.id);
    assert.equal(list.filter('completed').length, 1);
    assert.equal(list.remaining, 1);
    list.clearCompleted();
    assert.equal(list.all().length, 1);
  });
  test('rejects an empty title', async () => {
    const { createTodoList } = await load('todo-list');
    assert.throws(() => createTodoList().add('  '), /required/);
  });
});

describe('shopping-cart', () => {
  test('totals line items with tax', async () => {
    const { createCart } = await load('shopping-cart');
    const cart = createCart();
    cart.add({ name: 'Apple', price: 0.5, qty: 4 });
    cart.add({ name: 'Bread', price: 2, qty: 1 });
    assert.equal(cart.subtotal(), 4);
    assert.equal(cart.total({ taxRate: 0.1 }), 4.4);
    assert.equal(cart.count, 5);
  });
  test('setQty(0) removes the line', async () => {
    const { createCart } = await load('shopping-cart');
    const cart = createCart();
    const line = cart.add({ name: 'Milk', price: 1 });
    cart.setQty(line.id, 0);
    assert.equal(cart.all().length, 0);
  });
});

describe('grade-calculator', () => {
  test('averages scores and maps to letters', async () => {
    const { average, letterGrade } = await load('grade-calculator');
    assert.equal(average([90, 80, 100]), 90);
    assert.equal(letterGrade(90), 'A');
    assert.equal(letterGrade(59), 'F');
  });
  test('empty input has no average', async () => {
    const { average, letterGrade } = await load('grade-calculator');
    assert.equal(average([]), null);
    assert.equal(letterGrade(null), 'N/A');
  });
});

describe('leap-year', () => {
  test('applies the Gregorian rule', async () => {
    const { isLeapYear } = await load('leap-year');
    assert.equal(isLeapYear(2024), true);
    assert.equal(isLeapYear(1900), false);
    assert.equal(isLeapYear(2000), true);
    assert.equal(isLeapYear(2023), false);
  });
});

describe('caesar-cipher', () => {
  test('encrypts and decrypts, preserving case and punctuation', async () => {
    const { encrypt, decrypt } = await load('caesar-cipher');
    const cipher = encrypt('Hello, World!', 3);
    assert.equal(cipher, 'Khoor, Zruog!');
    assert.equal(decrypt(cipher, 3), 'Hello, World!');
  });
  test('wraps around the alphabet both ways', async () => {
    const { encrypt } = await load('caesar-cipher');
    assert.equal(encrypt('xyz', 3), 'abc');
    assert.equal(encrypt('abc', -3), 'xyz');
  });
});

describe('project gallery integrity', () => {
  test('there are exactly 20 unique projects', () => {
    assert.equal(projects.length, 20);
    assert.equal(new Set(slugs).size, 20);
  });

  test('every project ships an index.html, logic.js and style.css', async () => {
    for (const slug of slugs) {
      for (const file of ['index.html', 'logic.js', 'style.css']) {
        const full = join(root, 'projects', slug, file);
        await assert.doesNotReject(stat(full), `${slug}/${file} should exist`);
      }
    }
  });

  test('the gallery links every project', async () => {
    const html = await readFile(join(root, 'index.html'), 'utf8');
    for (const slug of slugs) {
      assert.ok(html.includes(`projects/${slug}/`), `gallery should link ${slug}`);
    }
  });

  test('every project html references its own logic and styles', async () => {
    for (const slug of slugs) {
      const html = await readFile(join(root, 'projects', slug, 'index.html'), 'utf8');
      assert.match(html, /logic\.js/, `${slug} should load logic.js`);
      assert.match(html, /style\.css/, `${slug} should link style.css`);
    }
  });
});
