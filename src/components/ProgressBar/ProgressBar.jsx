import clsx from "clsx";
import styles from "./ProgressBar.module.css";

export function ProgressBar({
  progress,
  className,
  lineClassName,
}) {
  return (
    <div className={clsx(styles.body, className)}>
      <div
        className={clsx(styles.line, lineClassName)}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}