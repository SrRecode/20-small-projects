/** Rock, paper, scissors round resolution. */
export const CHOICES = ['rock', 'paper', 'scissors'];

const BEATS = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

export function playRound(player, computer) {
  if (!CHOICES.includes(player) || !CHOICES.includes(computer)) {
    throw new Error('Invalid choice');
  }
  if (player === computer) return 'draw';
  return BEATS[player] === computer ? 'win' : 'lose';
}

export function randomChoice(rng = Math.random) {
  return CHOICES[Math.floor(rng() * CHOICES.length) % CHOICES.length];
}
