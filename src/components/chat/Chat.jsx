import sendimg from '../../assets/images/sendimg.png';
import profileimg from '../../assets/images/myprofile/profileImg.png';
import axios from 'axios';
import { useApiUrlStore, useUserIdStore} from '../../store/store';
import { useEffect, useRef, useState } from 'react';


function Chat({ selectedRoom, getChatRoom, onOpenGiftCreditModal, onOpenFriendRequesttModal, onOpenIntroduceFriendModal }) {
  const { apiUrl } = useApiUrlStore();
  const { user_id } = useUserIdStore();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [targetName, setTargetName] = useState('')
  const [chatuserData, setChatUserData] = useState('')
  const [nickName, setNickName] = useState('')
  const [introduceData, setIntroduceData] = useState([])
  const [statusModal, setStatusModal] = useState(false)
  const [status, setStatus] = useState('pending');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);


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

  // 채팅방 데이터 조회
    const fetchChatRoom = async () => {
      try {
        const response = await axios.get(`${apiUrl}/chatrooms/${user_id}`, {
          withCredentials: true,
        });
        const chatRoomData = response.data.find(item => item.id === selectedRoom.room_id);
        if (chatRoomData) {
          setChatUserData(chatRoomData);
        } else {
          console.log('선택된 채팅방 데이터가 없습니다.');
        }
      } catch (error) {
        console.error('Error fetching chat room data:', error);
      }
    };

    useEffect(() => {
        fetchChatRoom();
    }, [selectedRoom.room_id]);


   // 소개하기 조회
   const getIntroduceUser = async () => {
    try {
      let response;
      let matchedIntroduceData;
      console.log(chatuserData)
      if (user_id === chatuserData.user1_id) {
        response = await axios.get(`${apiUrl}/introduction_request/${chatuserData.user2_id}`, {
          withCredentials: true,
        });
  
        const introduceDataList = response.data;
        // selectedRoom.other_id와 intermediary_user_id가 같은 객체만 필터링
        matchedIntroduceData = introduceDataList.find(data =>
          data.intermediary_user_id === chatuserData.user2_id && data.status === "pending"
        );
      } else {
        response = await axios.get(`${apiUrl}/introduction_request/${user_id}`, {
          withCredentials: true,
        });
  
        const introduceDataList = response.data;
  
        // user_id와 intermediary_user_id가 같은 객체만 필터링
        matchedIntroduceData = introduceDataList.find(data =>
          data.intermediary_user_id === user_id && data.status === "pending"
        );
      }
  
      if (matchedIntroduceData) {
        setIntroduceData(matchedIntroduceData);
        console.log("소개요청 성공", matchedIntroduceData);
      } else {
        console.log('소개 요청이 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('소개요청 실패:', error);
    }
  };
  
  useEffect(()=>{
    getIntroduceUser()
  },[selectedRoom.room_id])



  // 사용자 닉네임 조회
  const getNickName = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users/${selectedRoom.other_id}`, {
        withCredentials: true,
      });
      setNickName(response.data.name);
    } catch (error) {
      console.error('Error fetching nickname:', error);
    }
  };

// 타겟 사용자 닉네임 조회
  const getTargetNickName = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users/${introduceData.target_user_id}`, {
        withCredentials: true,
      });
      setTargetName(response.data.name);
    } catch (error) {
      console.error('Error fetching target nickname:', error);
    }
  };

