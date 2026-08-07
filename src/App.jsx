import { Navigate, Routes, Route } from 'react-router'
import { useState, useEffect } from 'react';

import { KanaLearningPage } from './pages/KanaLearningPage'
import { AlphabetPage } from './pages/AlphabetPage';
import { SettingsPage } from './pages/SettingsPage.jsx';

import { Menu } from './components/Menu/Menu.jsx';

import {
  getTheme, saveTheme,
  getTransliteration, saveTransliteration,
  getTextInputSettings, updateTextInputSettings,
  getMode, saveMode,
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

  const [textInputSettings, setTextInputSettings] = useState(getTextInputSettings);

  const updateSettings = (partial) => {
    setTextInputSettings(prev => ({
      ...prev,
      ...partial,
    }));

    updateTextInputSettings(partial);
  };

  const [mode, setMode] = useState(getMode);

  useEffect(() => {
    saveMode(mode);
  }, [mode]);

  return (
    <div className='App' data-theme={isLight ? "light" : "dark"}>
      <Menu
        isLight={isLight}
        setIsLight={setIsLight}
      />

      <div className='container'>
        <Routes>
          <Route
            path='/'
            element={<Navigate to={`/kana-learning?mode=${mode}`} replace />}
          />
          <Route
            path='/kana-learning'
            element={
              <KanaLearningPage
                mode={mode}
                setMode={setMode}
                transliteration={transliteration}
                textInputSettings={textInputSettings}
              />
            }
          />
          <Route
            path='/alphabet'
            element={
              <AlphabetPage
                transliteration={transliteration} />
            }
          />
          <Route
            path='/settings'
            element={
              <SettingsPage
                isLight={isLight}
                setIsLight={setIsLight}
                transliteration={transliteration}
                setTransliteration={setTransliteration}
                textInputSettings={textInputSettings}
                updateTextInputSettings={updateSettings}
                mode={mode}
                setMode={setMode}
              />
            }
          />
        </Routes>
      </div>
    </ div>
  )
}

export default App
