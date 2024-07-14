import { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import ChargeModal from "./ChargeModal";

function Credit() {
    const [isChargeModalOpen, setChargeModalOpen] = useState(false);
    const [currentCredit, setCurrentCredit] = useState(0);
    const [giftCredit, setGiftCredit] = useState('');

    const toggleChargeModal = () => {
        setChargeModalOpen(!isChargeModalOpen);
        console.log(isChargeModalOpen);
    }

    const updateCredit = (addedCredit) => {
        setCurrentCredit(currentCredit + addedCredit);
        toggleChargeModal();
    }

    const handleGiftInputChange = (e) => {
        setGiftCredit(e.target.value);
    }

    const handleGiftSubmit = (e) => {
        if (parseInt(giftCredit) > currentCredit) {
            e.preventDefault();
            alert("선물할 크레딧이 현재 보유 크레딧보다 많습니다.");
        }
    }
    
    return (
        <div className={`fixed top-0 flex items-center justify-center w-[calc(100vw-296px)] min-h-screen border-2 backdrop-blur-sm`}>
            <div className="absolute w-[438px] h-[250px] bg-custom-white backdrop-blur rounded-[10px] border border-custom-grey">
                <div className='flex flex-col items-center mt-[20px]'>
                    <div className='text-[20px] font-black mb-[10px]'>상대방에게 선물할 크레딧을 입력하세요!</div>
                    <div className='w-[400px] flex flex-col items-center'>
                        <div className='flex items-center justify-between w-[90%]'>
                            <div className='flex justify-center w-full text-custom-grey text-[15px]'>
                                <span>현재 보유 크레딧 {currentCredit} credit</span>
                            </div>
                        </div>
                        <div className='flex w-[80%] h-[80px] gap-[10px] justify-center items-center'>
                            <input 
                            type="text" 
                            className="pl-[10px] border-b border-black bg-custom-white" 
                            value={giftCredit}
                            onChange={handleGiftInputChange}
                            />
                            <span className="font-black">credit</span>
                        </div>
                        <div className="flex gap-[40px]">
                            <Link to='/chat' onClick={handleGiftSubmit}>
                                <Button label={"선물하기"} />
                            </Link>
                            <Button label={"충전하기"} onClick={toggleChargeModal}/>
                        </div>
                        
                    </div>
                </div>
            </div>
            {isChargeModalOpen && (
                <ChargeModal onClose={toggleChargeModal} onUpdateCredit={updateCredit} currentCredit={currentCredit}/>
            )}
        </div>
    )
}

export default Credit;