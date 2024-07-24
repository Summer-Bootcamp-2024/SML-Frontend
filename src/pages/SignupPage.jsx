import { useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useApiUrlStore } from "../store/store";
import SignUpModal from '../components/modal/SignUpModal.jsx';

function SignupPage() {
    const { apiUrl } = useApiUrlStore();
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        gender: '',
        category: '',
        job: '',
        age: '',
    });

    const categoryList = [
        { value: 'IT/SW', name: 'IT/SW' },
        { value: 'MOVIE', name: '영화' },
    ];

    const jobList = [
        {
            name: '개발자',
            value: 'PROGRAMMING',
        },
        {
            name: '감독',
            value: 'DIRECTOR',
        },
    ];

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await axios.post(`${apiUrl}/users/signup`, formData);
            console.log(response.data)
            setSignupSuccess(true);
        } catch (err) {
            setSignupSuccess(false);
            console.log(err);
        } finally {
            setStatusModalOpen(true);
        }
    };

    const PostingClosedModal = () => {
        setStatusModalOpen(false);
    };

    return (
        <div className="flex w-full h-[100vh] items-center justify-center bg-[#D7ECFF] font-[Pretendard] ">
            <div className="flex flex-col gap-[28px] justify-center items-center w-[450px] h-[550px] rounded-[20px] shadow-2xl bg-white">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-600 font-[GmarketSansMedium]">Sign up</h1>
                <form onSubmit={handleSignup} className="flex flex-col gap-[15px] items-center ">
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
                        type="text" 
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
                    <div className="flex">
                        <select 
                            name="job"
                            value={formData.job}
                            onChange={handleChange}
                            required
                            className="w-[140px] h-[50px] bg-stone-50 rounded-[10px] mx-[10px] border border-gray-600 pl-[23px] text-gray-600/opacity-30 text-base font-extrabold tracking-tight">
                            {jobList.map((item) => (
                                <option value={item.value} key={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <select 
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-[140px] h-[50px] bg-stone-50 rounded-[10px] border mx-[10px] border-gray-600 pl-[23px] text-gray-600/opacity-30 text-base font-extrabold tracking-tight">
                            {categoryList.map((item) => (
                                <option value={item.value} key={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button label="Join" className="mt-[10px]" type="submit" />
                </form>
            </div>
            {statusModalOpen && (
                <SignUpModal 
                    onClose={PostingClosedModal}
                    signupSuccess={signupSuccess}
                    navigate={navigate}
                />
            )}
        </div>
    );
}

export default SignupPage;
