import { useEffect, useState } from "react";
import Button from "../Button";
import { useApiUrlStore, useUserIdStore } from "../../store/store";
import axios from "axios";
import { MdClose } from "react-icons/md"; 
import { useNavigate } from "react-router-dom";

function IntroduceFriendModal({ onClose, friendName, friendId}) {
  const navigate = useNavigate();
  const {apiUrl} = useApiUrlStore()
  const {user_id} = useUserIdStore()

  const handleClicked = async (confirmed) => {
    const status = confirmed ? 'accepted' : 'rejected';

    await updateIntroduceStatus(status);

    onClose();
    navigate('/chat');
  };


  // 소개요청 status 수정
  const updateIntroduceStatus = async (status) => {
    const introducestatus = {
      status: status,
    };
    try {
      const response = await axios.put(`${apiUrl}/introduction_request/13`, introducestatus, {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error updating introduce status:', error);
    }
  };

  return (
    <div className={`fixed top-0 flex items-center justify-center w-[calc(100vw-296px)] min-h-screen border-2 bg-white/50 backdrop-blur-md`}>
      <div className="flex flex-col items-center justify-center w-[400px] h-[200px] bg-custom-white rounded-[10px] border-[1px] border-custom-grey">
      <button className="flex justify-end w-full" onClick={onClose}><MdClose className='w-[20px] h-[20px] mr-[20px]' /></button>
        <div className='flex flex-col items-center p-[20px]'>
          <div className='text-[20px] font-black mb-[30px]'>
            '{friendName}' 님 소개하기를 진행할까요?
          </div>
          <div className="flex gap-[40px]">
            <Button label={"확인"} onClick={() => handleClicked(true)} />
            <Button label={"거절"} onClick={() => handleClicked(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroduceFriendModal;
