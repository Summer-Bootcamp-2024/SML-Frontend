import React from 'react';
import Button from "../Button.jsx";
import { MdClose } from "react-icons/md"; 
import { useUserIdStore,useApiUrlStore } from '../../store/store.js'
import { useNavigate } from "react-router-dom";
import axios from "axios";


function FriendRequestModal({ onClose, friendName, friendId}) {
    const navigate = useNavigate();
    const { user_id } = useUserIdStore()
    const {apiUrl} = useApiUrlStore()
    
    const handleClicked = async (confirmed) => {
        const status = confirmed ? 'accepted' : 'rejected';
    
        await updateFriendStatus(status);
    
        onClose();
        navigate('/chat');
      };

     //일촌관계수정
  const updateFriendStatus = async (status) => {
    const putstatus = {
      user_id: friendId,
      status: status,
    };
    try {
      await axios.put(`${apiUrl}/friends/${user_id}`, putstatus, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Error updating friend status:', error);
    }
  };
  
    return (
        <div className={`fixed top-0 flex items-center justify-center w-[calc(100vw-296px)] min-h-screen border-2 bg-white/50 backdrop-blur-sm`}>
            <div className="flex flex-col items-center justify-center w-[450px] h-[230px] bg-custom-white rounded-[10px] border-[1px] border-custom-grey">
            <button className="flex justify-end w-full" onClick={onClose}><MdClose className='w-[20px] h-[20px] mr-[20px]' /></button>
                <div className='flex flex-col items-center p-[20px]'>
                    <div className='text-[20px] font-black mt-[-10px]'>'{friendName}' 님의 일촌 신청을 받으시겠어요?</div>
                    <div className='text-[14px] text-custom-grey mb-[30px]'>일촌이 되면 크레딧을 선물 받아요!</div> 
                    <div className='flex flex-col items-center'>
                        <div className="flex gap-[40px]">
                            <Button label={"확인"} onClick={() => handleClicked(true)} />
                            <Button label={"거절"} onClick={() => handleClicked(false)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FriendRequestModal;
