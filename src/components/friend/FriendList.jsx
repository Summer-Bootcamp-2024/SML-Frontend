import React, { useEffect, useState } from 'react';
import ProfileModal from '../modal/ProfileModal';
import GettingIntroduceModal from '../modal/GettingIntroduceModal'
import { useApiUrlStore, useUserIdStore } from '../../store/store';
import { NavLink} from 'react-router-dom';
import axios from 'axios';

function FriendList({}) {
  const { user_id } = useUserIdStore()
  const { apiUrl } = useApiUrlStore()
  const [stausModalOpen, setStatusModalOpen] = useState(false)
  const [friendlistData, setFriendListData] = useState([])
  const [friendId, setFriendId] = useState('')
  const [profileId, setProfileId] = useState('')
  const [introduceModalOpen, setIntroduceModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedJob, setSelectedJob] = useState('');

    const categoryList = [
        { value: 'IT/SW', name: 'IT/SW' },
        { value: 'Finance/Insurance', name: '금융/보험' },
        { value: 'Production', name: '제조업' },
        { value: 'Service', name: '서비스업' },
        { value: 'Education', name: '교육' },
        { value: 'Medical', name: '의료/보건' },
        { value: 'Legal', name: '법률' },
        { value: 'Media', name: '미디어/홍보' },
        { value: 'Art', name: '예술/디자인' },
        { value: 'Science', name: '연구/과학' }
    ];

    const jobList = [
        { name: '개발자', value: 'Developer'},
        { name: '금융 전문가', value: 'Finance Professional'},
        { name: '생산 관리자', value: 'Production Manager'},
        { name: '서비스 관리자', value: 'Service Manager'},
        { name: '교육 전문가', value: 'Education Professional'},
        { name: '의료 전문가', value: 'Healthcare Professional'},
        { name: '법률 전문가', value: 'Legal Professional'},
        { name: '미디어/커뮤니케이션 전문가', value: 'Media & Communication Professional'},
        { name: '디자이너', value: 'Designer'},
        { name: '연구원', value: 'Researcher'}
    ];

  const selectedCategoryName = categoryList.find(item => item.value === selectedCategory)?.name || '';
  const selectedJobName = jobList.find(item => item.value === selectedJob)?.name || '';
    

  const PostingOpenModal = (id) => {
    setFriendId(id)
    setStatusModalOpen(true)
  }
  const PostingClosedModal = () => {
    setStatusModalOpen(false)
  }

  const openIntroduceModal = (id) => { //소개하기 모달 열기
    setProfileId(id)
    setIntroduceModalOpen(true)
  
  }
  const onCloseModal = () => {
    setIntroduceModalOpen(false)
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
  }
};

useEffect(() => {
  getFriendList();
}, []); 


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
    setSelectedCategory(response.data.category);
    setSelectedJob(response.data.job);
  } catch (error) {
    console.error('Error fetching friend data:', error);
  }
};


  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-[650px] h-[500px] bg-custom-white border-[1px] border-custom-grey rounded-[10px] overflow-y-auto pt-[20px] ">
      {friendlistData.map((friend) => (
        <div key={friend.id} className="flex flex-col items-center justify-center border-b-[1px] border-custom-grey">
            <NavLink className="w-[600px] min-h-[55px] flex justify-between items-center cursor-pointer" onClick={()=>PostingOpenModal(friend.id)}>
                <div className="flex text-[18px] h-[30px] font-semibold w-[80px] items-center justify-center">{friend.name}</div>
                <div className="flex items-center justify-between w-[500px] p-[5px]">
                  <div className="flex justify-center items-center text-[16px] h-[30px] mr-[-80px] w-[100px]">{selectedCategoryName}</div>
                  <div className="flex justify-center items-center text-[16px] h-[30px] w-auto">{selectedJobName}</div>
                  <div className="flex justify-center items-center text-[16px] h-[30px] w-[80px]">{friend.company}</div>
                </div>
            </NavLink>
        </div>
      ))}
      </div>
      {stausModalOpen && (
        <ProfileModal PostingClosedModal={PostingClosedModal}
        friendId={friendId}
        openIntroduceModal={openIntroduceModal}/>
      )}
      {introduceModalOpen && <GettingIntroduceModal onCloseModal={onCloseModal} friendId={friendId} ProfileId={profileId}/>}
    </div> 
  );
}

export default FriendList;
