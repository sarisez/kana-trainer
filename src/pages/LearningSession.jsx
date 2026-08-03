import { useState, useMemo } from "react";
import { useLearningSession } from "../hooks/useLearningSession.js";
import { useLanguage } from "../hooks/useLanguage.js";
import { exportBackup, importBackup } from "../utils/backup.js";

import { SymbolProgress } from "../components/SuccessStatistics/SymbolProgress.jsx";
import { KanaLearningHeader } from "../components/KanaLearningHeader/KanaLearningHeader.jsx";

import { transliterations } from "../data/transliteration/index.js";

import styles from "../styles/pages/KanaLearningPage.module.css";

export function LearningSession({ mode, transliteration, textInputSettings }) {

  const {
    userStats,
    currentSymbol,
    availableOptions,
    feedback,
    handleAnswer,
    importUserStats,
    resetProgress,
  } = useLearningSession(mode);

  const { t } = useLanguage();

  const uniqueOptions = useMemo(() => {
    return [
      ...new Map(
        availableOptions.map(option => [option.romaji, option])
      ).values(),
    ];
  }, [availableOptions]);
  
  async function handleImport() {
    const backup = await importBackup();

    console.log(backup);

    if (!backup) return;

    if (backup.mode !== mode) {
      console.log("backup.mode !== mode");
      return;
    }

    importUserStats(backup.data);
  }

  const message = feedback?.isCorrect
    ? t("learning", "correct-answer")
    : feedback
      ? `${t("learning", "wrong-answer")} ${feedback.correctAnswer}`
      : "";

  const translitTable =
    transliteration === "none"
      ? null
      : transliterations[transliteration];

  const [currentInputText, setCurrentInputText] = useState("");

  const suggestions = useMemo(() => {
    const text = currentInputText.trim().toLowerCase();

    if (!text) return [];

    return uniqueOptions.filter(option =>
      option.romaji.includes(text)
    );
  }, [currentInputText, uniqueOptions]);

  return (
    <>
      <div className={styles.container}>
        <div>
          <SymbolProgress userStats={userStats} />
        </div>
        <div className={styles.content}>
          <KanaLearningHeader
            mode={mode}
            level={userStats.level}
            userStats={userStats}
            onExport={() => exportBackup(mode, userStats)}
            onImport={() => handleImport()}
            onReset={() => resetProgress()}
          />
          <div className={styles.symbolContainer}>
            <p className={styles.symbolCurent}>{currentSymbol.symbol}</p>
            {feedback &&
              <div
                className={`${styles.resultMessage} ${feedback.isCorrect
                  ? styles.resultMessageGreen
                  : styles.resultMessageRed
                  }`}
              >
                {message}
              </div>
            }
          </div>

          {textInputSettings.enabled
            ? (
              <div
                className={`
                  ${styles.textInput} 
                  ${textInputSettings.suggestions
                    ? styles.textInputWithSuggestions : ""
                  }`}
              >
                {textInputSettings.suggestions &&
                  <div className={styles.suggestionsWrapper}>
                    <div className={styles.suggestions}>
                      {suggestions?.map((option, index) => (
                        <button
                          key={`${option.romaji}-${index}`}
                          className={styles.suggestion}
                          onClick={() => {
                            handleAnswer(option);
                            setCurrentInputText("");
                          }}
                        >
                          <p className={styles.buttonMainText}>
                            {option.romaji}
                          </p>
                          {translitTable &&
                            <p className={styles.buttonSecondaryText}>
                              {translitTable[option.romaji] ?? option.romaji}
                            </p>
                          }
                        </button>
                      ))}
                    </div>
                  </div>}
                <div className={styles.textInputInput}>
                  <input
                    type="text"
                    value={currentInputText}
                    onChange={(e) => setCurrentInputText(e.target.value)}
                    placeholder={t("learning", "text-input-placeholder")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && currentInputText !== "") {
                        handleAnswer({ romaji: currentInputText.trim().toLowerCase() });
                        setCurrentInputText("");
                      }
                    }}
                  />
                  {!textInputSettings.suggestions &&
                    <button
                      onClick={() => {
                        if (currentInputText !== "") {
                          handleAnswer({ romaji: currentInputText.trim().toLowerCase() });
                          setCurrentInputText("");
                        }
                      }}
                    >
                      {t("learning", "text-input-button")}
                    </button>
                  }
                </div>
              </div>
            )
            : (
              <div className={styles.buttons}>
                {uniqueOptions.map((option, index) => (
                  <button
                    key={`${option.romaji}-${index}`}
                    className={styles.button}
                    onClick={() => handleAnswer(option)}
                  >
                    <p className={styles.buttonMainText}>
                      {option.romaji}
                    </p>
                    {translitTable &&
                      <p className={styles.buttonSecondaryText}>
                        {translitTable[option.romaji] ?? option.romaji}
                      </p>
                    }
                  </button>
                ))}
              </div>
            )
          }

        </div>

      </div>
    </>
  );

};