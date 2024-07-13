import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import profileImgSquare from '../assets/images/profileImgSquare.png';
import MypageEdit from './MypageEdit';
import { Link, Route, Routes } from 'react-router-dom';

function Mypage() {
    return (
        <div className="flex justify-end w-full h-[100vh]">
            <Sidebar></Sidebar>
            <div className="flex flex-col gap-[46px] justify-center items-center w-[calc(100vw-296px)] h-[100vh]">
                <div className="relative flex w-[800px] h-[350px] bg-custom-blue/30 rounded-[10px] shadow-custom-blue/30 shadow-lg border-2 border-custom-blue">
                    <div className="flex flex-col gap-[20px] pl-[50px] pt-[28px]">
                        <h1 className="text-2xl font-black tracking-tight text-gray-600 underline">My PROFILE</h1>
                        <img className="w-[150px] h-[150px]" src={profileImgSquare}/>
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
                            <span className="text-base font-light text-black">John</span>
                            <span className="text-base font-light text-black">27세</span>
                            <span className="text-base font-light text-black">백엔드 개발자</span>
                            <span className="text-base font-light text-black">Men</span>
                            <span className="text-base font-light text-black">실리콘밸리</span>
                            <span className="text-base font-light text-black">서울시 중구</span>
                            <span className="text-base font-light text-black">창업</span>
                        </li>
                    </ul>
                    <div className="ml-[45px] mt-20 w-[218.86px] h-[98.18px] bg-custom-white rounded-[10px] shadow-xl border border-custom-grey">
                        <div className="w-full h-[42px] flex justify-center items-center gap-[50px]">
                            <span className="text-lg font-extrabold underline text-custom-indigo">CREDIT</span>
                            <span className="text-base font-medium cursor-pointer text-custom-grey">충전하기</span>
                        </div>
                        <div className="w-full h-[45px] flex justify-center items-center">
                            <span className="text-base font-bold text-custom-indigo">12345 credit</span>
                        </div>
                    </div>
                    <Link to='/mypageedit'>
                        <Button className="absolute right-10 bottom-6" label="수정하기"></Button>
                    </Link>
                </div>
                <div className="w-[800px] h-[220px] flex gap-[68px]">
                    <div className="w-[380px] h-full bg-custom-grey/10 rounded-[10px] shadow-custom-blue/30 shadow-lg border-2 border-custom-blue">
                        <div>
                            <h1 className='p-[20px] text-xl font-black tracking-tight text-custom-indigo underline'>보낸 선물 기록 조회</h1>
                        </div>
                        <div className='w-full pl-[40px] gap-[20px] h-[100px] flex'>
                            <ul className='flex flex-col gap-[20px] text-black text-base font-normal'>
                                <span>2024. 01. 01</span>
                                <span>2024. 03. 05</span>
                                <span>2024. 03. 21</span>
                            </ul>
                            <ul className='flex flex-col gap-[20px] text-black text-base font-normal'>
                                <span>김대희님</span>
                                <span>원영서님</span>
                                <span>진기태님</span>
                            </ul>
                            <ul className='flex flex-col gap-[20px] text-black text-base font-normal'>
                                <span>-5000 credit</span>
                                <span>-123400 credit</span>
                                <span>-200 credit</span>
                            </ul>
                        </div>
                    </div>
                    <div className="w-[380px] h-full bg-custom-grey/10 rounded-[10px] shadow-custom-blue/30 shadow-lg border-2 border-custom-blue">
                    <div>
                            <h1 className='p-[20px] text-xl font-black tracking-tight text-custom-indigo underline'>받은 선물 기록 조회</h1>
                        </div>
                        <div className='w-full pl-[40px] gap-[20px] h-[100px] flex'>
                            <ul className='flex flex-col gap-[20px] text-black text-base font-normal'>
                                <span>2024. 01. 01</span>
                                <span>2024. 03. 05</span>
                                <span>2024. 03. 21</span>
                            </ul>
                            <ul className='flex flex-col gap-[20px] text-black text-base font-normal'>
                                <span>김대희님</span>
                                <span>원영서님</span>
                                <span>진기태님</span>
                            </ul>
                            <ul className='flex flex-col gap-[20px] text-black text-base font-normal'>
                                <span>+5000 credit</span>
                                <span>+123400 credit</span>
                                <span>+200 credit</span>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mypage;