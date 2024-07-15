import { useState } from "react";
import Button from "./Button";

function ChargeModal({onClose, onUpdateCredit, currentCredit}) {
    const [selectedCredit, setSelectedCredit] = useState(null);

    const handleButtonClick = (credit) => {
        setSelectedCredit(credit);
    }
    
    const handleCharge = () => {
        if (selectedCredit) {
            onUpdateCredit(selectedCredit);
        }
    }

    return (
        <div className={`fixed top-0 flex items-center justify-center w-[calc(100vw-296px)] min-h-screen border-2 backdrop-blur-sm`}>
            <div className="absolute flex justify-center items-center w-[800px] h-[500px] bg-custom-white backdrop-blur rounded-[10px] border border-custom-grey">
                <div className='flex flex-col gap-[50px] w-[490px] h-[342px] justify-center items-center'>
                    <div className="w-full flex flex-wrap gap-[20px] h-[50%]">
                        {[5000, 15000, 20000, 25000, 30000, 35000].map((credit) => (
                            <Button
                                key={credit}
                                className={`bg-custom-white w-[140px] h-[70px] border-custom-grey !text-black text-[18px] font-medium shadow-lg ${selectedCredit === credit ? '!bg-custom-orange border-none shadow-custom-orange' : ''}`}
                                label={`${credit} credit`}
                                onClick={() => handleButtonClick(credit)}
                            />
                        ))}
                    </div>
                    <div className="flex w-full gap-[20%] h-[40%]">
                        <div className="w-[50%] flex flex-col gap-[15px] pl-[20px] text-[18px] h-full">
                            <div className="flex justify-between">
                                <span>현재 credit</span>
                                <span>{currentCredit}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>선택한 credit</span>
                                <span>{selectedCredit || 0}</span>
                            </div>
                            <div className="flex justify-between font-bold border-t border-black mt-[5px] text-custom-orange">
                                <span>충전 후 credit</span>
                                <span>{currentCredit + (selectedCredit || 0)}</span>
                            </div>
                        </div>
                        <div className="flex items-end w-[30%] h-full">
                            <Button label={"충전하기"} onClick={handleCharge}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChargeModal;