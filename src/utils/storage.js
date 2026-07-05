import { hiragana } from "../data/hiragana.js";
import { katakana } from "../data/katakana.js";

const STORAGE_KEYS = {
  hiragana: "hiragana_learning_stats",
  katakana: "katakana_learning_stats",
  both: "both_learning_stats",
  theme: "theme",
};

const getStorageKey = (mode) => STORAGE_KEYS[mode] ?? STORAGE_KEYS.both;

export const createInitialStats = (mode = "hiragana") => {
  const source =
    mode === "katakana"
      ? katakana
      : mode === "both"
      ? [...hiragana, ...katakana]
      : hiragana;

  return {
    level: 1,
    symbols: Object.fromEntries(
      source.map((item) => [
        item.symbol,
        {
          correct: 0,
          mistakes: 0,
          level: item.level,
          category: item.category,
        },
      ])
    ),
  };
};

export const getStats = (mode = "hiragana") => {
  const key = getStorageKey(mode);
  const saved = localStorage.getItem(key);

  if (!saved) {
    const initial = createInitialStats(mode);
    saveStats(mode, initial);
    return initial;
  }

  try {
    return JSON.parse(saved);
  } catch {
    const initial = createInitialStats(mode);
    saveStats(mode, initial);
    return initial;
  }
};

export const saveStats = (mode, stats) => {
  const key = getStorageKey(mode);
  localStorage.setItem(key, JSON.stringify(stats));
};

export const updateStats = (mode, symbol, type) => {
  const stats = getStats(mode);

  if (!stats.symbols[symbol]) {
    stats.symbols[symbol] = {
      correct: 0,
      mistakes: 0,
      level: 1,
      category: "unknown",
    };
  }

  stats.symbols[symbol][type] += 1;

  saveStats(mode, stats);
  
  return stats;
};

export const setUserLevel = (mode, level) => {
  const stats = getStats(mode);
  stats.level = level;
  saveStats(mode, stats);
  return stats;
};

export const resetStats = (mode = "hiragana") => {
  const initial = createInitialStats(mode);
  saveStats(mode, initial);
  return initial;
};

export const recordAnswer = (stats, symbol, isCorrect) => {
  const entry = stats.symbols[symbol];
  if (!entry) return stats;

  return {
    ...stats,
    symbols: {
      ...stats.symbols,
      [symbol]: {
        ...entry,
        correct: isCorrect ? entry.correct + 1 : entry.correct,
        mistakes: isCorrect ? entry.mistakes : entry.mistakes + 1,
      },
    },
  };
};

export function getTheme() {
  const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);

  if (storedTheme !== null)
    return storedTheme === "light";
  
  return window.matchMedia("(prefers-color-scheme: light)").matches;
}

export function saveTheme(isLight) {
  localStorage.setItem(STORAGE_KEYS.theme, isLight ? "light" : "dark");
}