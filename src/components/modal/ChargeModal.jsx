import { useState } from "react";
import Button from "../Button";
import { MdClose } from "react-icons/md"; 
import axios from "axios";
import { useApiUrlStore, useUserIdStore } from "../../store/store";
import credit5000Img from "../../assets/images/credit/credit5000.png"
import credit10000Img from "../../assets/images/credit/credit10000.png"
import credit15000Img from "../../assets/images/credit/credit15000.png"
import credit20000Img from "../../assets/images/credit/credit20000.png"

function ChargeModal({ onCloseModal, currentCredit, onUpdateCredit }) {
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
                await axios.put(`${apiUrl}/users/${user_id}/credit`, {
                    credits: selectedCredit
                });
                onUpdateCredit(selectedCredit);
                setSelectedCredit(0);
                onCloseModal();
            } catch (error) {
                window.alert('충전 실패');
            } finally {
                setIsLoading(false);
            }
        }
    }

    const creditOptions = [
        { value: 5000, image: credit5000Img, imageClassName: 'w-[80px] h-[80px]' },
        { value: 10000, image: credit10000Img, imageClassName: 'w-[60px] h-[80px]' },
        { value: 15000, image: credit15000Img, imageClassName: 'w-[60px] h-[80px]' },
        { value: 20000, image: credit20000Img, imageClassName: 'w-[80px] h-[80px]' },
    ];

    return (
        <div className={`fixed flex items-center justify-center w-[calc(100vw-296px)] min-h-screen border-2 backdrop-blur-sm font-[Pretendard]`}>
            <div className="flex flex-col justify-center items-center w-[700px] h-[450px] bg-custom-white backdrop-blur rounded-[10px] border border-custom-grey">
                <button className="flex justify-end w-full" onClick={onCloseModal}><MdClose className='w-[20px] h-[20px] mr-[10px]'/></button>
                <div className='flex flex-col w-full h-[400px] justify-center items-center mt-[-10px]'>
                    <div className="w-full flex flex-wrap gap-[20px] h-full items-center justify-center">
                        {creditOptions.map((option) => (
                            <div
                                key={option.value}
                                className={`flex flex-col justify-center items-center gap-[30px] bg-custom-white w-[150px] h-[80%] border-[1px] border-custom-grey rounded-[10px] !text-black text-[18px] font-medium shadow-md ${selectedCredit === option.value ? '!bg-custom-orange border-none shadow-custom-orange' : ''}`}
                                onClick={() => handleButtonClick(option.value)}
                                image={option.image}
                            >{option.value} credit
                            <img src={option.image} className={option.imageClassName} alt={`${option.value} credit`} />
                            </div>
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
                                <span>{isNaN(currentCredit + selectedCredit) ? '0' : (currentCredit + selectedCredit)}</span>
                            </div>
                        </div>
                        <div className="flex items-end w-[30%] h-full">
                            <Button label={isLoading ? "충전중..." : "충전하기"} onClick={handleCharge} disabled={isLoading}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChargeModal;
