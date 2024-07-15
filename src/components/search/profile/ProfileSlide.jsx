import React, { useEffect, useState } from 'react';
import profileimage from '../../../assets/images/profileImg2.png';
import Button from '../../Button';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function ProfileSlide({ isOpen, onClose, onOpenCreditModal}) {
    const [clickedIndex, setClickedIndex] = useState(null);
    const [isIntroductionClicked, setIsIntroductionClicked] = useState(false);
    

    const handleItemClick = (index) => {
        setClickedIndex(index);
        console.log(clickedIndex);
    };

    const handleIntroductionClick = () => {
        setIsIntroductionClicked(true);
        console.log(isIntroductionClicked);
    };
  

    useEffect(() => {
        if (clickedIndex !== null && isIntroductionClicked) {
            onOpenCreditModal();
         
        }
    }, [clickedIndex, isIntroductionClicked, onOpenCreditModal]);


    return (
        <div
            className={`fixed top-[125px] right-20 h-[calc(100vh-150px)] bg-custom-skyblue transition-transform duration-300 border-2 border-green-400 ${isOpen ? '' : 'translate-x-[400px]'}`}
                style={{
                    width: '500px',
                    // 'overflow-y-auto'를 추가하여 내부 내용만 스크롤되도록 설정합니다.
                    overflowY: 'auto',
                }}
            >
            <button className="flex justify-end w-full" onClick={onClose}>
                <MdKeyboardDoubleArrowRight className='w-[46px] h-[39px] mr-[10px] mt-[10px] text-custom-grey'/>
            </button>
            <div className='flex flex-col items-center justify-center'>
                <div className='text-[24px] font-black text-custom-indigo underline underline-offset-2 mb-[10px]'>PROFILE</div>
                <div className='w-[400px] min-h-[500px] flex flex-col items-center'>
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
                    <Button label={"소개 받기"} onClick={handleIntroductionClick}/>
                </div>
            </div>
        </div>
    );
}

export default ProfileSlide;
