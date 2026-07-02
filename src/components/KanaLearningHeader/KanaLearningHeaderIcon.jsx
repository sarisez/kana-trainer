import styles from "./KanaLearningHeader.module.css";

export function HeaderIcon({ icon, text, active }) {
  return (
    <div className={styles.icon}>
      <div className={`${styles.icon__img} ${active ? styles.active : ""}`}>
        {icon}
      </div>
      <p className={`${styles.text} ${active ? styles.text__active : ""}`}>
        {text}
      </p>
    </div>
  );
}