import { Routes, Route } from 'react-router'
import { Link } from 'react-router';

import { KanaLearningPage } from './pages/KanaLearningPage'
import { AlphabetPage } from './pages/AlphabetPage';

import "./App.css";

function App() {

  return (
    <>
      <div className='menu'>
        <div>
          <div className='menu-item'>
            <Link to='/alphabet' className='menu-item-text-icon'>abc</Link>
          </div>
          <div className='menu-item'>
            <Link to='/kana-learning' className='menu-item-text-icon'>あ</Link>
          </div>
        </div>
      </div>
      <div className='container'>
        <Routes>
          <Route path='/kana-learning' element={<KanaLearningPage />} />
          <Route path='/alphabet' element={<AlphabetPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
