import { useState } from "react";
import Button from "../components/Button";
import axios from "axios";

function SignupPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        gender: '',
        region: '',
        age: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    } 

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/signup', formData);
            window.alert('회원가입 성공');
        } catch (err) {
            window.alert('실패');
        }
    }

    return (
        <div className="flex w-full h-[100vh] items-center justify-center bg-[#D7ECFF]">
            <div className="flex flex-col gap-[28px] justify-center items-center w-[450px] h-[550px] rounded-[20px] shadow-2xl bg-white">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-600">Sign up</h1>
                <form onSubmit={handleSignup} className="flex flex-col gap-[15px] items-center">
                    <input 
                    type="text" 
                    placeholder="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-[300px] h-[50px] bg-stone-50 rounded-[10px] border border-gray-600 pl-[23px] text-gray-600/opacity-30 text-base font-extrabold tracking-tight" />
                    <input 
                    type="email" 
                    placeholder="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-[300px] h-[50px] bg-stone-50 rounded-[10px] border border-gray-600 pl-[23px] text-gray-600/opacity-30 text-base font-extrabold tracking-tight" />
                    <input 
                    type="password" 
                    placeholder="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-[300px] h-[50px] bg-stone-50 rounded-[10px] border border-gray-600 pl-[23px] text-gray-600/opacity-30 text-base font-extrabold tracking-tight" />
                    <input 
                    type="age" 
                    placeholder="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-[300px] h-[50px] bg-stone-50 rounded-[10px] border border-gray-600 pl-[23px] text-gray-600/opacity-30 text-base font-extrabold tracking-tight" />
                    <input 
                    type="text" 
                    placeholder="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-[300px] h-[50px] bg-stone-50 rounded-[10px] border border-gray-600 pl-[23px] text-gray-600/opacity-30 text-base font-extrabold tracking-tight" />
                    <input 
                    type="text" 
                    placeholder="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    className="w-[300px] h-[50px] bg-stone-50 rounded-[10px] border border-gray-600 pl-[23px] text-gray-600/opacity-30 text-base font-extrabold tracking-tight" />
                    <Button type="submit" label="Join" className="mt-[10px] "></Button>
                </form>
            </div>
        </div>
    )
}

	export default SignupPage;