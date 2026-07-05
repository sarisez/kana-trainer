import Sun from "../../assets/icons/Sun.jsx";
import Moon from "../../assets/icons/Moon.jsx";

import styles from "./ThemeToggle.module.css";

export function ThemeToggle({ handleChange, isChecked }) {
  return (
    <button
      type="button"
      onClick={handleChange}
      aria-pressed={isChecked}
      className={styles.container}
    >
      {isChecked 
        ? <Moon 
          title="Moon"
          titleId="moon-icon"
          width={24}
          height={24}
          className={styles.icon}
        /> 
        : <Sun 
          title="Sun"
          titleId="sun-icon"
          width={24}
          height={24}
          className={styles.icon}
        />}
    </button>
  );
}