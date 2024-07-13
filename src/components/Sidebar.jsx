import profileImg from '../assets/images/profileImg.png';
import { MdOutlineChat } from "react-icons/md";
import { MdOutlinePersonSearch } from "react-icons/md";
import { MdListAlt } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { NavLink, Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path || (path === '/mypage' && location.pathname === '/mypageedit');
    }

    return(
        <div className=" flex flex-col items-center w-[296px] h-screen bg-custom-white border-r-[1px] border-custom-grey">
            <div className="w-[190px] text-[24px] font-extrabold text-custom-indigo mt-[20px]">SML</div>
            <div className='w-[220px] h-[650px] flex flex-col items-center pt-[36px]'>
                <div className="flex items-center justify-between w-[190px] h-[80px] mb-[30px] pb-[5px] border-b-[1px] border-custom-grey">
                    <img className="w-[70px] h-[70px] rounded-[115px]" src={profileImg}/>
                    <div className='flex items-center p-[10px]'>
                        <span className='flex items-end h-[30px] text-[18px] font-normal mr-[2px]'>장희수</span>
                        <span className='flex items-end h-[30px] text-[16x] font-extrabold'>님</span>
                    </div>
                </div>
                <ul className='flex flex-col justify-center items-center w-[190px] h-[300px]'>
                    <NavLink to="/friendlist" className={({isActive}) => isActive ? 'text-[20px] font-extrabold bg-custom-orange rounded-[10px] text-custom-indigo w-[180px] h-[55px] flex justify-center items-center cursor-pointer' : 'w-[190px] h-[55px] text-[18px] font-medium flex items-center justify-center cursor-pointer mb-[15px]'}>
                    <div className='w-[190px] flex items-center justify-baseline'>
                        <MdListAlt className='w-[24px] h-[24px]'/>
                        <span className=' w-[110px] ml-[10px] pr-[10px]'>Friend List</span>
                    </div>
                    </NavLink>
                    <NavLink to="/search" className={({isActive}) => isActive ? 'text-[20px] font-extrabold bg-custom-orange rounded-[10px] text-custom-indigo w-[180px] h-[55px] flex justify-center items-center cursor-pointer' : 'w-[190px] h-[55px] text-[18px] font-medium flex items-center justify-center cursor-pointer mb-[15px]'}>
                    <div className='w-[190px] flex items-center justify-baseline'>
                        <MdOutlinePersonSearch className='w-[24px] h-[24px]'/>
                        <span className='w-[110px] ml-[10px] pr-[10px]'>Search</span>
                    </div> 
                    </NavLink>
                    <NavLink to="/chat" className={({isActive}) => isActive ? 'text-[20px] font-extrabold bg-custom-orange rounded-[10px] text-custom-indigo w-[180px] h-[55px] flex justify-center items-center cursor-pointer' : 'w-[190px] h-[55px] text-[18px] font-medium flex items-center justify-center cursor-pointer mb-[15px]'}>
                    <div className='w-[190px] flex items-center justify-baseline'>
                        <MdOutlineChat className='w-[24px] h-[24px]'/>
                        <span className='w-[110px] ml-[10px] pr-[10px]'>Chat</span>
                        </div>
                    </NavLink>
                    <NavLink to="/mypage" className={({isActive}) => isActive ? 'text-[20px] font-extrabold bg-custom-orange rounded-[10px] text-custom-indigo w-[180px] h-[55px] flex justify-center items-center cursor-pointer' : 'w-[190px] h-[55px] text-[18px] font-medium flex items-center justify-center cursor-pointer'}>
                        <div className='w-[190px] flex items-center justify-baseline'>
                            <MdHome className='w-[24px] h-[24px]'/>
                            <span className='w-[110px] ml-[10px] pr-[10px]'>My Page</span>
                        </div>
                    </NavLink>
                </ul>
                </div>
                <Link to="/login" className='flex items-center justify-baseline w-[190px] h-[40px] mb-[20px]'>
                    <MdLogout className='w-5 h-5 text-custom-grey'/>
                    <span className='font-medium cursor-pointer text-custom-grey ml-[10px]'>Log Out</span>
                </Link>
        </div>
    )
}

export default Sidebar;