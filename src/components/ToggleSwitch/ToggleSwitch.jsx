import styles from "./ToggleSwitch.module.css";

export function ToggleSwitch({
  checked = false,
  onChange,
  disabled = false,
  ...props
}) {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        {...props}
      />
      <span className={styles.slider} />
    </label>
  );
}