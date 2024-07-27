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
        category: 'IT/SW',
        job: '개발자',
        age: '',
    });

    const categoryList = [
        { value: 'IT/SW', name: 'IT/SW' },
        { value: '금융/보험', name: '금융/보험' },
        { value: '제조업', name: '제조업' },
        { value: '서비스업', name: '서비스업' },
        { value: '교육', name: '교육' },
        { value: '의료/보건', name: '의료/보건' },
        { value: '법률', name: '법률' },
        { value: '미디어/홍보', name: '미디어/홍보' },
        { value: '예술/디자인', name: '예술/디자인' },
        { value: '연구/과학', name: '연구/과학' }
    ];

    const jobList = [
        { name: '개발자', value: '개발자'},
        { name: '금융 전문가', value: '금융 전문가'},
        { name: '생산 관리자', value: '생산 관리자'},
        { name: '서비스 관리자', value: '서비스 관리자'},
        { name: '교육 전문가', value: '교육 전문가'},
        { name: '의료 전문가', value: '의료 전문가'},
        { name: '법률 전문가', value: '법률 전문가'},
        { name: '미디어/커뮤니케이션 전문가', value: '미디어/커뮤니케이션 전문가'},
        { name: '디자이너', value: '디자이너'},
        { name: '연구원', value: '연구원'}
    ];

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/users/signup`, formData);
            setSignupSuccess(true);
        } catch (error) {
            setSignupSuccess(false);
            console.log(error);
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
                    </div>
                    <Button label="회원 가입" className="mt-[10px]" type="submit" />
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
