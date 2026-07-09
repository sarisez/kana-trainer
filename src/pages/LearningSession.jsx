import { useLearningSession } from "../hooks/useLearningSession.js";
import { exportBackup, importBackup } from "../utils/backup.js";

import { SymbolProgress } from "../components/SuccessStatistics/SymbolProgress.jsx";
import { KanaLearningHeader } from "../components/KanaLearningHeader/KanaLearningHeader.jsx";

import '../styles/pages/kana-learning-page.css';

export function LearningSession({ mode }) {

  const {
    userStats,
    currentSymbol,
    availableOptions,
    message,
    handleAnswer,
    importUserStats,
    resetProgress,
  } = useLearningSession(mode);

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

  //Інтерфейс
  return (
    <>
      <div className="kana-learning-container">
        <div className="kana-learning-left-block">
          <SymbolProgress userStats={userStats} />
        </div>
        <div className="kana-learning-right-block">
          <KanaLearningHeader
            mode={mode}
            level={userStats.level}
            userStats={userStats}
            onExport={() => exportBackup(mode, userStats)}
            onImport={() => handleImport()}
            onReset={() => resetProgress()}
          />
          <div className="symbol-container">
            <p className="curent-symbol">{currentSymbol.symbol}</p>
          </div>
          {message &&
            <div
              className={`result-message ${message === "Правильно!"
                ? "result-message-green"
                : "result-message-red"
                }`}>
              {message}
            </div>
          }
          <div className="buttons-container">
            {uniqueOptions.map((option, index) => (
              <button
                key={`${option.romaji}-${index}`}
                className="choose-button"
                onClick={() => handleAnswer(option)}
              >
                <p className="cb-main-text">{option.ukrainian}</p>
                <p className="cb-secondary-text">{option.romaji}</p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </>
  );

};