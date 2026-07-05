import { Routes, Route } from 'react-router'
import { Link } from 'react-router';
import { useState, useEffect } from 'react';

import { KanaLearningPage } from './pages/KanaLearningPage'
import { AlphabetPage } from './pages/AlphabetPage';

import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';

import { getTheme, saveTheme } from './utils/storage.js';

import "./App.css";

function App() {

  const [isLight, setIsLight] = useState(getTheme);

  useEffect(() => {
    saveTheme(isLight);
  }, [isLight]);

  return (
    <div className='App' data-theme={isLight ? "light" : "dark"}>
      <div className='menu'>
        <div>
          <div className='menu-item'>
            <Link to='/alphabet' className='menu-item-text-icon'>abc</Link>
          </div>
          <div className='menu-item'>
            <Link to='/kana-learning' className='menu-item-text-icon'>あ</Link>
          </div>
        </div>
        <ThemeToggle 
          isChecked={isLight}
          handleChange={() => {setIsLight(!isLight)}}
        />
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
