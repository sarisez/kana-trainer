import { Routes, Route } from 'react-router'
import { useState, useEffect } from 'react';

import { KanaLearningPage } from './pages/KanaLearningPage'
import { AlphabetPage } from './pages/AlphabetPage';
import { SettingsPage } from './pages/SettingsPage.jsx';

import { Menu } from './components/Menu/Menu.jsx';

import { 
  getTheme, saveTheme, 
  getTransliteration, saveTransliteration 
} from './utils/storage.js';

import "./App.css";

function App() {

  const [isLight, setIsLight] = useState(getTheme);

  useEffect(() => {
    saveTheme(isLight);
  }, [isLight]);

  const [transliteration, setTransliteration] = useState(getTransliteration);

  useEffect(() => {
    saveTransliteration(transliteration);
  }, [transliteration]);

  return (
    <div className='App' data-theme={isLight ? "light" : "dark"}>
      <Menu
        isLight={isLight}
        setIsLight={setIsLight}
      />

      <div className='container'>
        <Routes>
          <Route path='/' element={<KanaLearningPage transliteration={transliteration} />} />
          <Route path='/kana-learning' element={<KanaLearningPage transliteration={transliteration} />} />
          <Route path='/alphabet' element={<AlphabetPage />} />
          <Route path='/settings' element={<SettingsPage
            isLight={isLight}
            setIsLight={setIsLight}
            transliteration={transliteration}
            setTransliteration={setTransliteration}
          />} />
        </Routes>
      </div>
    </ div>
  )
}

export default App
