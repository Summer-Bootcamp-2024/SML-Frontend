import { useEffect, useState } from "react";
import Button from "../Button";
import { useApiUrlStore, useUserIdStore } from "../../store/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function IntroduceFriendModal({ onClose, friendName }) {
    const navigate = useNavigate();


   const handleFailure = () => {
        onClose(); 
        navigate('/lchat'); 
    };

    const handleSuccess = () => {
        onClose();
        navigate('/chat'); 
    };


    
    return (
        <div className={`fixed top-0 flex items-center justify-center w-[calc(100vw-296px)] min-h-screen border-2 bg-white/50 backdrop-blur-md`}>
            <div className=" flex flex-col items-center justify-center w-[400px] h-[200px] bg-custom-white rounded-[10px] border-[1px] border-custom-grey">
                <div className='flex flex-col items-center p-[20px]'>
                    <div className='text-[20px] font-black mb-[30px]'>'{friendName}' 님 소개하기를 진행할까요?</div>
                        <div className="flex gap-[40px]">
                            <Button label={"확인"} onClick={handleSuccess}/>
                            <Button label={"취소"} onClick={handleFailure}/>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default IntroduceFriendModal;