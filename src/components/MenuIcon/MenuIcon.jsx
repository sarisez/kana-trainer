import { cloneElement } from "react";

import styles from "./MenuIcon.module.css";

export function MenuIcon({ icon }) {
  return (
    <div className={styles.container}>
      {cloneElement(icon, {
        className: styles.icon,
      })}
    </div>
  );
}