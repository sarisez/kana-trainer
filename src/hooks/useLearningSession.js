import { useState, useMemo, useRef } from "react";

import { getRandomSymbol, checkAnswer, getNewSymbol, levelUp } from "../utils/kanaUtils";
import { hiragana } from "../data/hiragana.js";
import { katakana } from "../data/katakana.js";
import { getStats, recordAnswer, saveStats, resetStats } from "../utils/storage.js";

export function useLearningSession(mode) {
  const requiredCorrectAnswers = 10;

  const [userStats, setUserStats] = useState(() => getStats(mode));

  const options = useMemo(() => {
    if (mode === "katakana") {
      return katakana;
    }
    if (mode === "both") {
      return [...hiragana, ...katakana];
    }
    return hiragana;
  }, [mode]);

  const availableOptions = useMemo(() => {
    return options.filter(
      o => o.level <= userStats.level
    );
  }, [options, userStats.level]);

  const [currentSymbol, setCurrentSymbol] = useState(() =>
    getRandomSymbol(availableOptions)
  );

  const [message, setMessage] = useState("");

  const timeoutRef = useRef(null);

  const [canAnswer, setCanAnswer] = useState(true);

  function handleAnswer(option) {
    if (canAnswer === false)
      return;

    const isCorrect = checkAnswer(option, currentSymbol);

    setCanAnswer(false);

    setUserStats((prevStats) => {
      const updated = recordAnswer(prevStats, currentSymbol.symbol, isCorrect);
      saveStats(mode, updated);

      return updated;
    });

    const msg = isCorrect
      ? "Правильно!"
      : `Неправильно. Правильна відповідь: ${currentSymbol.ukrainian} / ${currentSymbol.romaji}`;

    setMessage(msg);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setUserStats((prevStats) => {
        const newLevel = levelUp(prevStats, requiredCorrectAnswers);

        const updated = {
          ...prevStats,
          level: newLevel,
        };

        saveStats(mode, updated);
        setCanAnswer(true);
          
        return updated;
      });

      setCurrentSymbol((prev) => getNewSymbol(prev, availableOptions));
      setMessage("");
    }, 1000);
  }

  function importUserStats(userStats) {
    setUserStats(userStats);
    saveStats(mode, userStats);
  }

  function resetProgress() {
    const initial = resetStats(mode);
    setUserStats(initial);
  }

  return {
    userStats,
    currentSymbol,
    availableOptions,
    message,
    handleAnswer,
    importUserStats,
    resetProgress,
  };
}