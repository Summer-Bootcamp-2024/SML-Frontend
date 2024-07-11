import profileImg from '../assets/images/profileImg.png';
import { MdOutlineChat } from "react-icons/md";
import { MdOutlinePersonSearch } from "react-icons/md";
import { MdChatBubbleOutline } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { NavLink, Link } from 'react-router-dom';

function Sidebar() {
    return(
        <div className="w-[296px] h-[100vh] bg-stone-50 border-r border-zinc-300">
            <div className="text-2xl font-extrabold tracking-tight text-gray-600 pl-[48px] pt-[24px]">SML</div>
            <div className="flex items-center pl-[48px] mt-[37px] w-[250px] h-[80px] gap-[71px]">
                <img className="w-[60px] h-[60px] rounded-[115px]" src={profileImg}/>
                <div>
                    <span className='text-base font-normal tracking-tight text-black'>장희수</span>
                    <span className='text-sm font-extrabold tracking-tight text-black'>님</span>
                </div>
            </div>
            <ul className='flex flex-col pl-[50px] gap-[32px] justify-center w-[250px] h-[430px]'>
                <NavLink to="/friendlist" className={({isActive}) => isActive ? 'bg-gray-600 rounded-[10px] text-stone-50 w-[180px] h-[60px] pl-[15px] flex items-center gap-[5px] cursor-pointer' : 'w-[180px] h-[60px] pl-[15px] flex items-center gap-[5px] cursor-pointer'}>
                    <MdOutlineChat className='w-[29.93px] h-6'/>
                    <span className='text-base font-semibold tracking-tight'>Friend List</span>
                </NavLink>
                <NavLink to="/search" className={({isActive}) => isActive ? 'bg-gray-600 rounded-[10px] text-stone-50 w-[180px] h-[60px] pl-[15px] flex items-center gap-[5px] cursor-pointer' : 'w-[180px] h-[60px] pl-[15px] flex items-center gap-[5px] cursor-pointer'}>
                    <MdOutlinePersonSearch className='w-[27.10px] h-6'/>
                    <span className='text-base font-semibold tracking-tight'>Search</span>
                </NavLink>
                <NavLink to="/chat" className={({isActive}) => isActive ? 'bg-gray-600 rounded-[10px] text-stone-50 w-[180px] h-[60px] pl-[15px] flex items-center gap-[5px] cursor-pointer' : 'w-[180px] h-[60px] pl-[15px] flex items-center gap-[5px] cursor-pointer'}>
                    <MdChatBubbleOutline className='w-[30px] h-6'/>
                    <span className='text-base font-semibold tracking-tight'>Chat</span>
                </NavLink>
                <NavLink to="/mypage" className={({isActive}) => isActive ? 'bg-gray-600 rounded-[10px] text-stone-50 w-[180px] h-[60px] pl-[15px] flex items-center gap-[5px] cursor-pointer' : 'w-[180px] h-[60px] pl-[15px] flex items-center gap-[5px] cursor-pointer'}>
                    <MdHome className='w-[30px] h-6'/>
                    <span className='text-base font-semibold tracking-tight'>My Page</span>
                </NavLink>
            </ul>
            <Link to="/login" className='flex items-center gap-[7px] w-full h-[40px] pl-[50px]'>
                <MdLogout className='w-5 h-5 text-stone-300'/>
                <span className='text-base font-normal tracking-tight cursor-pointer text-stone-300'>Log Out</span>
            </Link>
        </div>
    )
}

export default Sidebar;