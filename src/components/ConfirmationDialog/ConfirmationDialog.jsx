import { useEffect } from "react";
import Close from "../../assets/icons/Close";
import styles from "./ConfirmationDialog.module.css";

export function ConfirmationDialog({
  open,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel
}) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.titleWrapper}>
          <h3>{title}</h3>
          <button onClick={onCancel} aria-label="Close dialog">
            <Close
              title="Close"
              titleId="close-icon"
              width={24}
              height={24}
            />
          </button>
        </div>

        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <button onClick={onCancel}>{cancelText}</button>
          <button className={styles.accent}
            onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );

}