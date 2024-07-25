import React from 'react';
import Button from "../Button.jsx";
import CheckLottie from "../lottie/checklottie.jsx";
import FailLottie from "../lottie/faillottie.jsx";

function FriendCheckModal({ onClose, navigate, friendName}) {

    const handleFailure = () => {
        onClose(); 
        navigate('/chat'); 
    };

    const handleSuccess = () => {
        onClose();
        navigate('/list'); 
    };
    
    return (
        <div className={`fixed top-0 flex items-center justify-center w-full min-h-screen border-2 bg-white/50 backdrop-blur-sm`}>
            <div className=" flex flex-col items-center justify-center w-[400px] h-[250px] bg-custom-white rounded-[10px] border-[1px] border-custom-grey">
                {signupSuccess ? (
                    <div className='flex flex-col items-center'>
                        <div className='text-[28px] font-black mb-[-10px]'>'{friendName}' 님과 일촌이 됐어요!</div>
                        <div className='flex flex-col items-center'>
                            <CheckLottie />
                            <div className="flex">
                                <Button label={"완료"} type="button" onClick={handleSuccess} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center'>
                        <div className='text-[28px] font-black mb-[-10px]'>일촌요청에 실패했어요!</div>
                        <div className='text-[20px] text-custom-grey mb-[-10px]'>일촌요청 받기를 눌러 다시 진행해주세요.</div>
                        <div className='flex flex-col items-center'>
                            <FailLottie />
                            <div className="flex">
                                <Button label={"확인"} type="button" onClick={handleFailure} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FriendCheckModal;
