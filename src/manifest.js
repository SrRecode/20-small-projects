/** The catalog of small projects shown in the gallery. */
export const projects = [
  { slug: 'counter', title: 'Counter', description: 'Increment and decrement with clamp bounds.' },
  { slug: 'stopwatch', title: 'Stopwatch', description: 'Start, stop and reset with centisecond precision.' },
  { slug: 'tip-calculator', title: 'Tip Calculator', description: 'Work out the tip and split it per person.' },
  { slug: 'bmi-calculator', title: 'BMI Calculator', description: 'Body-mass index and its WHO category.' },
  { slug: 'temperature-converter', title: 'Temperature Converter', description: 'Convert between Celsius, Fahrenheit and Kelvin.' },
  { slug: 'color-flipper', title: 'Color Flipper', description: 'Random background colours with readable text.' },
  { slug: 'random-quote', title: 'Random Quote', description: 'Show a random quote from a set.' },
  { slug: 'dice-roller', title: 'Dice Roller', description: 'Roll several dice and total them.' },
  { slug: 'password-strength', title: 'Password Strength', description: 'Score a password with actionable feedback.' },
  { slug: 'palindrome-checker', title: 'Palindrome Checker', description: 'Ignore case, spaces and punctuation.' },
  { slug: 'word-counter', title: 'Word Counter', description: 'Words, characters, sentences and reading time.' },
  { slug: 'fizzbuzz', title: 'FizzBuzz', description: 'The classic, returned as data.' },
  { slug: 'rock-paper-scissors', title: 'Rock Paper Scissors', description: 'Play a round against the computer.' },
  { slug: 'number-guessing', title: 'Number Guessing', description: 'Higher/lower hints until you guess right.' },
  { slug: 'digital-clock', title: 'Digital Clock', description: 'Live clock in 12- or 24-hour format.' },
  { slug: 'todo-list', title: 'Todo List', description: 'Add, toggle, filter and clear todos.' },
  { slug: 'shopping-cart', title: 'Shopping Cart', description: 'Line items, quantities and a running total.' },
  { slug: 'grade-calculator', title: 'Grade Calculator', description: 'Average scores and map to a letter grade.' },
  { slug: 'leap-year', title: 'Leap Year', description: 'Check the Gregorian leap-year rule.' },
  { slug: 'caesar-cipher', title: 'Caesar Cipher', description: 'Encrypt and decrypt by shifting letters.' },
];

export const slugs = projects.map((p) => p.slug);
