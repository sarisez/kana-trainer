import { ProgressBar } from "../ProgressBar/ProgressBar.jsx";

import styles from "./SymbolProgress.module.css";

export function SymbolProgress({ userStats }) {
 
  if (!userStats?.symbols) return null;

  return (
    <div className={styles.container}>
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
              progress = {progress}
              className={styles.symbol__progress__body}
              lineClassName={styles.symbol__progress__line}
            />
          </div>
        ))}
    </div>
  );
  
}