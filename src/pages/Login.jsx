import Lottie from "lottie-react";
import network from '../components/network.json';
import Button from '../components/Button';
import axios from "axios";
import { useState } from "react";
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="flex h-[100vh] items-center justify-center">
            <div className="flex justify-center items-center w-[673px] h-[409px] rounded-[20px] shadow-2xl">
                <div className="flex justify-center items-center w-[300px] h-[300px] border-r border-solid border-black">
                    <Lottie animationData={network} loop={true} className="w-[400px] h-[400px] text-blue-300"/>
                </div>
                <div className="flex flex-col gap-[18px] justify-center items-center w-[300px] h-[300px]">
                    <span className="text-gray-600 text-[24px] font-extrabold tracking-tight">Log in</span>
                    <form className="flex flex-col gap-[18px]">
                        <input 
                        className="bg-stone-50 w-[250px] h-[50px] rounded-[10px] border border-gray-600 text-gray-600/opacity-30 text-base font-extrabold tracking-tight pl-[24px]"
                        type="email" 
                        placeholder="email" />
                        <input 
                        className="bg-stone-50 w-[250px] h-[50px] rounded-[10px] border border-gray-600 text-gray-600/opacity-30 text-base font-extrabold tracking-tight pl-[24px]" 
                        type="password" placeholder="password" />
                    </form>
                    <div className="flex flex-col gap-[7px] mt-[10px]">
                        <Button label="Start"></Button>
                        <button className="text-stone-300 text-[15px] font-semibold tracking-tight">Sign Up</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Login;