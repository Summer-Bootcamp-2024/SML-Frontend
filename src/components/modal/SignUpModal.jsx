import React from 'react';
import Button from "../Button";
import CheckLottie from "../checklottie.jsx";
import FailLottie from "../faillottie.jsx";

function SignUpModal({ onClose, signupSuccess, navigate }) {

    const handleFailure = () => {
        onClose(); 
        navigate('/signup'); 
    };

    const handleSuccess = () => {
        onClose();
        navigate('/login'); 
    };
    
    return (
        <div className={`fixed top-0 flex items-center justify-center w-full min-h-screen border-2 bg-white/50 backdrop-blur-sm`}>
            <div className=" flex flex-col items-center justify-center w-[400px] h-[250px] bg-custom-white rounded-[10px] border-[1px] border-custom-grey">
                {signupSuccess ? (
                    <div className='flex flex-col items-center'>
                        <div className='text-[28px] font-black mb-[-10px]'>회원가입 성공!</div>
                        <div className='flex flex-col items-center'>
                            <CheckLottie />
                            <div className="flex">
                                <Button label={"완료"} type="button" onClick={handleSuccess} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center'>
                        <div className='text-[28px] font-black mb-[-10px]'>회원가입 실패!</div>
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

export default SignUpModal;
