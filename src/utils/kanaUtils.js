import { LEARNING_CONFIG } from "../config/learning";

const getRandomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

export function getRandomSymbol(options, worstWinRateSymbol, leastCorrectSymbol) {
  const randomValue = Math.floor(Math.random() * 100);
  
  if (randomValue < 20) {
    const maxLevel = Math.max(...options.map(option => option.level));

    return getRandomItem(
      options.filter(option => option.level === maxLevel)
    );
  }

  if (randomValue < 35) {
    return options.find(option => option.symbol === worstWinRateSymbol);
  }

  if (randomValue < 50) {
    return options.find(option => option.symbol === leastCorrectSymbol);
  }

  return getRandomItem(options);
}

export function checkAnswer(option, currentSymbol) {
  return option.romaji === currentSymbol.romaji;
}

export function getNewSymbol(prev, availableOptions, worstWinRateSymbol, leastCorrectSymbol) {
  let newSymbol;

  do {
    newSymbol = getRandomSymbol(availableOptions, worstWinRateSymbol, leastCorrectSymbol);
  } while (newSymbol === prev);

  return newSymbol;
}

export function levelUp(stats, requiredCorrectAnswers) {
  const canLevelUp = stats.level < LEARNING_CONFIG.maxLevel && Object.values(stats.symbols)
    .filter((s) => s.level <= stats.level)
    .every((stat) => {
      const total = stat.correct + stat.mistakes;
      return total >= requiredCorrectAnswers && stat.correct / total >= LEARNING_CONFIG.requiredAccuracy;
    });

  return canLevelUp ? stats.level + 1 : stats.level;
}

function getSymbol(stats, compare) {
  return Object.entries(stats.symbols)
    .map(([symbol, stat]) => ({ symbol, ...stat }))
    .filter((s) => s.level <= stats.level)
    .reduce(compare)
    .symbol;
}
export const getLeastCorrectSymbol = (stats) =>
  getSymbol(stats, (worst, current) =>
    current.correct < worst.correct ? current : worst
  );

export const getWorstWinRateSymbol = (stats) =>
  getSymbol(stats, (worst, current) => {
    const rate = (s) =>
      s.correct + s.mistakes === 0
        ? 1
        : s.correct / (s.correct + s.mistakes);

    return rate(current) < rate(worst) ? current : worst;
  });