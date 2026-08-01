import { useLanguage } from "../hooks/useLanguage";

import { Select } from "../components/Select/Select";
import { ToggleSwitch } from "../components/ToggleSwitch/ToggleSwitch";

import styles from "../styles/pages/SettingsPage.module.css"

export function SettingsPage({
  isLight, setIsLight,
  transliteration, setTransliteration,
  textInputSettings, updateTextInputSettings
}) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={styles.container}>

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
  );
}