import Sidebar from '../components/Sidebar';
import Chat from '../components/chat/Chat';
import ChatRoom from '../components/chat/ChatRoom';
import axios from 'axios';
import { useApiUrlStore, useUserIdStore } from '../store/store';
import { useEffect, useState } from 'react';


function ChatPage() {
    const {apiUrl} = useApiUrlStore()
    const {user_id} = useUserIdStore()
    const [roomData, setRoomData] = useState([])
    const [selectRoom, setSelectRoom] = useState([])
    
    
//채팅방 조회
const getChatRoom = async () => {
    try {
      const response = await axios.get(`${apiUrl}/chatrooms/${user_id}`, {
        withCredentials: true,
      });
      if (response.data.length>0) {
        const userDetailsArray = response.data.map(item => ({
          room_id : item.id,
          user2_id: item.user2_id,
          user2_name: item.user2_name,
          user2_img: item.user2_image_url,
        }));
        setRoomData(userDetailsArray);
    } 
    else {
        console.log('채팅방이 없습니다');
    }} catch (error) {
      console.error('Error fetching friend data:', error);
      alert('채팅방을 불러오지 못했습니다');
    }
  };

  const handleChatRoomClick = (roomId) => {
    const selected = roomData.find(room => room.room_id === roomId);
    setSelectRoom(selected);
  };
  
  useEffect(() => {
    getChatRoom()
  }, [])

    
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex justify-center w-[calc(100vw-296px)] h-screen'>
            <ChatRoom className='w-[40%]' roomListData={roomData} onChatRoomClick={handleChatRoomClick}/>
            <Chat className='w-[60%]' selectedRoom={selectRoom}/>
        </div>
    </div>
  );
}

export default ChatPage;
