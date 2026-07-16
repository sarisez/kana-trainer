import { Routes, Route } from 'react-router'
import { Link } from 'react-router';
import { useState, useEffect } from 'react';

import { KanaLearningPage } from './pages/KanaLearningPage'
import { AlphabetPage } from './pages/AlphabetPage';
import { SettingsPage } from './pages/SettingsPage.jsx';

import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';
import { MenuIcon } from './components/MenuIcon/MenuIcon.jsx';

import { getTheme, saveTheme } from './utils/storage.js';

import Alphabet from './assets/icons/Alphabet.jsx';
import Training from './assets/icons/Training.jsx';
import Settings from './assets/icons/Settings.jsx';
import "./App.css";

function App() {

  const [isLight, setIsLight] = useState(getTheme);

  useEffect(() => {
    saveTheme(isLight);
  }, [isLight]);

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
      <div className='container'>
        <Routes>
          <Route path='/kana-learning' element={<KanaLearningPage />} />
          <Route path='/alphabet' element={<AlphabetPage />} />
          <Route path='/settings' element={<SettingsPage 
            isLight = {isLight}
            setIsLight = {setIsLight}
          />} />
        </Routes>
      </div>
    </ div>
  )
}

export default App
