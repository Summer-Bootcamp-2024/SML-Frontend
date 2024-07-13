import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage'
import FriendListPage from './pages/FriendListPage'
import Mypage from './pages/Mypage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/list' element={<FriendListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
