import { useState } from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar.jsx";

import ArrowRight from "../../assets/icons/ArrowRight.jsx"
import ArrowLeft from "../../assets/icons/ArrowLeft.jsx"
import styles from "./SymbolProgress.module.css";

export function SymbolProgress({ userStats }) {

  const [isOpen, setIsOpen] = useState(false);

  if (!userStats?.symbols) return null;

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
              .map(({ symbol, progress, stat }) => (
                <div key={symbol}>
                  <div className={styles.symbol__info}>
                    <div>{symbol}</div>
                    <div>{stat.correct} / {stat.mistakes}</div>
                    <div>{progress.toFixed(0)}%</div>
                  </div>
                  <ProgressBar
                    progress={progress}
                    className={styles.symbol__progress__body}
                    lineClassName={styles.symbol__progress__line}
                  />
                </div>
              ))}
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