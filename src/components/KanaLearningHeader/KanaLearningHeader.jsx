import { Link } from "react-router-dom";
import { useState } from "react";

import { HeaderIcon } from "./KanaLearningHeaderIcon.jsx";
import { useLanguage } from "../../hooks/useLanguage.js";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog.jsx";

import KatakanaIcon from "../../assets/icons/KatakanaIcon.jsx";
import HiraganaIcon from "../../assets/icons/HiraganaIcon.jsx";
import BothIcon from "../../assets/icons/BothIcon.jsx";
import ImportIcon from "../../assets/icons/ImportIcon.jsx";
import ExportIcon from "../../assets/icons/ExportIcon.jsx";
import Reset from "../../assets/icons/Reset.jsx";

import styles from "./KanaLearningHeader.module.css";

export function KanaLearningHeader({ mode, level, onExport, onImport, onReset }) {
  const { t } = useLanguage();

  const [isResetConfirmationOpen, setIsResetConfirmationOpen] = useState(false);

  return (
    <>
      <ConfirmationDialog
        open={isResetConfirmationOpen}
        title={t("dialogs", "resetConfirmationTitle")}
        message={t("dialogs", "resetConfirmationMessage")}
        confirmText={t("common", "reset")}
        cancelText={t("common", "cancel")}
        onConfirm={() => {
          onReset();
          setIsResetConfirmationOpen(false)
        }}
        onCancel={() => setIsResetConfirmationOpen(false)}
      />

      <div className={styles.container}>
        <div className={styles.modeSwitching}>
          <Link to='/kana-learning?mode=hiragana'>
            <HeaderIcon
              icon={<HiraganaIcon
                title="Hiragana"
                titleId="hiragana-icon"
                width={24}
                height={24}
              />}
              text={t("common", "hiragana-mode")}
              active={mode === "hiragana"}
            />
          </Link>
          <Link to='/kana-learning?mode=both'>
            <HeaderIcon
              icon={<BothIcon
                title="Both"
                titleId="both-icon"
                width={24}
                height={24}
              />}
              text={t("common", "both-mode")}
              active={mode === "both"}
            />
          </Link>
          <Link to='/kana-learning?mode=katakana'>
            <HeaderIcon
              icon={<KatakanaIcon
                title="Katakana"
                titleId="katakana-icon"
                width={24}
                height={24}
              />}
              text={t("common", "katakana-mode")}
              active={mode === "katakana"}
            />
          </Link>
        </div>
        <div className={styles.level}>
          <p>{t("learning", "level")} {level}</p>
        </div>
        <div className={styles.actions}>
          <button onClick={() => setIsResetConfirmationOpen(true)}>
            <HeaderIcon
              icon={<Reset
                title="Reset"
                titleId="reset-icon"
                width={24}
                height={24}
              />}
              text={t("common", "reset")}
            />
          </button>
          <button onClick={() => onImport()}>
            <HeaderIcon
              icon={<ImportIcon
                title="Import"
                titleId="import-icon"
                width={24}
                height={24}
              />}
              text={t("common", "import")}
            />
          </button>
          <button onClick={() => onExport()}>
            <HeaderIcon
              icon={<ExportIcon
                title="Export"
                titleId="expor-icon"
                width={24}
                height={24}
              />}
              text={t("common", "export")}
            />
          </button>
        </div>
      </div>
    </>
  );
}