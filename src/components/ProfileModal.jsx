import React, { useState, useEffect } from 'react';
import profileimage from '../assets/images/profileImg2.png';
import Button from './Button';
import { MdClose } from "react-icons/md"; 
import axios from 'axios';
import { useApiUrlStore } from '../store/store';

function ProfileModal({ PostingClosedModal, ProfileId, openCreditModal }) {
    const {apiUrl} = useApiUrlStore()
    const [clickedIndex, setClickedIndex] = useState(null);
    const [profileData, setProfileData] = useState('')
    const [secondfriendlist, SetSecondFriendList] = useState([])
    
    const handleItemClick = (index) => {
        setClickedIndex(index);
        console.log(index)
    };

//친구 프로필 정보 조회
const getFriendProfile = async (ProfileId) => {
    try {
      const response = await axios.get(`${apiUrl}/users/${ProfileId}`, {
        withCredentials: true,
      });
      setProfileData(response.data)
      getFriendList(ProfileId)
    } catch (error) {
      console.error('Error fetching friend data:', error);
      alert('프로필 정보를 불러오지 못했습니다');
    }
  };
  
  
  //이촌 목록 조회(친구의 친구)
  const getFriendList = async (friend_id) => {
    try {
      const response = await axios.get(`${apiUrl}/friends/list/${friend_id}`, {
        withCredentials: true,
      });
      const secondFriends = response.data.map(item => item.friend_id);
      secondFriends.forEach(secondfriend_id => getFriendName(secondfriend_id));
    } catch (error) {
      console.error('Error fetching friend list:', error);
      alert('친구의 일촌목록을 불러오지 못했습니다');
    }
  };

  //이촌 정보 조회
  const getFriendName = async (friend_id) => {
    try {
      const response = await axios.get(`${apiUrl}/users/${friend_id}`, {
        withCredentials: true,
      });
      SetSecondFriendList(prevFriendListData => {
        if (!prevFriendListData.some(friend => friend.id === response.data.id)) {
          return [...prevFriendListData, response.data];
        }
        return prevFriendListData;
      });
    } catch (error) {
      console.error('Error fetching friend list:', error);
    }
  };


  useEffect(() => {
    getFriendProfile(ProfileId)
  }, []); 
  

    return (
        <div className='fixed top-0 flex items-center justify-center w-[calc(100vw-296px)] min-h-screen border-2 backdrop-blur-sm'>
            <div className="absolute w-[500px] min-h-[650px] bg-custom-skyblue backdrop-blur">
                <button className="flex justify-end w-full" onClick={PostingClosedModal}><MdClose className='w-[20px] h-[20px] mr-[10px] mt-[10px]'/></button>
                <div className='flex flex-col items-center'>
                    <div className='text-[24px] font-black text-custom-indigo underline underline-offset-2 mb-[10px]'>PROFILE</div>
                        <div className='w-[400px] min-h-[500px] flex flex-col items-center'>
                            <div className='flex items-center justify-between mt-[10px]'>
                                <img src={profileimage} className='w-[150px] min-h-[150px]'></img>
                                <div className='flex justify-between ml-[10px]'>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold w-[80px] h-[30px] flex items-center justify-start'>이름</span>
                                        <span className='font-semibold w-[80px] h-[30px] flex items-center justify-start'>나이</span>
                                        <span className='font-semibold w-[80px] h-[30px] flex items-center justify-start'>직업</span>
                                        <span className='font-semibold w-[80px] h-[30px] flex items-center justify-start'>위치</span>
                                        <span className='font-semibold w-[80px] h-[30px] flex items-center justify-start'>관심 분야</span>
                                    </div>
                                    <div className='flex flex-col ml-[10px]'>
                                        <span className='h-[30px] flex items-center justify-start'>{profileData.name}</span>
                                        <span className='h-[30px] flex items-center justify-start'>{profileData.age}</span>
                                        <span className='h-[30px] flex items-center justify-start'>{profileData.job}</span>
                                        <span className='h-[30px] flex items-center justify-start'>{profileData.region}</span>
                                        <span className='h-[30px] flex items-center justify-start'>{profileData.category}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[330px] min-h-[215px] m-[35px] flex-col rounded-[10px]'>
                                <div className='w-full h-[40px] bg-custom-blue flex items-center rounded-t-[10px]'>
                                    <span className='ml-[25px] text-[18px] font-semibold text-custom-white'>일촌 목록</span>
                                </div>
                                <div className='flex-col w-full h-[220px] overflow-y-auto bg-custom-white rounded-b-[10px]'>
                                    {secondfriendlist.map((secondfriend,index) => (
                                        <div
                                            key={secondfriend.id}
                                            className={`flex w-full min-h-[40px] justify-between border-b-[1px] border-custom-grey cursor-pointer ${clickedIndex === index ? 'bg-custom-orange bg-opacity-50 border-custom-orange border-2 font-bold' : ''}`}
                                            onClick={() => handleItemClick(index)}
                                        >
                                            <div className='flex items-center ml-[30px]'>{secondfriend.name}</div>
                                            <div className='flex items-center text-[14px] text-custom-blue mr-[30px]'>#{secondfriend.category}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Button label={"소개 받기"} onClick={clickedIndex !== null ? openCreditModal : null}/>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileModal;