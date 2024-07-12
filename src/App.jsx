import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import MainPage from './pages/MainPage'
import Mypage from './pages/Mypage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/mypage' element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
