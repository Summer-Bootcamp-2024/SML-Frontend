import { useEffect, useState } from "react";
import Button from "../Button";
import ChargeModal from "./ChargeModal";
import { MdClose } from "react-icons/md"; 
import { useApiUrlStore, useUserIdStore } from "../../store/store";
import axios from "axios";

function GiftCreditModal({ onClose, friendId, targetUserId }) {
    const { apiUrl } = useApiUrlStore();
    const { user_id } = useUserIdStore();
    const [chargeModalOpen, setChargeModalOpen] = useState(false);
    const [currentCredit, setCurrentCredit] = useState(0);
    const [giftCredit, setGiftCredit] = useState('');

    const toggleChargeModal = () => {
        setChargeModalOpen(prev => !prev);
    }  
    
    const handleGiftInputChange = (e) => {
        setGiftCredit(e.target.value);
    }

    const getCredit = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users/${user_id}`, {
                withCredentials: true,
            });
            setCurrentCredit(response.data.credit);
        } catch (err) {
            window.alert('크레딧 조회 실패');
        }
            
      }

    useEffect(() => {
        getCredit();
    }, []);

    const updateCredit = (addedCredit) => {
        setCurrentCredit((prevCredit) => prevCredit + addedCredit);
        toggleChargeModal();
    }

    const handleGiftSubmit = async (e) => {
        e.preventDefault();
        if (parseInt(giftCredit) > currentCredit) {
            alert("선물할 크레딧이 현재 보유 크레딧보다 많습니다.");
        }
        else {
            try {
                const response = await axios.post(`${apiUrl}/gifts`, {
                    user_id: user_id,
                    friend_id: targetUserId,
                    ct_money: parseInt(giftCredit),
                });
                window.alert('크레딧 선물 성공');
                onClose();
            } catch (err) {
                console.log(friendId);
                console.log(targetUserId);
                window.alert('크레딧 선물 실패');
                console.log(err);
            }
        }
    }
    
    return (
        <div className={`fixed top-0 flex items-center justify-center w-[calc(100vw-296px)] min-h-screen border-2 bg-white/50 backdrop-blur-md`}>
            <div className=" flex flex-col items-center justify-center w-[500px] h-[300px] bg-custom-white rounded-[10px] border-[1px] border-custom-grey">
            <button className="flex justify-end w-[90%]" onClick={onClose}><MdClose className='w-[20px] h-[20px] mr-[10px] '/></button>
                <div className='flex flex-col items-center p-[20px]'>
                    <div className='text-[20px] font-black mb-[10px]'>상대방에게 선물할 크레딧을 입력하세요!</div>
                    <div className='w-[400px] flex flex-col items-center'>
                        <div className='flex items-center justify-between w-[90%]'>
                            <div className='flex justify-center w-full text-custom-grey text-[15px]'>
                                <span>현재 보유 크레딧 {currentCredit} credit</span>
                            </div>
                        </div>
                        <form onSubmit={handleGiftSubmit}>
                            <div className='flex w-[80%] h-[80px] gap-[10px] justify-center items-center'>
                                <input 
                                type="text" 
                                className="pl-[10px] border-b border-black bg-custom-white" 
                                value={giftCredit}
                                onChange={handleGiftInputChange}
                                required
                                />
                                <span className="font-black">credit</span>
                            </div>
                            <div className="flex gap-[40px]">
                                <Button label={"선물하기"} type="submit"/>
                                <Button label={"충전하기"} onClick={toggleChargeModal}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {chargeModalOpen && (
                <ChargeModal onCloseModal={() => setChargeModalOpen(false)} currentCredit={currentCredit} onUpdateCredit={updateCredit}/>
            )}
        </div>
    )
}

export default GiftCreditModal;