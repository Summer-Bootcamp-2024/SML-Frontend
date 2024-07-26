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
import Lottie from "lottie-react";
import network from '../components/lottie/network.json';
import LogoutModal from './modal/LogoutModal';

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { apiUrl} = useApiUrlStore();
    const { logout, user_id } = useUserIdStore();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [logoutSuccess, setLogoutSuccess] = useState(false);
    const [logoutModalOpen, setlogoutModalOpen] = useState(false);
    const [profile, setProfile] = useState({});
 
    const getProfile = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users/${user_id}`, {
                withCredentials: true,
            });
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
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
            await axios.post(`${apiUrl}/auth/logout`, {}, {withCredentials:true});
            setLogoutSuccess(true); 
            logout();
            localStorage.removeItem('user_id');
            setIsLoggedIn(false);    
        } catch (error) {
            setLogoutSuccess(false); 
        }
        finally {
            setlogoutModalOpen(true); 
        }
    }

    const PostingClosedModal = () => {
        setlogoutModalOpen(false);
    };


    return(
        <div className="fixed top-0 left-0 flex flex-col items-center w-[296px] h-screen bg-custom-white border-r-[1px] border-custom-grey font-[Pretendard] z-10">
            <div className="flex gap-[2%] pl-[5%] justify-start items-center w-full text-[24px] font-extrabold text-custom-indigo mt-[20px] font-[GmarketSansMedium]">
            <Lottie animationData={network} loop={true} className="w-[50px] h-[50px] text-blue-300"/>
                SML
                </div>
            <div className='w-[220px] h-[650px] flex flex-col items-center pt-[36px]'>
                <div className="flex items-center justify-between w-auto h-[80px] mb-[30px] pb-[5px]  border-custom-grey">
                    <img className="w-[70px] h-[70px] rounded-[50%]" src={profile.image_url || basicProfile}/>
                    <div className='flex items-center justify-center p-[10px]'>
                        <span className='flex justify-center items-end h-[30px] text-[20px] font-normal mx-[5px]'>{profile.name}</span>
                        <span className='flex justify-center items-end h-[30px] text-[16px] font-normal mr-[5px]'>님</span>
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
                    <button onClick={handleLogout} className='flex items-center justify-baseline w-[190px] h-[40px] mb-[30px]'>
                        <MdLogout className='w-5 h-5 text-custom-grey'/>
                        <span className='font-medium cursor-pointer text-custom-grey ml-[10px]'>Log Out</span>
                    </button>
                )}
                {logoutModalOpen && (
                <LogoutModal 
                    onClose={PostingClosedModal}
                    logoutSuccess={logoutSuccess}
                    navigate={navigate}
                />
            )}
        </div>
    )
}

export default Sidebar;