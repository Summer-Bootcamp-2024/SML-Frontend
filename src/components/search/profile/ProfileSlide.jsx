import React, {useState } from 'react';
import profileimage from '../../../assets/images/profileImg2.png';
import Button from '../../Button';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import axios from 'axios';
import { useApiUrlStore, useUserIdStore } from '../../../store/store';
import { useEffect } from 'react';

function ProfileSlide({ isOpen, openCreditModal,onCloseSlide, ProfileId }) {
    const { apiUrl } = useApiUrlStore();
    const { user_id } = useUserIdStore();
    const [clickedIndex, setClickedIndex] = useState(null); //일촌목록 선택 여부
    const [profileData, setProfileData] = useState('');
    const [myFriendList, setMyFriendList] = useState([]);
    const [profileFreindList, setProfileFreindList] = useState([]);
    const [commonFriendList, setCommonFriendList] = useState([]);
    
    const handleItemClick = (index) => {
        setClickedIndex(index);
    };

    //검색 결과 프로필 정보 조회
    const getFriendProfile = async (ProfileId) => {
        try {
          const response = await axios.get(`${apiUrl}/users/${ProfileId}`, {
            withCredentials: true,
          });
          setProfileData(response.data);
          getProfileFriends(ProfileId);
        } catch (error) {
          alert('프로필 정보를 불러오지 못했습니다');
        }
      };

      //내 친구 목록 조회
      const getMyFriends = async () => {
        try {
            const response = await axios.get(`${apiUrl}/friends/list/${user_id}`, {
                withCredentials: true,
            });
            setMyFriendList(response.data);
        } catch (err) {
            alert('내 친구 목록을 불러오지 못했습니다');
        }
      }

      //검색 결과로 나온 사용자의 친구 목록 조회
      const getProfileFriends = async (ProfileId) => {
        try {
            const response = await axios.get(`${apiUrl}/friends/list/${ProfileId}`, {
                withCredentials: true,
            });
            setProfileFreindList(response.data);
        } catch (err) {
            alert('사용자의 친구 목록을 불러오지 못했습니다');
        }
      }

      //나와 같이 아는 일촌 목록 조회
      const getCommonFriendList = async () => {
        const common = myFriendList.filter(myFriend => 
            profileFreindList.some(profileFriend => profileFriend.id === myFriend.id)
        );
        
        const detailedCommonFriends = await Promise.all(common.map(async (friend) => {
            try {
                const response = await axios.get(`${apiUrl}/users/${friend.friend_id}`, {
                    withCredentials: true,
                });
                return response.data;
            } catch (err) {
                return null;
            }
        }));

        setCommonFriendList(detailedCommonFriends.filter(friend => friend !== null));
      }

      useEffect(() => {
        getFriendProfile(ProfileId);
        getMyFriends();
      }, []); 

      useEffect(() => {
        if (myFriendList.length > 0 && profileFreindList.length > 0) {
            getCommonFriendList();
        }
      }, [profileFreindList]);

    return (
        <div
            className={`fixed top-[175px] rounded-[10px] border-2 border-custom-blue right-20 h-[calc(100vh-140px)] pb-[3%] bg-custom-skyblue transition-transform duration-300 ${isOpen ? '' : 'translate-x-[400px]'}`}
                style={{
                    width: '500px',
                    // 'overflow-y-auto'를 추가하여 내부 내용만 스크롤되도록 설정합니다.
                    overflowY: 'auto',
                }}
            >
            <button className="flex justify-end w-full" onClick={onCloseSlide}>
                <MdKeyboardDoubleArrowRight className='w-[46px] h-[39px] mr-[10px] mt-[10px] text-custom-grey'/>
            </button>
            <div className='flex flex-col items-center justify-center mt-[-30px]'>
                <div className='text-[24px] font-black text-custom-indigo underline underline-offset-2 mb-[10px]'>PROFILE</div>
                <div className='w-[400px] min-h-[500px] flex flex-col items-center'>
                    <div className='flex items-center justify-between w-[90%] mt-[10px]'>
                        <img src={profileimage} className='w-[130px] min-h-[130px]'></img>
                        <div className='w-[50%] flex justify-between'>
                            <div className='flex flex-col'>
                                <span className='font-semibold mb-[5px]'>이름</span>
                                <span className='font-semibold mb-[5px]'>나이</span>
                                <span className='font-semibold mb-[5px]'>직업</span>
                                <span className='font-semibold mb-[5px]'>위치</span>
                                <span className='font-semibold mb-[5px]'>관심 분야</span>
                            </div>
                            <div className='flex flex-col'>
                                <span className='mb-[5px]'>{profileData.name}</span>
                                <span className='mb-[5px]'>{profileData.age}세</span>
                                <span className='mb-[5px]'>{profileData.job}</span>
                                <span className='mb-[5px]'>{profileData.region}</span>
                                <span className='mb-[5px]'>{profileData.category}</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-[330px] min-h-[215px] m-[35px] flex-col rounded-[10px]'>
                        <div className='w-full h-[40px] bg-custom-blue flex items-center rounded-t-[10px]'>
                            <span className='ml-[25px] text-[18px] font-semibold text-custom-white'>일촌 목록</span>
                        </div>
                        <div className='flex-col w-full h-[220px] overflow-y-auto bg-custom-white rounded-b-[10px]'>
                            {commonFriendList.map((friend, index) => (
                                <div
                                    key={friend.id}
                                    className={`flex w-full min-h-[40px] justify-between border-b-[1px] border-custom-grey cursor-pointer ${clickedIndex === index ? 'bg-custom-orange bg-opacity-50 border-custom-orange border-2 font-bold' : ''}`}
                                    onClick={() => handleItemClick(index)}
                                >
                                    <div className='flex items-center ml-[30px]'>{friend.name}</div>
                                    <div className='flex items-center text-[14px] text-custom-blue mr-[30px]'>#{friend.category}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button label={"소개 받기"} onClick={clickedIndex !== null ? openCreditModal : null}/>
                </div>
                
            </div>
        </div>
    );
}

export default ProfileSlide;
