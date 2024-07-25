import React from 'react';
import Button from "../Button";
import CheckLottie from "../lottie/checklottie.jsx";
import FailLottie from "../lottie/faillottie.jsx";
import ReactDOM from "react-dom";
function LogoutModal({ onClose, logoutSuccess, navigate }) {

    const handleFailure = () => {
        onClose();
    };

    const handleSuccess = () => {
        onClose();
        navigate('/'); 
    };

    const modalContent = (
        <div className={`fixed top-0 flex items-center justify-center w-full min-h-screen border-2 bg-white/50 backdrop-blur-sm z-20`}>
            <div className=" flex flex-col items-center justify-center w-[400px] h-[250px] bg-custom-white rounded-[10px] border-[1px] border-custom-grey">
                {logoutSuccess ? (
                    <div className='flex flex-col items-center'>
                        <div className='text-[24px] font-black'>로그아웃 성공!</div>
                        <div className='text-[14px] text-custom-grey mb-[-10px]'>다음에 다시 만나요</div>
                        <div className='flex flex-col items-center'>
                            <CheckLottie />
                            <div className="flex mt-[-10px]">
                                <Button label={"완료"} type="button" onClick={handleSuccess} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center'>
                        <div className='text-[24px] font-black'>로그아웃 실패!</div>
                        <div className='flex flex-col items-center'>
                            <FailLottie />
                            <div className="flex mt-[-10px]">
                                <Button label={"확인"} type="button" onClick={handleFailure} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
}

export default LogoutModal;
