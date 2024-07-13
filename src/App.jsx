import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage'
import Mypage from './pages/Mypage';
import MypageEdit from './pages/MypageEdit';
import SearchPage from './pages/SearchPage';
import ProfileList from './components/search/ProfileList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/mypage/' element={<Mypage />} />
        <Route path='/mypageedit' element={<MypageEdit />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/search/bar' element={<ProfileList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
