import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useApiUrlStore, useUserIdStore } from '../store/store';
import ChargeModal from '../components/modal/ChargeModal';
import Lottie from "lottie-react";
import network from '../components/lottie/network.json';
import basicProfile from "../assets/images/myprofile/basicProfile.png";

function Mypage() {
    const { apiUrl } = useApiUrlStore();
    const { user_id, setUserId } = useUserIdStore();
    const [profile, setProfile] = useState(null);
    const [chargeModalOpen, setChargeModalOpen] = useState(false);
    const [currentCredit, setCurrentCredit] = useState(0);
    const [sentGifts, setSentGifts] = useState([]);
    const [receivedGifts, setReceivedGifts] = useState([]);
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedJob, setSelectedJob] = useState('');

    const categoryList = [
        { value: 'IT/SW', name: 'IT/SW' },
        { value: 'MOVIE', name: '영화' },
    ];

    const jobList = [
        { name: '개발자', value: 'PROGRAMMING' },
        { name: '감독', value: 'DIRECTOR' },
    ];

    const getProfile = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users/${user_id}`, {
                withCredentials: true,
            });
            setProfile(response.data);
            setCurrentCredit(response.data.credit);
            setSelectedCategory(response.data.category);
            setSelectedJob(response.data.job);
        } catch (error) {
            window.alert("조회 실패");
        }
    }

    const getSentGifts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/transactions/sent/${user_id}`, {
                withCredentials: true,
            });
            setSentGifts(Array.isArray(response.data.transactions) ? response.data.transactions : []);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setSentGifts([]); // 빈 배열로 설정
            } else {
                window.alert("보낸 선물 기록 조회 실패");
            }
        }
    }

    const getReceivedGifts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/transactions/received/${user_id}`, {
                withCredentials: true,
            });
            setReceivedGifts(Array.isArray(response.data.transactions) ? response.data.transactions : []);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setReceivedGifts([]); // 빈 배열로 설정
            } else {
                window.alert("받은 선물 기록 조회 실패");
            }
        }
    }

    useEffect(() => {
        getProfile();
        getSentGifts();
        getReceivedGifts();
    }, []);

    if (!profile) {
        return <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
            <div className="flex flex-col justify-center items-center w-[300px] h-[300px]">
                <Lottie animationData={network} loop={true} className="w-[400px] h-[400px] text-blue-300"/>
                <div className='text-[32px] text-custom-indigo font-bold'>loading...</div>
            </div>
        </div>
    }

    const openChargeModal = () => {
        setChargeModalOpen(true);
    }

    const closeChargeModal = () => {
        setChargeModalOpen(false);
    }

    const updateCredit = (addedCredit) => {
        setCurrentCredit((prevCredit) => prevCredit + addedCredit);
    }

    const deleteUser = async () => {
        try {
            const response = await axios.delete(`${apiUrl}/users/${user_id}`, {
                withCredentials: true,
            });
            
            if (response.status === 200) {
                window.alert(response.data.message || "회원 탈퇴가 완료되었습니다.");
                localStorage.removeItem('user_id');
                setUserId(null);
                navigate('/');
            }
        } catch (error) {
            window.alert('회원 탈퇴 실패');
        }
    }

    const selectedCategoryName = categoryList.find(item => item.value === selectedCategory)?.name || '';
    const selectedJobName = jobList.find(item => item.value === selectedJob)?.name || '';

    return (
        <div className="flex justify-end w-full h-[100vh] font-[Pretendard]">
            <Sidebar></Sidebar>
            <div className="flex flex-col gap-[46px] justify-center items-center w-[calc(100vw-296px)] h-[100vh]">
                <div className="relative flex w-[800px] h-[350px] bg-custom-blue/30 rounded-[10px] shadow-custom-blue/30 shadow-lg border-2 border-custom-blue">
                    <div className="flex flex-col gap-[20px] pl-[50px] pt-[28px]">
                        <h1 className="text-2xl font-black tracking-tight text-gray-600 underline">My PROFILE</h1>
                        <img className="w-[150px] h-[150px]" src={profile.image_url ? profile.image_url : basicProfile}/>
                    </div>
                    <ul className="flex gap-[40px] pt-[75px] pl-[68px]">
                        <li className="flex flex-col gap-[10px]">
                            <span className="text-base font-semibold text-black">이름</span>
                            <span className="text-base font-semibold text-black">나이</span>
                            <span className="text-base font-semibold text-black">직업</span>
                            <span className="text-base font-semibold text-black">성별</span>
                            <span className="text-base font-semibold text-black">회사</span>
                            <span className="text-base font-semibold text-black">위치</span>
                            <span className="text-base font-semibold text-black">관심분야</span>
                        </li>
                        <li className="flex flex-col gap-[10px]">
                            {profile && <span className="text-base font-light text-black">{profile.name}</span>}
                            {profile && <span className="text-base font-light text-black">{profile.age}세</span>}
                            <span className="text-base font-light text-black">{selectedJobName}</span>
                            {profile && <span className="text-base font-light text-black">{profile.gender}</span>}
                            <span className="text-base font-light text-black">{profile.company}</span>
                            {profile && <span className="text-base font-light text-black">{profile.region}</span>}
                            <span className="text-base font-light text-black">{selectedCategoryName}</span>
                        </li>
                    </ul>
                    <div className="ml-[45px] mt-20 w-[218.86px] h-[98.18px] bg-custom-white rounded-[10px] shadow-xl border border-custom-grey">
                        <div className="w-full h-[42px] flex justify-center items-center gap-[50px]">
                            <span className="text-lg font-extrabold underline text-custom-indigo">CREDIT</span>
                            <span onClick={openChargeModal} className="text-base font-medium cursor-pointer text-custom-grey">충전하기</span>
                        </div>
                        <div className="w-full h-[45px] flex justify-center items-center">
                            <span className="text-base font-bold text-custom-indigo">{currentCredit} credit</span>
                        </div>
                    </div>
                    <Link to='/mypage/edit'>
                        <Button className="absolute right-10 bottom-20" label="수정하기"></Button>
                    </Link>
                    <Button onClick={deleteUser} className="absolute right-10 bottom-6" label="탈퇴하기"></Button>
                </div>
                <div className="w-[800px] h-[220px] flex gap-[68px]">
                    <div className="w-[380px] h-[220px] bg-custom-grey/10 rounded-[10px] shadow-custom-blue/30 shadow-lg border-2 border-custom-blue overflow-y-auto">
                        <div>
                            <h1 className='p-[20px] text-xl font-black tracking-tight text-custom-indigo underline'>보낸 선물 기록 조회</h1>
                        </div>
                        <div className='w-full pl-[40px] gap-[20px] h-[100px] flex'>
                            <ul className='flex flex-col gap-[20px] text-black text-base font-normal'>
                                {sentGifts.map(gift => (
                                    <li key={gift.id}>
                                        <span>{new Date(gift.updated_at).toLocaleDateString()}</span>
                                    </li>
                                ))}
                            </ul>
                            <ul className='flex flex-col gap-[20px] text-black text-base font-normal'>
                                {sentGifts.map(gift => (
                                    <li key={gift.id}>
                                        <span>{gift.friend_name}</span>
                                    </li>
                                ))}
                            </ul>
                            <ul className='flex flex-col gap-[20px] text-black text-base font-normal'>
                                {sentGifts.map(gift => (
                                    <li key={gift.id}>
                                        <span>{`-${gift.ct_money} credit`}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="w-[380px] h-[220px] bg-custom-grey/10 rounded-[10px] shadow-custom-blue/30 shadow-lg border-2 border-custom-blue overflow-y-scroll">
                        <div>
                            <h1 className='p-[20px] text-xl font-black tracking-tight text-custom-indigo underline'>받은 선물 기록 조회</h1>
                        </div>
                        <div className='w-full pl-[40px] gap-[20px] h-[100px] flex'>
                            <ul className='flex flex-col gap-[20px] text-black text-base font-normal'>
                                {receivedGifts.map(gift => (
                                    <li key={gift.id}>
                                        <span>{new Date(gift.updated_at).toLocaleDateString()}</span>
                                    </li>
                                ))}
                            </ul>
                            <ul className='flex flex-col gap-[20px] text-black text-base font-normal'>
                                {receivedGifts.map(gift => (
                                    <li key={gift.id}>
                                        <span>{gift.friend_name}</span>
                                    </li>
                                ))}
                            </ul>
                            <ul className='flex flex-col gap-[20px] text-black text-base font-normal'>
                                {receivedGifts.map(gift => (
                                    <li key={gift.id}>
                                        <span>{`+${gift.ct_money} credit`}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {chargeModalOpen && (
                <ChargeModal onCloseModal={closeChargeModal} currentCredit={currentCredit} onUpdateCredit={updateCredit}></ChargeModal>
            )}
        </div>
    )
}

export default Mypage;
