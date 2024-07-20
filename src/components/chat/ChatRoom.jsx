import profileImg from '../../assets/images/myprofile/profileImg.png'
import axios from 'axios';
import { useState } from 'react';
import { useApiUrlStore, useUserIdStore } from '../../store/store';

function ChatRoom({roomListData, onChatRoomClick}) {
    const{apiUrl} = useApiUrlStore()
    const {user_id} = useUserIdStore()
    const [friendstatus, _setFriendStatus] = useState(false);

      {/*
  // 소개 요청 전송
  const postFriendStatus = async () => {
    try {
      const response = await axios.post(`${apiUrl}/friends/${selectedRoom.user2_id}`, { user_id }, {
        withCredentials: true,
      });
      console.log(response.data);


      // 채팅방 클릭 시 소개요청 채팅 자동으로 전송
      sendMessage(`${user_id}님께서 ${selectedRoom.user2_name}님을 소개받기 원합니다!`);

    } catch (error) {
      console.error('Error fetching friend data:', error);
      alert('일촌요청에 실패했습니다');
    }
  };


  */}
  
  return (
        <div className='flex items-center justify-center w-[40%] mr-[-30px] h-screen bg-white'>
            <div className='w-[350px] h-[600px] border-2 border-custom-grey rounded-[10px] flex justify-center items-center overflow-y-auto shadow-lg'>
                <div className='flex flex-col  w-[90%] h-[90%]'>
                    {roomListData.map((room) => (
                    <div key={room.room_id} className='flex items-center w-full h-[60px] border-b-[1px] my-[5px] border-custom-grey'
                    onClick={()=>onChatRoomClick(room.room_id)}
                    friendstatus={friendstatus}>
                      <img className="w-[50px] h-[50px] rounded-[115px] ml-[20px]" src={profileImg}/>
                      <span className='text-[16px] font-bold ml-[15px]'>{room.other_name}</span>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;
