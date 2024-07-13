import React, { useState } from 'react';
import profileimage from '../assets/images/profileImg2.png';
import Button from './Button';
import { MdClose } from "react-icons/md";

function ProfileModal({ PostingClosedModal }) {
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleItemClick = (index) => {
        setClickedIndex(index);
    };

    return (
        <div className='fixed top-0 flex items-center justify-center w-[calc(100vw-296px)] min-h-screen border-2 backdrop-blur-sm'>
            <div className="absolute w-[500px] min-h-[650px] bg-custom-skyblue backdrop-blur">
                <button className="flex justify-end w-full" onClick={PostingClosedModal}><MdClose className='w-[20px] h-[20px] mr-[10px] mt-[10px]'/></button>
                <div className='flex flex-col items-center'>
                    <div className='text-[24px] font-black text-custom-indigo underline underline-offset-2 mb-[10px]'>PROFILE</div>
                    <div className='w-[400px] min-h-[500px] flex flex-col items-center '>
                        <div className='flex items-center justify-between w-[90%] mt-[10px]'>
                            <img src={profileimage} className='w-[150px] min-h-[150px]'></img>
                            <div className='w-[50%] flex justify-between'>
                                <div className='flex flex-col'>
                                    <span className='font-semibold mb-[5px]'>이름</span>
                                    <span className='font-semibold mb-[5px]'>나이</span>
                                    <span className='font-semibold mb-[5px]'>직업</span>
                                    <span className='font-semibold mb-[5px]'>위치</span>
                                    <span className='font-semibold mb-[5px]'>관심 분야</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='mb-[5px]'>Jomin-hn</span>
                                    <span className='mb-[5px]'>27세</span>
                                    <span className='mb-[5px]'>바리스타</span>
                                    <span className='mb-[5px]'>서울시 중구</span>
                                    <span className='mb-[5px]'>창업</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-[330px] min-h-[215px] m-[35px] flex-col rounded-[10px]'>
                            <div className='w-full h-[40px] bg-custom-blue flex items-center rounded-t-[10px]'>
                                <span className='ml-[25px] text-[18px] font-semibold text-custom-white'>일촌 목록</span>
                            </div>
                            <div className='flex-col w-full h-[220px] overflow-y-auto bg-custom-white rounded-b-[10px]'>
                                {['김민지', '이철수', '박영희', '홍길동', '이순신'].map((name, index) => (
                                    <div
                                        key={index}
                                        className={`flex w-full min-h-[40px] justify-between border-b-[1px] border-custom-grey cursor-pointer ${clickedIndex === index ? 'bg-custom-orange bg-opacity-50 border-custom-orange border-2 font-bold' : ''}`}
                                        onClick={() => handleItemClick(index)}
                                    >
                                        <div className='flex items-center ml-[30px]'>{name}</div>
                                        <div className='flex items-center text-[14px] text-custom-blue mr-[30px]'>#테니스</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Button label={"소개 받기"} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileModal;
