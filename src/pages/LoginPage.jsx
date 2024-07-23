import Lottie from "lottie-react";
import network from '../components/network.json';
import Button from '../components/Button';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiUrlStore, useUserIdStore } from '../store/store';


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {apiUrl} = useApiUrlStore()
    const {setUserId} = useUserIdStore()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, {email, password}, {withCredentials: true});
            window.alert('로그인 성공');
            setUserId(response.data.user_id);
            navigate('/list');
        } catch (err) {
            window.alert('로그인 실패');
            console.log(err);
        }
    }

    return (
        <div className="flex h-[100vh] items-center justify-center bg-[#D7ECFF] font-[Pretendard] ">
            <div className="flex justify-center items-center w-[673px] h-[409px] rounded-[20px] shadow-2xl bg-white">
                <div className="flex justify-center items-center w-[300px] h-[300px] border-r border-solid border-black">
                    <Lottie animationData={network} loop={true} className="w-[400px] h-[400px] text-blue-300"/>
                </div>
                <div className="flex flex-col gap-[18px] justify-center items-center w-[300px] h-[300px]">
                    <span className="text-gray-600 text-[24px] font-extrabold tracking-tight  font-[GmarketSansMedium]">Log in</span>
                    <form onSubmit={handleLogin} className="flex flex-col gap-[18px]">
                        <input 
                        className="bg-stone-50 w-[250px] h-[50px] rounded-[10px] border border-gray-600 text-gray-600/opacity-30 text-base font-extrabold tracking-tight pl-[24px]"
                        type="email" 
                        placeholder="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                         />
                        <input 
                        className="bg-stone-50 w-[250px] h-[50px] rounded-[10px] border border-gray-600 text-gray-600/opacity-30 text-base font-extrabold tracking-tight pl-[24px]" 
                        type="password" 
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                         />
                        <div className="flex flex-col items-center gap-[7px] mt-[10px]">
                            <Button label="Start" type="submit"></Button>
                            <a href="/signup" className="text-stone-300 text-[15px] font-semibold tracking-tight">Sign Up</a>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default LoginPage;