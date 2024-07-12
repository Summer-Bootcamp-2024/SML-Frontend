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
        <div className="w-[296px] h-[100vh] bg-custom-grey/10 border-r border-zinc-300">
            <div className="text-2xl font-extrabold tracking-tight text-custom-orange pl-[48px] pt-[24px]">SML</div>
            <div className="flex items-center pl-[48px] mt-[37px] w-[250px] h-[80px] gap-[71px]">
                <img className="w-[70px] h-[70px] rounded-[115px]" src={profileImg}/>
                <div>
                    <span className='text-base font-normal tracking-tight text-black'>장희수</span>
                    <span className='text-sm font-extrabold tracking-tight text-black'>님</span>
                </div>
            </div>
            <ul className='flex flex-col pl-[50px] gap-[32px] justify-center w-[250px] h-[430px]'>
                <NavLink to="/friendlist" className={({isActive}) => isActive ? 'text-lg bg-custom-orange rounded-[10px] text-custom-indigo w-[180px] h-[60px] pl-[15px] flex items-center gap-[5px] cursor-pointer' : 'w-[180px] h-[60px] pl-[15px] flex items-center gap-[5px] cursor-pointer'}>
                    <MdListAlt className='w-[29.93px] h-6'/>
                    <span className='font-semibold tracking-tight'>Friend List</span>
                </NavLink>
                <NavLink to="/search" className={({isActive}) => isActive ? 'text-lg bg-custom-orange rounded-[10px] text-custom-indigo w-[180px] h-[60px] pl-[15px] flex items-center gap-[5px] cursor-pointer' : 'w-[180px] h-[60px] pl-[15px] flex items-center gap-[5px] cursor-pointer'}>
                    <MdOutlinePersonSearch className='w-[27.10px] h-6'/>
                    <span className='font-semibold tracking-tight'>Search</span>
                </NavLink>
                <NavLink to="/chat" className={({isActive}) => isActive ? 'text-lg bg-custom-orange rounded-[10px] text-custom-indigo w-[180px] h-[60px] pl-[15px] flex items-center gap-[5px] cursor-pointer' : 'w-[180px] h-[60px] pl-[15px] flex items-center gap-[5px] cursor-pointer'}>
                    <MdOutlineChat className='w-[30px] h-6'/>
                    <span className='font-semibold tracking-tight'>Chat</span>
                </NavLink>
                <NavLink to="/mypage" className={isActive('/mypage') ? 'text-lg bg-custom-orange rounded-[10px] text-custom-indigo w-[180px] h-[60px] pl-[15px] flex items-center gap-[5px] cursor-pointer' : 'w-[180px] h-[60px] pl-[15px] flex items-center gap-[5px] cursor-pointer'}>
                    <MdHome className='w-[30px] h-6'/>
                    <span className='font-semibold tracking-tight'>My Page</span>
                </NavLink>
            </ul>
            <Link to="/login" className='flex items-center gap-[7px] w-full h-[40px] pl-[50px]'>
                <MdLogout className='w-5 h-5 text-custom-grey'/>
                <span className='text-base font-normal tracking-tight cursor-pointer text-custom-grey'>Log Out</span>
            </Link>
        </div>
    )
}

export default Sidebar;