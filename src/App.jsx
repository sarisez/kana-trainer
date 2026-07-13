import { Routes, Route } from 'react-router'
import { Link } from 'react-router';
import { useState, useEffect } from 'react';

import { KanaLearningPage } from './pages/KanaLearningPage'
import { AlphabetPage } from './pages/AlphabetPage';

import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import { MenuIcon } from './components/MenuIcon/MenuIcon.jsx';

import { getTheme, saveTheme } from './utils/storage.js';
import { useLanguage } from './hooks/useLanguage.js';

import Alphabet from './assets/icons/Alphabet.jsx';
import Training from './assets/icons/Training.jsx';
import "./App.css";

function App() {

  const [isLight, setIsLight] = useState(getTheme);

  useEffect(() => {
    saveTheme(isLight);
  }, [isLight]);

  const { language, setLanguage } = useLanguage();

  return (
    <div className='App' data-theme={isLight ? "light" : "dark"}>
      <div className='menu'>
        <div className='menu-items'>
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
        <div className='menu-items'>
          <MenuIcon
            icon={
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ color: "black" }}
              >
                <option value="ua">Українська</option>
                <option value="en">English</option>
              </select>
            }
          />
          <ThemeToggle
            isChecked={isLight}
            handleChange={() => { setIsLight(!isLight) }}
          />
        </div>
      </div>
      <div className='container'>
        <Routes>
          <Route path='/kana-learning' element={<KanaLearningPage />} />
          <Route path='/alphabet' element={<AlphabetPage />} />
        </Routes>
      </div>
    </ div>
  )
}

export default App
