import { atom, computed, map } from "nanostores";

// --- BASIC STATES (atoms) ---
export const difficultyLevel = atom("medium"); // "easy", "medium", "hard"
export const numPlayers = atom(1);
export const currentPlayer = atom(1); // Tracks whose turn it is
export const secretNumber = atom(0); // Generated when the game starts
export const winner = atom(0); // 0 = nobody, 1 = player 1, etc.
export const message = atom(""); // Feedback message
export const guessedNumbers = atom([]); // Track all guesses in the current round

// Tries tracking per player (e.g., { 1: 2, 2: 1 } -> player 1 tried 2 times)
export const triesHistory = map({}); 

// --- COMPUTED STATES ---

// Listens to 'difficultyLevel' and returns max tries allowed
export const maxTries = computed(difficultyLevel, (level) => {
  const rules = {
    easy: 15,
    medium: 10,
    hard: 5,
  };
  return rules[level] || 10;
});

// Listens to 'difficultyLevel' and returns the max number for the guess limit
export const numberLimit = computed(difficultyLevel, (level) => {
  if (level === "easy") return 50;
  if (level === "medium") return 100;
  return 200; // hard
});

// --- ACTIONS ---

export function startGame() {
  const limit = numberLimit.get();
  
  // Pick a random number between 1 and limit
  secretNumber.set(Math.floor(Math.random() * limit) + 1);
  
  currentPlayer.set(1);
  winner.set(0);
  message.set("Game started! Good luck.");
  guessedNumbers.set([]);

  // Reset tries history for all players
  const initialTries = {};
  for (let i = 1; i <= numPlayers.get(); i++) {
    initialTries[i] = 0;
  }
  triesHistory.set(initialTries);
}