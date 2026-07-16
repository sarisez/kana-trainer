import { useLanguage } from "../hooks/useLanguage";

import { Select } from "../components/Select/Select";

import styles from "../styles/pages/SettingsPage.module.css"

export function SettingsPage({ isLight, setIsLight }) {
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

    </div>
  );
}