// 프로필 조회 함수 수정
  const getProfileData = async () => {
    if (selectedRoom.other_id) {
      await getNickName(); // selectedRoom.other_id의 닉네임 조회
    }

    if (introduceData.target_user_id) {
      await getTargetNickName(); // introduceData.target_user_id의 닉네임 조회
    }
  };

  useEffect(() => {
    getIntroduceUser();
  }, [selectedRoom.room_id, user_id]);

  useEffect(() => {
    getProfileData(); // 프로필 데이터 조회
  }, [selectedRoom, introduceData]);



  useEffect(() => {
    if (selectedRoom.room_id && user_id) {
      const socket = new WebSocket(`ws://sml-m.site/ws/${selectedRoom.room_id}/${user_id}`);

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
        console.log(introduceData)
        //기존 채팅 내역이 없고 user_id가 introduceData.user_id와 동일한 경우
        if (parsedMessages.length === 0 && user_id === introduceData.user_id) {
          sendMessage(`${selectedRoom.user_name}님께서 ${targetName}님을 소개받기 원합니다!`);
          sendMessage("소개요청 버튼을 눌러서 지인을 소개 해보세요!");
        }
        
      } catch (error) {
        console.error('Error fetching chat history:', error);
        alert('채팅 내역을 가져오는데 실패했습니다');
      }
    }
  };

  useEffect(() => {
    getChatHistory(); 
  }, [selectedRoom.room_id]);
  

   // BC채팅방 생성
   const createBCChatRoom = async () => {
    const creatroomid = {
      user1_id: user_id,
      user2_id: introduceData.target_user_id,
    };
    try {
      const response = await axios.post(`${apiUrl}/chatrooms/`, creatroomid, {
        withCredentials: true,
      });
      console.log(user_id);
      getChatRoom();
    } catch (error) {
      console.error('Error creating BC chat room:', error);
      console.log("채팅방을 만들지 못했습니다");
    }
  };

  // CA채팅방 생성
  const createCAChatRoom = async () => {
    const creatroomid = {
      user1_id: introduceData.user_id,
      user2_id: introduceData.target_user_id,
    };
    try {
      const response = await axios.post(`${apiUrl}/chatrooms/`, creatroomid, {
        withCredentials: true,
      });
      getChatRoom();
    } catch (error) {
      console.error('Error creating CA chat room:', error);
      console.log("채팅방을 만들지 못했습니다");
    }
  };

  // 소개요청 버튼 클릭
  const handleClicked = async () => {
    onOpenIntroduceFriendModal()
    if (selectedRoom.other_id === introduceData.user_id) {
      createBCChatRoom();
    } else if (selectedRoom.other_id === introduceData.target_user_id) {
      createCAChatRoom();
      }
  };

  
  //일촌요청
  const postFriendStatus = async () => {
    sendMessage(`${selectedRoom.user_name}님께서 ${selectedRoom.other_name}님에게 일촌을 신청했습니다!`);
    const postfriendId = {
      user_id: user_id
    }
    try {
      const response = await axios.post(`${apiUrl}/friends/${selectedRoom.other_id}`, postfriendId, {
        withCredentials: true,
      });

    } catch (error) {
      console.error('Error posting friend request:', error);
      alert('일촌 요청에 실패했습니다');
    }
  };

  // 일촌 상태 업데이트 
  const handleFriendStatusUpdate = async () => {
    onOpenFriendRequesttModal()
    if(status==="accepted"){
      sendMessage('일촌이 됐어요!');
    }
  };


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage(inputMessage);
    }
  };

  const handleFriendRequest = () => {
    postFriendStatus();
    onOpenGiftCreditModal();
  }

//일촌요청받기 버튼 확인 후 수정
  return (
    <div className="flex items-center justify-center w-[60%] h-screen ml-[-30px] bg-white font-[Pretendard]">
      <div className="w-[650px] h-[600px] border-2 border-custom-grey rounded-[10px] flex items-center justify-center bg-white shadow-lg">
        <div className="flex flex-col justify-center w-[90%] h-full">
          <div className="flex items-center justify-between w-full h-[80px] mt-[10px] border-2">
            <div className='flex items-center w-[300px]'>
              <img className="w-[50px] h-[50px] rounded-[115px] ml-[20px] border-2 border-custom-indigo" src={selectedRoom.other_img} />
              <span className="text-[16px] font-bold ml-[15px]">{nickName}</span>
            </div>
            <div className=''>
              {user_id === introduceData.intermediary_user_id ? (
                <button className="text-[14px] font-semibold text-custom-blue ml-auto mr-[20px]" onClick={handleClicked}>
                  소개 요청
                </button>) : null
              }
              {user_id === chatuserData.user2_id ? (
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
