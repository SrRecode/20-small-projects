# 20 Small Projects

A gallery of 20 small, self-contained vanilla JavaScript projects. Each project has:

- `logic.js` — a pure ESM module with unit tests in `test/projects.test.js`
- `index.html` — a tiny page that imports the logic and wires it to the DOM
- `style.css` — minimal, shared styling

## Get started

```bash
npm test  # run all logic tests
npm start # serve the gallery at http://localhost:4180
```

## Projects

1. Counter — clamp -10..10
2. Stopwatch — start/stop/reset
3. Tip Calculator — split bill and tip
4. BMI Calculator — WHO categories
5. Temperature Converter — C, F, K
6. Color Flipper — readable random colours
7. Random Quote — pick from a small set
8. Dice Roller — roll N dice
9. Password Strength — score and tips
10. Palindrome Checker — ignore case/punct/space
11. Word Counter — words/chars/sentences/reading time
12. FizzBuzz — data-only
13. Rock Paper Scissors — play against computer
14. Number Guessing — higher/lower
15. Digital Clock — 12/24-hour
16. Todo List — add, toggle, filter, clear
17. Shopping Cart — quantities and totals
18. Grade Calculator — average and letter grade
19. Leap Year — Gregorian rule
20. Caesar Cipher — encrypt/decrypt

All tests are run with Node's built-in test runner (`node --test`) — no dependencies.
