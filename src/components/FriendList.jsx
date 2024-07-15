import React, { useEffect, useState } from 'react';
import ProfileModal from './ProfileModal';
import { useApiUrlStore } from '../store/store';

function FriendList() {
  const { user_id } = useParams()
  const { apiUrl } = useApiUrlStore()
  const [stausModalOpen, setStatusModalOpen] = useState(false)
  const [friendlistData, setFriendListData] = useState('')
  const [friendid, setFriendId] = useState('')

  const PostingOpenModal = () => {
    setStatusModalOpen(true)
  }
  const PostingClosedModal = () => {
    setStatusModalOpen(false)
  }

  //친구 목록 조회
  const getFriendList = async () => {
    try {
      const access = localStorage.getItem('session_id')
      const response = await axios.get(`${apiUrl}/friend/list/${user_id}`,{
        headers: { Authorization: `Bearer ${access}` },
      })
      console.log(response.data)
      setFriendId(response.data.friend_id)
    } catch (error) {
      console.error(error)
      alert('친구목록을 불러오지 못했습니다')
    }
  }

  //친구 정보 조회
  const getFriend = async (friendid) => {
    try {
      const access = localStorage.getItem('session_id')
      const response = await axios.get(`${apiUrl}/user/${friendid}`,{
        headers: { Authorization: `Bearer ${access}` },
      })
      setFriendListData(response.data)
    } catch (error) {
      console.error(error)
      alert('친구정보를 불러오지 못했습니다')
    }
  }
  
  useEffect(() => {
    getFriendList()
    getFriend()
  }, [])

  return (
    <div className="w-full h-[550px] flex justify-center items-center">
      <div className="w-[650px] h-[500px] bg-custom-white rounded-[10px] overflow-y-auto">
        <div className="flex flex-col justify-center items-center mt-[20px]">
          {friendlistData.map((list) => (
            <div className="w-[600px] min-h-[60px] flex justify-center items-center cursor-pointer" key={index} onClick={PostingOpenModal}>
              <div className="flex items-center justify-between w-[500px] p-[10px] border-b-[1px] border-custom-grey">
                <div className="text-[16px] h-[24px] font-semibold ">{list.name}</div>
                <div className="flex items-center justify-center w-[350px] p-[5px]">
                  <div className="text-[16px] mr-[10px]">{list.job}</div>
                  <div className="text-[16px] mr-[10px]">{list.company}</div>
                  <div className="text-[16px] mr-[10px]">{list.region}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {stausModalOpen && (
        <ProfileModal PostingClosedModal={PostingClosedModal}/>
      )}
    </div>
    
  );
}

export default FriendList;
