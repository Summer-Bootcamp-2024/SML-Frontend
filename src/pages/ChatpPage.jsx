import Sidebar from '../components/Sidebar';
import Chat from '../components/chat/Chat';
import ChatRoom from '../components/chat/ChatRoom';
import axios from 'axios';
import { useApiUrlStore } from '../store/store';


function ChatPage() {
    const {apiUrl} = useApiUrlStore()
  
//일촌요청 전송
const postFriend = async (ProfileId) => {
    try {
      const response = await axios.post(`${apiUrl}/friends/${friend_id}`, {
        withCredentials: true,
      });
      setProfileData(response.data)
      getFriendList(ProfileId)
    } catch (error) {
      console.error('Error fetching friend data:', error);
      alert('프로필 정보를 불러오지 못했습니다');
    }
  };

    
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex justify-center w-[calc(100vw-296px)] h-screen'>
            <ChatRoom className='w-[40%]'/>
            <Chat className='w-[60%]'/>
        </div>
    </div>
  );
}

export default ChatPage;
