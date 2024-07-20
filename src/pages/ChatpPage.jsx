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
        const userDetailsArray = response.data.map(item => {
          let room_user_id = 0;
          let name = null;
          let other = null;
          let user_img = null;
         
         if (user_id === item.user1_id) {
          room_user_id = item.user2_id;
          name = item.user1_name;
          other = item.user2_name;
          user_img = item.user2_image_url;
        } else {
          room_user_id = item.user1_id;
          name = item.user2_name;
          other = item.user1_name;
          user_img = item.user1_image_url; 
        }
        return {
          room_id: item.id,
          other_id: room_user_id,
          user_name: name,
          other_name: other,
          other_img: user_img, // 변수 수정
          }});
          
        setRoomData(userDetailsArray);
    } 
    else {
        console.log('채팅방이 없습니다');
    }} catch (error) {
      console.error('Error fetching friend data:', error);
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
            <Chat className='w-[60%]' selectedRoom={selectRoom} getChatRoom={getChatRoom}/>
        </div>
    </div>
  );
}

export default ChatPage;
