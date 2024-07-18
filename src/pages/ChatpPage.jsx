import Sidebar from '../components/Sidebar';
import Chat from '../components/chat/Chat';
import ChatRoom from '../components/chat/ChatRoom';
import axios from 'axios';
import { useApiUrlStore, useUserIdStore } from '../store/store';
import { useEffect, useState } from 'react';


function ChatPage() {
    const {apiUrl} = useApiUrlStore()
    const {user_id} = useUserIdStore()
    const [user2_id, setUser2_Id] = useState([])
    const [user2_name, setUser2_Name] = useState([])
    
//채팅방 조회
const getChatRoom = async () => {
    try {
      const response = await axios.get(`${apiUrl}/chatrooms/${user_id}`, {
        withCredentials: true,
      });
      console.log(response.data)
      
      if(response.data.length>0){
      const ids = response.data.map(friend => friend.user2_id);
      const names = response.data.map(friend => friend.user2_name);
      setUser2_Id(ids);
      setUser2_Name(names);
    } 
    else {
        console.log('채팅방이 없습니다');
    }} catch (error) {
      console.error('Error fetching friend data:', error);
      alert('채팅방을 불러오지 못했습니다');
    }
  };
  
  useEffect(() => {
    getChatRoom()
  }, [])

    
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex justify-center w-[calc(100vw-296px)] h-screen'>
            <ChatRoom className='w-[40%]'
            user2_id={user2_id}
            user2_name={user2_name}/>
            <Chat className='w-[60%]'/>
        </div>
    </div>
  );
}

export default ChatPage;
