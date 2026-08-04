import { useState } from "react";
import { LEARNING_CONFIG } from "../../config/learning.js";
import { ProgressBar } from "../ProgressBar/ProgressBar.jsx";

import ArrowRight from "../../assets/icons/ArrowRight.jsx"
import ArrowLeft from "../../assets/icons/ArrowLeft.jsx"
import styles from "./SymbolProgress.module.css";

export function SymbolProgress({ userStats }) {

  const [isOpen, setIsOpen] = useState(false);

  if (!userStats?.symbols) return null;

  function calcGoal(stat) {
    const { correct, mistakes } = stat;
    const total = correct + mistakes;

    const answersRemaining = Math.max(0, 
      LEARNING_CONFIG.requiredCorrectAnswers - total);

    const correctAnswersRequired =
      (LEARNING_CONFIG.requiredAccuracy * total - correct) /
      (1 - LEARNING_CONFIG.requiredAccuracy);

    const correctAnswersRemaining = Math.max(0, Math.ceil(
      correctAnswersRequired - 1e-10));

    return Math.max(answersRemaining, correctAnswersRemaining);
  }

  return (
    <>
      {!isOpen && (<button
        onClick={() => setIsOpen(true)}
        className={styles.openButton}
      >
        <ArrowRight
          title="Open Stats"
          titleId="open-stat-icon"
          width={24}
          height={24}
        />
      </button>)}
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.scrollBox}>
            {Object.entries(userStats.symbols)
              .filter(([, stat]) => stat.level <= userStats.level)
              .map(([symbol, stat]) => {
                const total = stat.correct + stat.mistakes;
                const progress = (total === 0 ? 0 : stat.correct / total) * 100;
                return {
                  symbol,
                  progress,
                  stat,
                };
              })
              .sort((a, b) => b.progress - a.progress)
              .map(({ symbol, progress, stat }) => {
                const goal = calcGoal(stat);

                return (
                  <div key={symbol}>
                    <div className={styles.symbolInfo}>
                      <div>{symbol}</div>
                      <div className={styles.stats}>
                        <span className={styles.goal}>
                          {goal > 0 && `${goal} →`}
                        </span>
                        {stat.correct} / {stat.mistakes}
                      </div>
                      <div>{progress.toFixed(0)}%</div>
                    </div>
                    <ProgressBar
                      progress={progress}
                      className={styles.symbolProgressBody}
                      lineClassName={styles.symbolProgressLine}
                    />
                  </div>
                )
              })}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className={styles.closeButton}
          >
            <ArrowLeft
              title="Open Stats"
              titleId="open-stat-icon"
              width={24}
              height={24}
            />
          </button>
        </div>
      )}
    </>
  );

}