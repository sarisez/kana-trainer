import { transliterations } from "../data/transliteration/index.js";

import { hiragana } from "../data/hiragana.js";
import { katakana } from "../data/katakana.js";

import styles from '../styles/pages/AlphabetPage.module.css';

function renderAlphabet(filterFn, translitTable) {
  return hiragana
    .filter(filterFn)
    .map((hiraganaItem) => {
      const katakanaItem = katakana.find(
        item => item.romaji === hiraganaItem.romaji
      );

      return (
        <div className={styles.item} key={hiraganaItem.symbol}>
          <p>{hiraganaItem.symbol} / {katakanaItem?.symbol}</p>
          <p>
            {hiraganaItem.romaji}
            {translitTable?.[hiraganaItem.romaji] && (
              <> / {translitTable[hiraganaItem.romaji]}</>
            )}
          </p>
        </div>
      );
    });
}

export function AlphabetPage({ transliteration }) {

  const translitTable =
    transliteration === "none"
      ? null
      : transliterations[transliteration];

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <div className={styles.items}>
              {renderAlphabet(item => item.level <= 7, translitTable)}
            </div>

            <div className={styles.items}>
              {renderAlphabet(item => item.level === 8, translitTable)}
            </div>

            <div className={styles.items}>
              {renderAlphabet(item => item.level === 9, translitTable)}
            </div>

            <div className={styles.items}>
              {renderAlphabet(item => item.level === 10, translitTable)}
            </div>

            <div className={`${styles.items} ${styles.item__red}`}>
              {renderAlphabet(item => item.level >= 11 && item.level <= 15, translitTable)}
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.itemsThreeInRow}>
              {renderAlphabet(item => item.level >= 16 && item.level <= 21, translitTable)}
            </div>

            <div className={styles.itemsThreeInRow}>
              {renderAlphabet(item => item.level === 22, translitTable)}
            </div>

            <div className={styles.itemsThreeInRow}>
              {renderAlphabet(item => item.level >= 23 && item.level <= 26, translitTable)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}