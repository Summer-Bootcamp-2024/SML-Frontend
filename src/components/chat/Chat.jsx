import sendimg from '../../assets/images/sendimg.png';
import profileimg from '../../assets/images/myprofile/profileImg.png';
import axios from 'axios';
import { useApiUrlStore, useUserIdStore } from '../../store/store';
import { useEffect, useRef, useState } from 'react';

function Chat({ selectedRoom, getChatRoom, onOpenCreditModal }) {
  const { apiUrl } = useApiUrlStore();
  const { user_id } = useUserIdStore();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [status, setStatus] = useState('pending');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null); // Ref to track the end of messages list

  //이중 JSON 파싱
  const parseContent = (content) => {
    if (typeof content === 'string') {
      try {
        const contentObj = JSON.parse(content);
        return contentObj.content || content; // contentObj가 content 필드를 가질 경우 그것을 사용
      } catch (error) {
        console.error("Error parsing nested JSON:", error);
        return content;
      }
    }
    return content;
  };

  useEffect(() => {
    if (selectedRoom.room_id && user_id) {
      const socket = new WebSocket(`ws://localhost:8000/ws/${selectedRoom.room_id}/${user_id}`);

      socket.onopen = () => {
        console.log("WebSocket Connected");
      };

      //내역조회
      socket.onmessage = (e) => {
        try {
          const parsedData = JSON.parse(e.data);
          const messageData = {
            ...parsedData,
            content: parseContent(parsedData.content),
          };
          setMessages((prevMessages) => [...prevMessages, messageData]);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      socket.onclose = () => {
        console.log('WebSocket Closed');
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

  //무한스크롤 구현
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  //채팅 전송
  const sendMessage = (messageContent) => {
    if (messageContent.trim() !== '') {
      const newMessage = {
        type: 'message',
        content: messageContent,
        sender_id: user_id,
      };

      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(newMessage));
      }
      setInputMessage('');
    }
  };

  //기존 채팅 내역 조회
  const getChatHistory = async () => {
    if (selectedRoom.room_id) {
      try {
        const response = await axios.get(`${apiUrl}/messages/${selectedRoom.room_id}`, {
          withCredentials: true,
        });
        const parsedMessages = response.data.map((msg) => ({
          ...msg,
          content: parseContent(msg.content),
        }));
        setMessages(parsedMessages)

        //기존 채팅 내역이 없고 user_id가 A와 동일할 경우
        if (parsedMessages.length === 0 && user_id === 1) {
          sendMessage(`${selectedRoom.user_name}님께서 ${selectedRoom.other_name}님을 소개받기 원합니다!`);
          sendMessage("소개요청 버튼을 눌러서 지인을 소개 해보세요!")
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
        alert('채팅 내역을 가져오는데 실패했습니다');
      }
    }
  };

  useEffect(() => {
    getChatHistory();
    // createChatRoom();
  }, [selectedRoom.room_id]);

  //BC채팅방 생성
  const createBCChatRoom = async () => {
    const creatroomid = {
      user1_id: 2,
      user2_id: 3
    };
    try {
      const response = await axios.post(`${apiUrl}/chatrooms/`, creatroomid, {
        withCredentials: true,
      });
      getChatRoom()
      console.log(response.data);
    } catch (error) {
      console.error('Error updating friend status:', error);
      console.log("채팅방을 만들지 못했습니다");
    }
  };

  //CA채팅방 생성
  const createCAChatRoom = async () => {
    const creatroomid = {
      user1_id: 1,
      user2_id: 3
    };
    try {
      const response = await axios.post(`${apiUrl}/chatrooms/`, creatroomid, {
        withCredentials: true,
      });
      getChatRoom()
      console.log(response.data);
    } catch (error) {
      console.error('Error updating friend status:', error);
      console.log("채팅방을 만들지 못했습니다");
    }
  };

  //소개요청 버튼 클릭
  const handleClicked = () => {
    const userConfirmed = window.confirm(`${selectedRoom.user2_id} 소개하기를 진행할까요? \n보답으로 소정의 크레딧을 드려요 (확인:수락 취소:거절)`)
    if (userConfirmed) { //확인 눌렀을 경우
      createBCChatRoom() // 채팅방 생성
    } else {
      setStatus("rejected") //취소 눌렀을 경우 
      updateIntroduceStatus() //status rejected 전달
    }
  }

  //소개요청 status 수정
  const updateIntroduceStatus = async () => {
    const introducestatus = {
      status: status
    };
    try {
      const request_id = 1;
      const response = await axios.put(`${apiUrl}/introduction_request/${request_id}`, introducestatus, {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error updating friend status:', error);
      alert('소개요청에 실패했습니다')
    }
  };

  //일촌요청
  const postFriendStatus = async () => {
    sendMessage(`${selectedRoom.user_name}님께서 ${selectedRoom.other_name}님을 일촌을 신청했습니다!`);
    const postfriendId = {
      user_id: user_id
    }
    try {
      const friend_id = 1;
      const response = await axios.post(`${apiUrl}/friends/${friend_id}`, postfriendId, {
        withCredentials: true,
      });
      console.log(response.data);

    } catch (error) {
      console.error('Error posting friend request:', error);
      alert('일촌 요청에 실패했습니다');
    }
  };

  //일촌status변경
  const handleFriendStatusUpdate = async (newStatus) => {
    const friendConfirmed = window.confirm(`${selectedRoom.user2_id} 일촌 신청을 받으시겠어요? \n일촌이 되면 크레딧을 선물 받아요 (확인:수락 취소:거절)`)
    if (friendConfirmed) { //확인 눌렀을 경우
      setStatus("accepted")
      updateFriendStatus(status) // 일촌 status변경
    } else {
      setStatus("rejected") //취소 눌렀을 경우 
      updateFriendStatus(status) //status rejected 전달
    }
  };

  //일촌관계수정
  const updateFriendStatus = async (status) => {
    const putstatus = {
      user_id: 1,
      status: status,
    };
    const friend_id =3;
    try {
      const response = await axios.put(`${apiUrl}/friends/${friend_id}`, putstatus, {
        withCredentials: true,
      });
      sendMessage('일촌이 됐어요!');
      console.log(response.data);
    } catch (error) {
      console.error('Error updating friend status:', error);
      alert('일촌관계 수정에 실패했습니다')
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage(inputMessage);
    }
  };

  const handleFriendRequest = () => {
    postFriendStatus();
    onOpenCreditModal();
  }

  return (
    <div className="flex items-center justify-center w-[60%] h-screen ml-[-30px] bg-white font-[Pretendard]">
      <div className="w-[650px] h-[600px] border-2 border-custom-grey rounded-[10px] flex items-center justify-center bg-white shadow-lg">
        <div className="flex flex-col justify-center w-[90%] h-full">
          <div className="flex items-center justify-between w-full h-[80px] mt-[10px]">
            <img className="w-[50px] h-[50px] rounded-[115px] ml-[20px] border-2 border-custom-indigo" src={profileimg} />
            <span className="text-[16px] font-bold ml-[10px]">{selectedRoom.other_name}</span>
            <div className=''>
              {user_id != 1 ? (
                <button className="text-[14px] font-semibold text-custom-blue ml-auto mr-[20px]" onClick={handleClicked}>
                  소개 요청
                </button>) : null
              }
              {user_id === 3 ? (
                 <button className="text-[14px] font-semibold text-custom-blue ml-auto mr-[20px]" onClick={handleFriendStatusUpdate}>
                 일촌요청 받기
               </button>
              ) :(
              <button className="text-[14px] font-semibold text-custom-blue ml-auto mr-[20px]" onClick={handleFriendRequest}>
                일촌 요청
              </button>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full h-[440px] overflow-y-auto border-2 p-[10px]">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-center w-full my-[8px] ${message.sender_id === user_id ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex flex-col justify-center items-center max-w-[80%] p-[10px] ${message.sender_id === user_id ? 'bg-custom-blue text-custom-white' : 'bg-custom-white text-black'} rounded-[20px] text-[16px]`}>
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
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
