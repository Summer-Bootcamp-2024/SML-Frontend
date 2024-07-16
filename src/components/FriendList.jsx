import React, { useEffect, useState } from 'react';
import ProfileModal from './ProfileModal';
import { useApiUrlStore } from '../store/store';
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios';

function FriendList() {
  const { user_id } = useParams()
  const { apiUrl } = useApiUrlStore()
  const [stausModalOpen, setStatusModalOpen] = useState(false)
  const [friendlistData, setFriendListData] = useState([])
  const [friendId, setFriendId] = useState('')

  const PostingOpenModal = (id) => {
    setFriendId(id)
    setStatusModalOpen(true)
  }
  const PostingClosedModal = () => {
    setStatusModalOpen(false)
  }

  
 // 친구 목록 조회
 const getFriendList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/friends/list/${user_id}`, {
      withCredentials: true,
    });
    const friendIds = response.data.map(item => item.friend_id);
    friendIds.forEach(friend_id => getFriend(friend_id));
  } catch (error) {
    console.error('Error fetching friend list:', error);
    alert('일촌 목록을 불러오지 못했습니다');
  }
};

//친구 정보 조회
const getFriend = async (friend_id) => {
  try {
    const response = await axios.get(`${apiUrl}/users/${friend_id}`, {
      withCredentials: true,
    });
    setFriendListData(prevFriendListData => {
      if (!prevFriendListData.some(friend => friend.id === response.data.id)) {
        return [...prevFriendListData, response.data];
      }
      return prevFriendListData;
    });
  } catch (error) {
    console.error('Error fetching friend data:', error);
  }
};

useEffect(() => {
  getFriendList();
}, []); 

  return (
    <div className="w-full h-[550px] flex justify-center items-center">
      <div className="w-[650px] h-[500px] bg-custom-white rounded-[10px] overflow-y-auto pt-[20px]">
      {friendlistData.map((friend) => (
        <div key={friend.id} className="flex flex-col items-center justify-center border-b-[1px] border-custom-grey">
            <NavLink className="w-[500px] min-h-[55px] flex justify-between items-center cursor-pointer " onClick={()=>PostingOpenModal(friend.id)}>
                <div className="flex text-[18px] h-[30px] font-semibold w-[80px] items-center justify-center">{friend.name}</div>
                <div className="flex items-center justify-center w-[350px] p-[5px] ml-[10px]">
                  <div className="flex justify-center items-center text-[16px] mr-[20px] h-[30px] w-[80px]">{friend.job}</div>
                  <div className="flex justify-center items-center text-[16px] mr-[20px] h-[30px] w-[80px]">{friend.company}</div>
                  <div className="flex justify-center items-center text-[16px] h-[30px] w-[80px]">{friend.region}</div>
                </div>
            </NavLink>
        </div>
      ))}
      </div>
      {stausModalOpen && (
        <ProfileModal PostingClosedModal={PostingClosedModal}
        ProfileId={friendId}/>
      )}
    </div> 
  );
}

export default FriendList;
