export function getRandomSymbol(options) {
  return options[Math.floor(Math.random() * options.length)];
}

export function checkAnswer(option, currentSymbol) {
  return option.romaji === currentSymbol.romaji;
}

export function getNewSymbol(prev, availableOptions) {
  let newSymbol;

  do {
    newSymbol = getRandomSymbol(availableOptions);
  } while (newSymbol === prev);

  return newSymbol;
}

export function levelUp(stats, requiredCorrectAnswers) {
  const canLevelUp = Object.values(stats.symbols)
    .filter((s) => s.level <= stats.level)
    .every((stat) => {
      const total = stat.correct + stat.mistakes;
      return total >= requiredCorrectAnswers && stat.correct / total >= 0.9;
    });

  return canLevelUp ? stats.level + 1 : stats.level;
}