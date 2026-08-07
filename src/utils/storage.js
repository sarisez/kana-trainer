import { hiragana } from "../data/hiragana.js";
import { katakana } from "../data/katakana.js";

const STORAGE_KEYS = {
  hiragana: "hiragana_learning_stats",
  katakana: "katakana_learning_stats",
  both: "both_learning_stats",
  theme: "theme",
  language: "language",
  transliteration: "transliteration",
  textInput: "text-input",
  modeKey: "mode",
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

export function getLanguage() {
  const storedLanguage = localStorage.getItem(STORAGE_KEYS.language);
 
  if (storedLanguage === null)
    return "en";
  else
    return storedLanguage;
}

export function saveLanguage(language) {
  localStorage.setItem(STORAGE_KEYS.language, language);
}

export function getTransliteration() {
  const storedTranslit = localStorage.getItem(STORAGE_KEYS.transliteration);

  if (storedTranslit === null)
    return "none";
  
  return storedTranslit
}

export function saveTransliteration(transliteration) {
  localStorage.setItem(STORAGE_KEYS.transliteration, transliteration);
}

const DEFAULT_TEXT_INPUT_SETTINGS = {
  enabled: false,
  suggestions: true,
};

export function getTextInputSettings() {
  const stored = localStorage.getItem(STORAGE_KEYS.textInput);

  if (stored === null) {
    return DEFAULT_TEXT_INPUT_SETTINGS;
  }

  try {
    return {
      ...DEFAULT_TEXT_INPUT_SETTINGS,
      ...JSON.parse(stored),
    };
  } catch {
    return DEFAULT_TEXT_INPUT_SETTINGS;
  }
}

export function saveTextInputSettings(settings) {
  localStorage.setItem(
    STORAGE_KEYS.textInput,
    JSON.stringify(settings),
  );
}

export function updateTextInputSettings(partial) {
  saveTextInputSettings({
    ...getTextInputSettings(),
    ...partial,
  });
}

export function getMode() {
  const storedMode = localStorage.getItem(STORAGE_KEYS.modeKey);
 
  if (storedMode === null)
    return "hiragana";
  else
    return storedMode;
}

export function saveMode(mode) {
  localStorage.setItem(STORAGE_KEYS.modeKey, mode);
}