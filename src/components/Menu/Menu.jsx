import { Link } from 'react-router';

import { ThemeToggle } from "../ThemeToggle/ThemeToggle.jsx";
import { MenuIcon } from '../MenuIcon/MenuIcon.jsx';

import Alphabet from "../../assets/icons/Alphabet.jsx";
import Training from '../../assets/icons/Training.jsx';
import Settings from '../../assets/icons/Settings.jsx';

import styles from "./Menu.module.css"

export function Menu({isLight, setIsLight}) {
  return (
    <div className={styles.container}>
      <div className={styles.items}>
        <Link to='/alphabet'><MenuIcon
          icon={
            <Alphabet
              title="Alphabet"
              titleId="alphabet-icon"
              width={24}
              height={24}
            />
          }
        /></Link>
        <Link to='/kana-learning'><MenuIcon
          icon={
            <Training
              title="KanaLearning"
              titleId="kana-learning-icon"
              width={24}
              height={24}
            />
          }
        /></Link>
      </div>
      <div className={styles.items}>
        <ThemeToggle
          isChecked={isLight}
          handleChange={() => { setIsLight(!isLight) }}
        />
        <Link to='/settings'><MenuIcon
          icon={
            <Settings
              title="Settings"
              titleId="settings-icon"
              width={24}
              height={24}
            />
          }
        /></Link>
      </div>
    </div>
  );
}