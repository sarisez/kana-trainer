import styles from "./SymbolProgress.module.css";

export function SymbolProgress({ userStats }) {
 
  if (!userStats?.symbols) return null;

  return (
    <div className={styles.container}>
      {Object.entries(userStats.symbols)
        .filter(([, stat]) => stat.level <= userStats.level)
        .map(([symbol, stat]) => {
          const total = stat.correct + stat.mistakes;
          const progress = total === 0 ? 0 : stat.correct / total;
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
              <div>{(progress * 100).toFixed(0)}%</div>
            </div>
            <progress value={progress} max={1} className={styles.symbol__progress} />
          </div>
        ))}
    </div>
  );
  
}