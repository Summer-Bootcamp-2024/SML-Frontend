import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage'
import FriendListPage from './pages/FriendListPage'
import Mypage from './pages/Mypage'
import MypageEdit from './pages/MypageEdit';
import SearchPage from './pages/SearchPage';
import SearchPageMain from './pages/SearchPageMain';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/list' element={<FriendListPage />} />
        <Route path='/mypage/' element={<Mypage />} />
        <Route path='/mypageedit' element={<MypageEdit />} />
        <Route path='/search' element={<SearchPageMain />} />
        <Route path='/search/result' element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
