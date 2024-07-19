import { useState } from "react";
import Button from "./Button";
import { MdClose } from "react-icons/md"; 
import axios from "axios";
import { useApiUrlStore, useUserIdStore } from "../store/store";

function ChargeModal({onCloseModal, currentCredit, onUpdateCredit}) {
    const { apiUrl } = useApiUrlStore();
    const { user_id } = useUserIdStore();
    const [selectedCredit, setSelectedCredit] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleButtonClick = (credit) => {
        setSelectedCredit(credit);
    }
    
    const handleCharge = async () => {
        if (selectedCredit) {
            setIsLoading(true);
            try {
                const response = await axios.put(`${apiUrl}/users/${user_id}/credit`, {
                    credits: selectedCredit
                });
                onUpdateCredit(selectedCredit);
                setSelectedCredit(0);
                onCloseModal();
            } catch (err) {
                window.alert('충전 실패');
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <div className={`fixed flex items-center justify-center w-[calc(100vw-296px)] min-h-screen border-2 backdrop-blur-sm`}>
            <div className="flex flex-col justify-center items-center w-[700px] h-[450px] bg-custom-white backdrop-blur rounded-[10px] border border-custom-grey">
            <button className="flex justify-end mt-[-40px] mb-[10px] w-full" onClick={onCloseModal}><MdClose className='w-[20px] h-[20px] mr-[10px]'/></button>
                <div className='flex flex-col gap-[60px] w-[550px] h-[350px] justify-center items-center p-[20px]comcoiccom'>
                    <div className="w-full flex flex-wrap gap-[20px] h-[50%] items-center justify-center">
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
                            <Button label={isLoading ? "충전중..." : "충전하기"} onClick={handleCharge} disabled={isLoading}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChargeModal;