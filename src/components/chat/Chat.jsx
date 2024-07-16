import profileImg from '../../assets/images/myprofile/profileImg.png';
import sendimg from '../../assets/images/sendimg.png';
import axios from 'axios';
import { useApiUrlStore } from '../../store/store';
import { useState, useEffect } from 'react';

function Chat() {
  const { apiUrl } = useApiUrlStore();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        content: inputMessage,
        sender: 'user',
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage('');
    }
  };

  useEffect(() => {
    
  }, [messages]);

  // 엔터 키를 누르면 메시지 전송
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  // 일촌요청 전송
  const postFriendStatus = async () => {
    try {
      await axios.post(`${apiUrl}/friends/${friend_id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Error fetching friend data:', error);
      alert('일촌요청에 실패했습니다');
    }
  };

  return (
    <div className="flex items-center justify-center w-[60%] h-screen ml-[-30px] bg-white">
      <div className="w-[650px] h-[600px] border-2 border-custom-grey rounded-[10px] flex items-center justify-center bg-white shadow-lg">
        <div className="flex flex-col justify-center w-[90%] h-full">
          <div className="flex items-center w-full h-[80px] border-b-[1px] border-custom-grey">
            <img className="w-[40px] h-[40px] rounded-[115px] ml-[20px]" src={profileImg} alt="Profile"/>
            <span className="text-[16px] font-bold ml-[10px]">김대희</span>
            <button className="text-[14px] font-semibold text-custom-blue ml-auto mr-[20px]" onClick={postFriendStatus}>일촌 요청</button>
          </div>
          <div className="flex flex-col justify-end w-full h-[440px] overflow-y-auto p-[10px]">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-center w-full my-[4px] ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-center max-w-[80%] p-[10px] ${message.sender === 'user' ? 'bg-custom-blue text-custom-white' : 'bg-custom-white text-black'} rounded-[20px] text-[16px]`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div> 
          <div className="flex items-center justify-start w-full h-[80px] border-t-[1px] border-custom-grey">
            <input
              className="w-[480px] h-[50px] border-[1px] border-custom-grey rounded-[20px] bg-custom-white indent-[20px]"
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage} className="ml-[30px]">
              <img src={sendimg} className="w-[50px] h-[50px]" alt="Send"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
