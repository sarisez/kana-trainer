import { useLearningSession } from "../hooks/useLearningSession.js";
import { useLanguage } from "../hooks/useLanguage.js";
import { exportBackup, importBackup } from "../utils/backup.js";

import { SymbolProgress } from "../components/SuccessStatistics/SymbolProgress.jsx";
import { KanaLearningHeader } from "../components/KanaLearningHeader/KanaLearningHeader.jsx";

import styles from "../styles/pages/KanaLearningPage.module.css";

export function LearningSession({ mode }) {

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

  const uniqueOptions = [
    ...new Map(
      [...availableOptions].reverse().map(option => [option.romaji, option])
    )
      .values(),
  ].reverse();

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

  //Інтерфейс
  return (
    <>
      <div className={styles.container}>
        <div className="kana-learning-left-block">
          <SymbolProgress userStats={userStats} />
        </div>
        <div className={styles.rightBlock}>
          <KanaLearningHeader
            mode={mode}
            level={userStats.level}
            userStats={userStats}
            onExport={() => exportBackup(mode, userStats)}
            onImport={() => handleImport()}
            onReset={() => resetProgress()}
          />
          <div className={styles.symbol__container}>
            <p className={styles.symbol__curent}>{currentSymbol.symbol}</p>
            {feedback &&
              <div
                className={`${styles.resultMessage} ${feedback.isCorrect
                  ? styles.resultMessage__green
                  : styles.resultMessage__red
                  }`}
              >
                {message}
              </div>
            }
          </div>
          <div className={styles.buttons}>
            {uniqueOptions.map((option, index) => (
              <button
                key={`${option.romaji}-${index}`}
                className={styles.button}
                onClick={() => handleAnswer(option)}
              >
                {/* <p className="cb-main-text">{option.translation}</p>
                <p className="cb-secondary-text">{option.romaji}</p> */}
                <p className={styles.button__text__main}>{option.romaji}</p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </>
  );

};