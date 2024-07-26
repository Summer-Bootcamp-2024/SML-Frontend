import { useEffect, useState } from "react";
import Button from "../Button";
import { useApiUrlStore, useUserIdStore } from "../../store/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//프로핆 모달에서 소개받기 버튼을 누르면 나오는 모달창
function GettingIntroduceModal({ onCloseModal, friendId, ProfileId }) {
    const { apiUrl } = useApiUrlStore();
    const { user_id } = useUserIdStore();
    const [nickName, setNickName] = useState('');
    const navigate = useNavigate();


    //이촌의 이름 불러오기
    const getProfile = async (ProfileId) => {
        try {
            const response = await axios.get(`${apiUrl}/users/${ProfileId}`, {
                withCredentials: true,
            });
            setNickName(response.data.name);
        } catch (error) {
            window.alert("조회 실패");
        }
    }

    useEffect(() => {
        getProfile(ProfileId);
    }, []);

    //채팅방생성
    const createChatRoom = async () => {
        const creatroomid = {
            user1_id: user_id,
            user2_id: friendId
        };
        try {
          await axios.post(`${apiUrl}/chatrooms/`, creatroomid, {
            withCredentials: true,
          });
        } catch (error) {
          console.error('Error creating chatroom:', error);
        }
      };


      //소개하기 요청 api
      const introduceUser = async () => {
        try {
            await axios.post(`${apiUrl}/introduction_request/`, {
                user_id: user_id,
                target_user_id : ProfileId,
                intermediary_user_id: friendId
              }, {
            withCredentials: true,
          });
          navigate('/chat');
        } catch (error) {
          console.error('Error updating friend status:', error);
        }
      };   
      
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        await createChatRoom();
        await introduceUser();
    };


    
    return (
        <div className={`fixed top-0 flex items-center justify-center w-[calc(100vw-296px)] min-h-screen border-2 bg-white/50 backdrop-blur-md`}>
            <div className=" flex flex-col items-center justify-center w-[400px] h-[200px] bg-custom-white rounded-[10px] border-[1px] border-custom-grey">
                <div className='flex flex-col items-center p-[20px]'>
                    <div className='text-[20px] font-black mb-[30px]'>'{nickName}' 님을 소개 받으시겠어요?</div>
                    <div className='w-[400px] flex flex-col items-center'>
                        <form onSubmit={handleSubmit}>
                            <div className="flex gap-[40px]">
                            <Button label={"확인"}type="submit" />
                            <Button label={"취소"} onClick={onCloseModal} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GettingIntroduceModal;