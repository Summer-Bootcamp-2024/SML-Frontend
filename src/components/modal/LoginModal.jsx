import React from 'react';
import Button from "../Button";
import CheckLottie from "../lottie/checklottie.jsx";
import FailLottie from "../lottie/faillottie.jsx";

function LoginModal({ onClose, signupSuccess, navigate }) {

    const handleFailure = () => {
        onClose(); 
        navigate('/login'); 
    };

    const handleSuccess = () => {
        onClose();
        navigate('/list'); 
    };
    
    return (
        <div className={`fixed top-0 flex items-center justify-center w-full min-h-screen border-2 bg-white/50 backdrop-blur-sm`}>
            <div className=" flex flex-col items-center justify-center w-[400px] h-[250px] bg-custom-white rounded-[10px] border-[1px] border-custom-grey">
                {signupSuccess ? (
                    <div className='flex flex-col items-center justify-center'>
                        <div className='text-[28px] font-black'>로그인 성공!</div>
                        <div className='flex flex-col items-center mt-[-20px]'>
                            <CheckLottie/>
                            <div className="flex mt-[-20px]">
                                <Button label={"완료"} type="button" onClick={handleSuccess} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center gap-[5px]'>
                        <div className='text-[28px] font-black'>로그인 실패!</div>
                        <div className='flex flex-col items-center gap-[10px]'>
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

export default LoginModal;
