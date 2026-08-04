import { useState, useMemo, useRef } from "react";

import { LEARNING_CONFIG } from "../config/learning.js";
import { getRandomSymbol, checkAnswer, getNewSymbol, levelUp, getLeastCorrectSymbol, getWorstWinRateSymbol } from "../utils/kanaUtils";
import { hiragana } from "../data/hiragana.js";
import { katakana } from "../data/katakana.js";
import { getStats, recordAnswer, saveStats, resetStats } from "../utils/storage.js";

export function useLearningSession(mode) {
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
    getRandomSymbol(
      availableOptions, 
      getWorstWinRateSymbol(userStats), 
      getLeastCorrectSymbol(userStats)
    )
  );

  const timeoutRef = useRef(null);

  const [canAnswer, setCanAnswer] = useState(true);

  const [feedback, setFeedback] = useState(null);

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

    isCorrect
      ? setFeedback({
        isCorrect: true,
      })
      : setFeedback({
        isCorrect: false,
        correctAnswer: currentSymbol.romaji,
      });;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setUserStats((prevStats) => {
        const newLevel = levelUp(prevStats, LEARNING_CONFIG.requiredCorrectAnswers);

        const updated = {
          ...prevStats,
          level: newLevel,
        };

        saveStats(mode, updated);
        setCanAnswer(true);

        return updated;
      });

      setCurrentSymbol((prev) => getNewSymbol(
        prev, 
        availableOptions, 
        getWorstWinRateSymbol(userStats), 
        getLeastCorrectSymbol(userStats)
      ));
      setFeedback(null);
    }, 1000);
  }

  function importUserStats(userStats) {
    setUserStats(userStats);
    saveStats(mode, userStats);
  }

  function resetProgress() {
    const initial = resetStats(mode);

    const newAvailableOptions = options.filter(
      o => o.level <= initial.level
    );

    setUserStats(initial);

    setCurrentSymbol(
      getRandomSymbol(
        newAvailableOptions,
        getWorstWinRateSymbol(initial),
        getLeastCorrectSymbol(initial)
      )
    );
  }

  return {
    userStats,
    currentSymbol,
    availableOptions,
    feedback,
    handleAnswer,
    importUserStats,
    resetProgress,
  };
}