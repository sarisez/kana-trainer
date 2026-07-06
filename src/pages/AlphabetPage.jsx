import { hiragana } from "../data/hiragana.js";
import { katakana } from "../data/katakana.js";

import '../styles/pages/alphabet-page.css';

function renderAlphabet(filterFn) {
  return hiragana
    .filter(filterFn)
    .map((hiraganaItem) => {
      const katakanaItem = katakana.find(
        item => item.romaji === hiraganaItem.romaji
      );

      return (
        <div className="alphabet-item" key={hiraganaItem.symbol}>
          <p>
            {hiraganaItem.symbol} / {katakanaItem?.symbol}
          </p>
          <p>
            {hiraganaItem.ukrainian} / {hiraganaItem.romaji}
          </p>
        </div>
      );
    });
}

export function AlphabetPage() {
  return (
    <>
      <div className="alphabet-container">
        <div className="alphabet-left-column">
          <div className="alphabet-item-container aic-mb-20">
            {renderAlphabet(item => item.level <= 7)}
          </div>

          <div className="alphabet-item-container aic-mb-20">
            {renderAlphabet(item => item.level === 8)}
          </div>

          <div className="alphabet-item-container aic-mb-20">
            {renderAlphabet(item => item.level === 9)}
          </div>

          <div className="alphabet-item-container aic-mb-20">
            {renderAlphabet(item => item.level === 10)}
          </div>

          <div className="alphabet-item-container alphabet-item-red">
            {renderAlphabet(item => item.level >= 11 && item.level <= 15)}
          </div>
        </div>

        <div className="alphabet-right-column alphabet-item-blue">
          <div className="alphabet-item-container-3 aic-mt-90">
            {renderAlphabet(item => item.level >= 16 && item.level <= 21)}
          </div>

          <div className="alphabet-item-container-3 aic-mt-110">
            {renderAlphabet(item => item.level === 22)}
          </div>

          <div className="alphabet-item-container-3 aic-mt-110">
            {renderAlphabet(item => item.level >= 23 && item.level <= 26)}
          </div>
        </div>
      </div>
    </>
  );
}