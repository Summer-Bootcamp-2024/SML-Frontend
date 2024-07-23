import axios from 'axios';
import { MdOutlineChat } from "react-icons/md";
import { MdOutlinePersonSearch } from "react-icons/md";
import { MdListAlt } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { NavLink,  useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApiUrlStore, useUserIdStore } from '../store/store';
import basicProfile from '../assets/images/myprofile/basicProfile.png';

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { apiUrl} = useApiUrlStore();
    const { logout, user_id } = useUserIdStore();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [profile, setProfile] = useState({});
 
    const getProfile = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users/${user_id}`, {
                withCredentials: true,
            });
            setProfile(response.data);
        } catch (err) {

        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    const isActive = (path) => {
        return location.pathname === path || (path === '/mypage' && location.pathname === '/mypage/edit');
    }

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/auth/logout', {}, {withCredentials:true});
            window.alert('로그아웃 성공');
            logout();
            localStorage.removeItem('user_id');
            setIsLoggedIn(false);
            navigate('/');
            
        } catch (err) {
            window.alert('로그아웃을 실패하는 경우가 있어?');
        }
    }

    return(
        <div className=" flex flex-col items-center w-[296px] h-screen bg-custom-white border-r-[1px] border-custom-grey font-[Pretendard]">
            <div className="w-[190px] text-[24px] font-extrabold text-custom-indigo mt-[20px] font-[GmarketSansMedium] ">SML</div>
            <div className='w-[220px] h-[650px] flex flex-col items-center pt-[36px]'>
                <div className="flex items-center justify-between w-auto h-[80px] mb-[30px] pb-[5px] border-b-[1px] border-custom-grey">
                    <img className=" h-[70px] rounded-[115px]" src={profile.image_url || basicProfile}/>
                    <div className='flex items-center justify-center p-[10px]'>
                        <span className='flex justify-center items-end h-[30px] border-2 text-[20px] font-normal mx-[5px]'>{profile.name}</span>
                        <span className='flex justify-center items-end h-[30px] border-2 text-[16px] font-normal mr-[5px]'>님</span>
                    </div>
                </div>
                <ul className='flex flex-col justify-center items-center w-[190px] h-[300px]'>
                    <NavLink to="/list" className={({isActive}) => isActive ? 'text-[20px] font-extrabold bg-custom-orange rounded-[10px] text-custom-indigo w-[190px] h-[55px] flex justify-center items-center cursor-pointer mb-[15px]' 
                    : 'w-[190px] h-[55px] text-[18px] font-medium flex items-center justify-center cursor-pointer mb-[15px]'}>
                    <div className='w-[190px] flex items-center justify-center'>
                        <MdListAlt className='w-[24px] h-[24px]'/>
                        <span className=' w-[110px] ml-[10px] pr-[10px]'>Friend List</span>
                    </div>
                    </NavLink>
                    <NavLink to="/search" className={({isActive}) => isActive ? 'text-[20px] font-extrabold bg-custom-orange rounded-[10px] text-custom-indigo w-[190px] h-[55px] flex justify-center items-center cursor-pointer mb-[15px]' 
                    : 'w-[190px] h-[55px] text-[18px] font-medium flex items-center justify-center cursor-pointer mb-[15px]'}>
                    <div className='w-[190px] flex items-center justify-center'>
                        <MdOutlinePersonSearch className='w-[24px] h-[24px]'/>
                        <span className='w-[110px] ml-[10px] pr-[10px]'>Search</span>
                    </div> 
                    </NavLink>
                    <NavLink to="/chat" className={({isActive}) => isActive ? 'text-[20px] font-extrabold bg-custom-orange rounded-[10px] text-custom-indigo w-[190px] h-[55px] flex justify-center items-center cursor-pointer mb-[15px]' 
                    : 'w-[190px] h-[55px] text-[18px] font-medium flex items-center justify-center cursor-pointer mb-[15px]'}>
                    <div className='w-[190px] flex items-center justify-center'>
                        <MdOutlineChat className='w-[24px] h-[24px]'/>
                        <span className='w-[110px] ml-[10px] pr-[10px]'>Chat</span>
                        </div>
                    </NavLink>
                    <NavLink to="/mypage" className={({isActive}) => isActive ? 'text-[20px] font-extrabold bg-custom-orange rounded-[10px] text-custom-indigo w-[190px] h-[55px] flex justify-center items-center cursor-pointer' 
                    : 'w-[190px] h-[55px] text-[18px] font-medium flex items-center justify-center cursor-pointer'}>
                        <div className='w-[190px] flex items-center justify-center'>
                            <MdHome className='w-[24px] h-[24px]'/>
                            <span className='w-[110px] ml-[10px] pr-[10px]'>My Page</span>
                        </div>
                    </NavLink>
                </ul>
                </div>
                {isLoggedIn && (
                    <button onClick={handleLogout} className='flex items-center justify-baseline w-[190px] h-[40px] mb-[20px]'>
                        <MdLogout className='w-5 h-5 text-custom-grey'/>
                        <span className='font-medium cursor-pointer text-custom-grey ml-[10px]'>Log Out</span>
                    </button>
                )}
        </div>
    )
}

export default Sidebar;