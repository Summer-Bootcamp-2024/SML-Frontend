import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Button from '../Button';
import { MdClose } from "react-icons/md"; 
import axios from 'axios';
import { useApiUrlStore, useUserIdStore } from '../../store/store';

function ProfileModal({ PostingClosedModal, friendId, openIntroduceModal }) {
    const { apiUrl } = useApiUrlStore();
    const [clickedIndex, setClickedIndex] = useState(null);
    const [profileData, setProfileData] = useState('');
    const [secondfriendlist, SetSecondFriendList] = useState([]);
    const { user_id } = useUserIdStore();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedJob, setSelectedJob] = useState('');
    const [profileId, setProfileId] = useState(''); 

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
        { name: '개발자', value: 'Developer' },
        { name: '금융 전문가', value: 'Finance Professional' },
        { name: '생산 관리자', value: 'Production Manager' },
        { name: '서비스 관리자', value: 'Service Manager' },
        { name: '교육 전문가', value: 'Education Professional' },
        { name: '의료 전문가', value: 'Healthcare Professional' },
        { name: '법률 전문가', value: 'Legal Professional' },
        { name: '미디어/커뮤니케이션 전문가', value: 'Media & Communication Professional' },
        { name: '디자이너', value: 'Designer' },
        { name: '연구원', value: 'Researcher' }
    ];

    const selectedCategoryName = categoryList.find(item => item.value === selectedCategory)?.name || '';
    const selectedJobName = jobList.find(item => item.value === selectedJob)?.name || '';

    const handleItemClick = (index) => {
        setClickedIndex(index);
        if (secondfriendlist[index]) {
            setProfileId(secondfriendlist[index].id);
        }
    };

    // 친구 프로필 정보 조회
    const getFriendProfile = async (friendId) => {
        try {
            const response = await axios.get(`${apiUrl}/users/${friendId}`, {
                withCredentials: true,
            });
            setProfileData(response.data);
            getFriendList(friendId);
            setSelectedCategory(response.data.category);
            setSelectedJob(response.data.job);
        } catch (error) {
            console.error('Error fetching friend data:', error);
            alert('프로필 정보를 불러오지 못했습니다');
        }
    };

    useEffect(() => {
        getFriendProfile(friendId);
    }, [friendId]); 

    // 이촌 목록 조회 (친구의 친구)
    const getFriendList = async (friendId) => {
        try {
            const response = await axios.get(`${apiUrl}/friends/list/${friendId}`, {
                withCredentials: true,
            });
            const secondFriends = response.data.map(item => item.friend_id);
            secondFriends.forEach(ProfileId => getFriendName(ProfileId));
        } catch (error) {
            console.error('Error fetching friend list:', error);
            alert('친구의 일촌목록을 불러오지 못했습니다');
        }
    };

    // 이촌 정보 조회
    const getFriendName = async (ProfileId) => {
        try {
            const response = await axios.get(`${apiUrl}/users/${ProfileId}`, {
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

    const deleteFriend = async (friendId) => {
        try {
            // user_id를 요청 본문에 포함시킵니다
            await axios.delete(`${apiUrl}/friends/${friendId}`, {
                data: { user_id }, // 요청 본문에 user_id 포함
                withCredentials: true,
            });
            alert('일촌이 삭제되었습니다.');
            navigate('/list');
        } catch (error) {
            console.error('Error deleting friend:', error);
            if (error.response && error.response.data) {
                console.error('Error details:', error.response.data);
            }
            alert('친구 삭제를 실패했습니다');
            navigate('/list');
        }
    };

    return (
        <div className='fixed top-0 flex items-center justify-center w-[calc(100vw-296px)] min-h-screen border-2 backdrop-blur-sm font-[Pretendard]'>
            <div className="absolute w-[500px] min-h-[650px] bg-custom-skyblue backdrop-blur">
                <button className="flex justify-end w-full" onClick={PostingClosedModal}><MdClose className='w-[20px] h-[20px] mr-[10px] mt-[10px]' /></button>
                <div className='flex flex-col items-center'>
                    <div className='text-[24px] font-black text-custom-indigo underline underline-offset-2 mb-[10px]'>PROFILE</div>
                    <div className='w-[400px] min-h-[500px] flex flex-col items-center'>
                        <div className='flex items-center justify-between mt-[10px]'>
                            <img src={profileData.image_url} className='w-[130px] h-[130px] mr-[20px]' />
                            <div className='flex justify-between ml-[10px]'>
                                <div className='flex flex-col'>
                                    <span className='font-semibold w-[80px] h-[30px] flex items-center justify-start'>이름</span>
                                    <span className='font-semibold w-[80px] h-[30px] flex items-center justify-start'>나이</span>
                                    <span className='font-semibold w-[80px] h-[30px] flex items-center justify-start'>직업</span>
                                    <span className='font-semibold w-[80px] h-[30px] flex items-center justify-start'>관심분야</span>
                                    <span className='font-semibold w-[80px] h-[30px] flex items-center justify-start'>위치</span>
                                </div>
                                <div className='flex flex-col ml-[10px]'>
                                    <span className='h-[30px] w-[80px] flex items-center justify-start'>{profileData.name}</span>
                                    <span className='h-[30px] w-[80px] flex items-center justify-start'>{profileData.age}세</span>
                                    <span className='h-[30px] w-[80px] flex items-center justify-start'>{selectedJobName}</span>
                                    <span className='h-[30px] w-[80px] flex items-center justify-start'>{selectedCategoryName}</span>
                                    <span className='h-[30px] w-[80px] flex items-center justify-start'>{profileData.region}</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-[330px] min-h-[215px] m-[35px] flex-col rounded-[10px]'>
                            <div className='w-full h-[40px] bg-custom-blue flex items-center rounded-t-[10px]'>
                                <span className='ml-[25px] text-[18px] font-semibold text-custom-white'>일촌 목록</span>
                            </div>
                            <div className='flex-col w-full h-[220px] overflow-y-auto bg-custom-white rounded-b-[10px]'>
                                {secondfriendlist.map((secondfriend, index) => (
                                    <div
                                        key={secondfriend.id}
                                        className={`flex w-full min-h-[40px] justify-between border-b-[1px] border-custom-grey cursor-pointer ${clickedIndex === index ? 'bg-custom-orange bg-opacity-50 border-custom-orange border-2 font-bold' : ''}`}
                                        onClick={() => handleItemClick(index)}
                                    >
                                        <div className='flex items-center ml-[30px]'>{secondfriend.name}</div>
                                        <div className='flex items-center text-[14px] text-custom-blue mr-[30px]'># {selectedCategoryName}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex gap-[10px]'>
                            <Button label={"일촌 삭제"} onClick={() => deleteFriend(friendId)} />
                            <Button label={"소개 받기"} onClick={() => clickedIndex !== null && openIntroduceModal(profileId)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileModal;
