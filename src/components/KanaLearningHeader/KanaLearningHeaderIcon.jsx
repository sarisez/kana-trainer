import styles from "./KanaLearningHeader.module.css";

export function HeaderIcon({ icon, text, active }) {
  return (
    <div className={styles.icon}>
      <div className={`${styles.iconImg} ${active ? styles.iconActive : ""}`}>
        {icon}
      </div>
      <p className={`${styles.text} ${active ? styles.textActive : ""}`}>
        {text}
      </p>
    </div>
  );
}