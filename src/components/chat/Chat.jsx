import sendimg from '../../assets/images/sendimg.png';
import axios from 'axios';
import { useApiUrlStore, useUserIdStore } from '../../store/store';
import { useEffect, useRef, useState } from 'react';

function Chat({ selectedRoom, friendstatus }) {
  const { apiUrl } = useApiUrlStore();
  const { user_id } = useUserIdStore();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [status, setStatus] = useState('pending');
  const socketRef = useRef(null);

  useEffect(() => {
    if (selectedRoom.room_id && user_id) {
      const socket = new WebSocket(`ws://localhost:8000/ws/${selectedRoom.room_id}/${user_id}`);

      socket.onopen = () => {
        console.log("WebSocket 연결이 열렸습니다");
      };

      socket.onmessage = (e) => {
        try {
          const parsedData = JSON.parse(e.data);
          let content = parsedData.content;

          if (typeof content === 'string') {
            try {
              const contentObj = JSON.parse(content);
              content = contentObj.content || content; // contentObj가 content 필드를 가질 경우 그것을 사용
            } catch (error) {
              console.error("Error parsing nested JSON:", error);
            }
          }

          const messageData = {
            ...parsedData,
            content: content,
          };
          setMessages((prevMessages) => [...prevMessages, messageData]);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      socket.onclose = () => {
        console.log('WebSocket 연결이 닫혔습니다');
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socketRef.current = socket;

      return () => {
        if (socketRef.current) {
          socketRef.current.close();
        }
      };
    }
  }, [selectedRoom.room_id, user_id]);

  const sendMessage = (messageContent) => {
    if (messageContent.trim() !== '') {
      const newMessage = {
        type: 'message',
      
          content: messageContent,
      
        client_id: user_id,
        withButton: friendstatus,
      };

      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(newMessage));
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage // 보낸 메시지를 배열에 추가
      ]);

      setInputMessage('');
    }
  };

  const getChatHistory = async () => {
    if (selectedRoom.room_id) {
      try {
        const response = await axios.get(`${apiUrl}/messages/${selectedRoom.room_id}`, {
          withCredentials: true,
        });
        console.log("기존 채팅내역:", response.data);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
        alert('채팅 내역을 가져오는데 실패했습니다');
      }
    }
  };

  const postFriendStatus = async () => {
    try {
      const response = await axios.post(`${apiUrl}/friends/${selectedRoom.user2_id}`, null, {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error posting friend request:', error);
      alert('일촌 요청에 실패했습니다');
    }
  };

  const updateFriendStatus = async () => {
    const putstatus = { status };

    try {
      const response = await axios.put(`${apiUrl}/friends/${selectedRoom.user2_id}`, putstatus, {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error updating friend status:', error);
      alert('일촌 관계 변경에 실패했습니다');
    }
  };

  const handleFriendStatusUpdate = async (newStatus) => {
    setStatus(newStatus);
    await updateFriendStatus();
    if (newStatus === 'accepted') {
      // await createChatRoom();
    }
  };

  useEffect(() => {
    getChatHistory();
    // createChatRoom();
  }, [selectedRoom.room_id]);

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
            <img className="w-[50px] h-[50px] rounded-[115px] ml-[20px]" src={selectedRoom.user_img} />
            <span className="text-[16px] font-bold ml-[10px]">{selectedRoom.user_name}</span>
            <button className="text-[14px] font-semibold text-custom-blue ml-auto mr-[20px]" onClick={postFriendStatus}>
              일촌 요청
            </button>
          </div>
          <div className="flex flex-col justify-end w-full h-[440px] overflow-y-auto p-[10px]">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-center w-full my-[4px] ${message.client_id === user_id ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-center max-w-[80%] p-[10px] ${message.client_id === user_id ? 'bg-custom-blue text-custom-white' : 'bg-custom-white text-black'} rounded-[20px] text-[16px]`}>
                  {message.content}
                  {message.withButton && (
                    <div>
                      <button
                        className='w-[80px] h-[35px] bg-custom-white rounded-[10px] mr-[20px] border-[1px] border-custom-grey'
                        onClick={() => handleFriendStatusUpdate('accepted')}
                      >
                        수락
                      </button>
                      <button
                        className='w-[80px] h-[35px] bg-custom-white rounded-[10px] border-[1px] border-custom-grey'
                        onClick={() => handleFriendStatusUpdate('rejected')}
                      >
                        거절
                      </button>
                    </div>
                  )}
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
