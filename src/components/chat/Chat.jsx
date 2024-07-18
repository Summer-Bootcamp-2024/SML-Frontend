import sendimg from '../../assets/images/sendimg.png';
import axios from 'axios';
import { useApiUrlStore, useUserIdStore } from '../../store/store';
import { useEffect, useState } from 'react';

function Chat({ selectedRoom }) {
  const { apiUrl } = useApiUrlStore();
  const { user_id } = useUserIdStore();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [status, setStatus] = ('pending')
  const [friendstatus, setFriendStatus] = useState(false);

  // 채팅 전송
  const sendMessage = (messageContent) => {
    if (messageContent.trim() !== '') {
      const newMessage = {
        content: messageContent,
        sender: 'user',
        withButton: friendstatus, // 버튼이 필요한 경우 true로 설정
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage('');
    }
  };


  // 일촌 요청 전송
  const postFriendStatus = async () => {
    try {
      const response = await axios.get(`${apiUrl}/friends/${selectedRoom.room_id}`, {
        withCredentials: true,
      });
      console.log(response.data);
      setMessages(responsed.data)
    } catch (error) {
      console.error('Error fetching friend data:', error);
      alert('일촌요청에 실패했습니다');
    }
  };

  // 일촌 상태 변경
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  }

  // 일촌요청 수락/거절
  const updateFriendStatus = async () => {
    const putstatus = { status };

    try {
      const response = await axios.put(`${apiUrl}/friends/${friend_id}`, putstatus, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Error fetching friend data:', error);
      alert('일촌관계 변경을 실패했습니다');
    }
  };

  {/*
    // 수락요청 수락/거절
  const updateFriendStatus = async () => {
    const putstatus = { status };

    try {
      const response = await axios.put(`${apiUrl}/friends/${friend_id}`, putstatus, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Error fetching friend data:', error);
      alert('일촌관계 변경을 실패했습니다');
    }
  };
  */}

  //채팅 내역 조회
  const getChatHistory = async () => {
    try {
      const response = await axios.put(`${apiUrl}/messages/${selectedRoom.user2_id}`, putstatus, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Error fetching friend data:', error);
      alert('일촌관계 변경을 실패했습니다');
    }
  }

    useEffect(()=> {
      getChatHistory()
    }, [])

  // 엔터 키를 누르면 메시지 전송
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage(inputMessage);
    }
  };



  return (
    <div className="flex items-center justify-center w-[60%] h-screen ml-[-30px] bg-white">
      <div className="w-[650px] h-[600px] border-2 border-custom-grey rounded-[10px] flex items-center justify-center bg-white shadow-lg">
        <div className="flex flex-col justify-center w-[90%] h-full">
          <div className="flex items-center w-full h-[80px] border-b-[1px] mt-[10px] border-custom-grey">
            <img className="w-[50px] h-[50px] rounded-[115px] ml-[20px]" src={selectedRoom.user2_img}/>
            <span className="text-[16px] font-bold ml-[10px]">{selectedRoom.user2_name}</span>
            {!friendstatus && (
              <button className="text-[14px] font-semibold text-custom-blue ml-auto mr-[20px]" onClick={postFriendStatus}>일촌 요청</button>
            )}
          </div>
          <div className="flex flex-col justify-end w-full h-[440px] overflow-y-auto p-[10px]">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-center w-full my-[4px] ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-center max-w-[80%] p-[10px] ${message.sender === 'user' ? 'bg-custom-blue text-custom-white' : 'bg-custom-white text-black'} rounded-[20px] text-[16px]`}>
                  {message.content}
                  {message.withButton &&
                    <>
                      <button
                        className='w-[80px] h-[35px] bg-custom-white rounded-[10px] mr-[20px] border-[1px] border-custom-grey'
                        onClick={() => { handleStatusChange('accepted'); updateFriendStatus(); }}>수락</button>
                      <button
                        className='w-[80px] h-[35px] bg-custom-white rounded-[10px] border-[1px] border-custom-grey'
                        onClick={() => { handleStatusChange('rejected'); updateFriendStatus(); }}>거절</button>
                    </>
                  }
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
            <button onClick={() => sendMessage(inputMessage)} className="ml-[30px]">
              <img src={sendimg} className="w-[50px] h-[50px]" alt="Send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
