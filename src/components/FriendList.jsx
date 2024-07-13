import React, { useState } from 'react';
import ProfileModal from './ProfileModal';

function FriendList() {

  const [stausModalOpen, setStatusModalOpen] = useState(false)

  const PostingOpenModal = () => {
    setStatusModalOpen(true)
  }
  const PostingClosedModal = () => {
    setStatusModalOpen(false)
  }

  return (
    <div className="w-full h-[550px] flex justify-center items-center">
      <div className="w-[650px] h-[500px] bg-custom-white rounded-[10px] overflow-y-auto">
        <div className="flex flex-col justify-center items-center mt-[20px]">
          {[...Array(10)].map((_, index) => (
            <div className="w-[600px] min-h-[60px] flex justify-center items-center cursor-pointer" key={index} onClick={PostingOpenModal}>
              <div className="flex items-center justify-between w-[500px] p-[10px] border-b-[1px] border-custom-grey">
                <div className="text-[16px] h-[24px] font-semibold ">김대희</div>
                <div className="flex items-center justify-center w-[350px] p-[5px]">
                  <div className="text-[16px] mr-[10px]">백엔드 개발자</div>
                  <div className="text-[16px] mr-[10px]">실리콘밸리</div>
                  <div className="text-[16px] mr-[10px]">서울시 중구</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {stausModalOpen && (
        <ProfileModal PostingClosedModal={PostingClosedModal}/>
      )}
    </div>
    
  );
}

export default FriendList;
