import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

import { resetStats, saveStats, getStats } from "../utils/storage";
import { exportBackup, importBackup } from "../utils/backup";

import { Select } from "../components/Select/Select";
import { ToggleSwitch } from "../components/ToggleSwitch/ToggleSwitch";
import { ConfirmationDialog } from "../components/ConfirmationDialog/ConfirmationDialog";

import styles from "../styles/pages/SettingsPage.module.css"

export function SettingsPage({
  isLight, setIsLight,
  transliteration, setTransliteration,
  textInputSettings, updateTextInputSettings,
  mode, setMode
}) {
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("general");

  function handleExport() {
    const stats = getStats(mode);
    exportBackup(mode, stats);
  }

  async function handleImport() {
    const backup = await importBackup();

    if (!backup) return;

    if (backup.mode !== mode) {
      console.log("backup.mode !== mode");
      return;
    }

    saveStats(mode, backup.data);
  }

  function handleReset() {
    resetStats(mode);
  }

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
          handleReset();
          setIsResetConfirmationOpen(false)
        }}
        onCancel={() => setIsResetConfirmationOpen(false)}
      />

      <div className={styles.container}>
        <div className={styles.tabs}>
          <button
            className={activeTab === "general" ? styles.active : ""}
            onClick={() => setActiveTab("general")}
          >
            {t("settings", "general")}
          </button>

          <button
            className={activeTab === "progress" ? styles.active : ""}
            onClick={() => setActiveTab("progress")}
          >
            {t("settings", "progress")}
          </button>
        </div>

        {activeTab === "general" && (
          <div className={styles.page}>
            <section>
              <h2>{t("settings", "language")}</h2>
              <Select
                value={language}
                options={[
                  { value: "ua", label: "Українська" },
                  { value: "en", label: "English" },
                ]}
                onChange={setLanguage}
              />
            </section>

            <section>
              <h2>{t("settings", "theme")}</h2>
              <Select
                value={isLight ? "light" : "dark"}
                options={[
                  { value: "light", label: `${t("settings", "light")}` },
                  { value: "dark", label: `${t("settings", "dark")}` },
                ]}
                onChange={(value) => setIsLight(value === "light")}
              />
            </section>

            <section>
              <h2>{t("settings", "transliteration")}</h2>
              <Select
                value={transliteration}
                options={[
                  { value: "none", label: `${t("settings", "none")}` },
                  { value: "kovalenko", label: "Українська — Коваленко" },
                ]}
                onChange={setTransliteration}
              />
            </section>

            <section>
              <h2>{t("settings", "text-input")}</h2>
              <div className={styles.toggle}>
                <label htmlFor="text-input-toggle">
                  {t("settings", "enable-text-input")}
                </label>
                <ToggleSwitch
                  checked={textInputSettings.enabled}
                  onChange={(enabled) => updateTextInputSettings({ enabled })}
                  id="text-input-toggle"
                />
              </div>
              <div className={styles.toggle}>
                <label htmlFor="text-suggestions-toggle">
                  {t("settings", "input-suggestions")}
                </label>
                <ToggleSwitch
                  checked={textInputSettings.suggestions}
                  onChange={(suggestions) => updateTextInputSettings({ suggestions })}
                  disabled={!textInputSettings.enabled}
                  id="text-suggestions-toggle"
                />
              </div>
            </section>
          </div>
        )}

        {activeTab === "progress" && (
          <div className={styles.page}>
            <section>
              <h2>{t("settings", "mode")}</h2>
              <Select
                value={mode}
                options={[
                  { value: "hiragana", label: `${t("common", "hiragana-mode")}` },
                  { value: "katakana", label: `${t("common", "katakana-mode")}` },
                  { value: "both", label: `${t("common", "both-mode")}` },
                ]}
                onChange={setMode}
              />
            </section>
            <section className={styles.actions}>
              <h2>{t("settings", "progress-management")}</h2>
              <button onClick={handleExport}>
                {t("common", "export")}
              </button>
              <button onClick={handleImport}>
                {t("common", "import")}
              </button>
              <button onClick={() => {setIsResetConfirmationOpen(true)}} className={styles.reset}>
                {t("common", "reset")}
              </button>
            </section>
          </div>
        )}
      </div>
    </>
  );
}