import { Link } from "react-router-dom";

import { HeaderIcon } from "./KanaLearningHeaderIcon.jsx";

import KatakanaIcon from "../../assets/icons/KatakanaIcon.jsx";
import HiraganaIcon from "../../assets/icons/HiraganaIcon.jsx";
import BothIcon from "../../assets/icons/BothIcon.jsx";
import ImportIcon from "../../assets/icons/ImportIcon.jsx";
import ExportIcon from "../../assets/icons/ExportIcon.jsx";

import styles from "./KanaLearningHeader.module.css";

export function KanaLearningHeader({ mode, level }) {
  return (
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
            text="Hiragana"
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
            text="Both"
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
            text="Katakana"
            active={mode === "katakana"}
          />
        </Link>
      </div>
      <div className="level-container">
        <p>Level {level}</p>
      </div>
      <div className={styles.actions}>
        <HeaderIcon
          icon={<ImportIcon
            title="Import"
            titleId="import-icon"
            width={24}
            height={24}
          />}
          text="Import"
        />
        <HeaderIcon
          icon={<ExportIcon
            title="Export"
            titleId="expor-icon"
            width={24}
            height={24}
          />}
          text="Export"
        />
      </div>
    </div>
  );
}