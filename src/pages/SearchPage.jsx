import Sidebar from '../components/Sidebar';
import SearchBar from '../components/search/SearchBar';
import ProfileList from '../components/search/profile/ProfileList';
import { useState } from 'react';
import ProfileSlide from '../components/search/profile/ProfileSlide';
import GettingIntroduceModal from '../components/modal/GettingIntroduceModal'
import { MdPeople } from "react-icons/md";

function SearchPage() {
  const [introduceModalOpen, setIntroduceModalOpen] = useState(false);
  const [selectProfile, setSelectProfile] = useState(null);
  const [_selectedProfileId, setSelectedProfileId] = useState(null);
  const [friendId, setFriendId] = useState(null);
  const [_intermediaryUserId, setIntermediaryUserId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  

  const handleCardClick = (profile) => {
    setSelectProfile(profile);
    setSelectedProfileId(profile.user_id);
  };

  const closeProfile = () => {
    setSelectProfile(null);
    setSelectedProfileId(null);
  };

  const openIntroduceModal = (selectedFriendId, intermediaryId) => { // 소개하기 모달 열기
    setFriendId(selectedFriendId);
    setIntermediaryUserId(intermediaryId);
    setIntroduceModalOpen(true);
  };

  const onCloseModal = () => {
    setCreditModalOpen(false);
  };
  
  

  
  return (
    <div className="flex w-full h-[100vh] font-[Pretendard]">
      <Sidebar/>
      <div className="flex flex-col ml-[296px] items-center w-[calc(100vw-296px)]">
      <div className="flex h-[20%] items-center justify-start w-full border-b-[1px] border-custom-grey">
          <SearchBar setSearchResults={setSearchResults} />
        </div>
        <div className="flex items-center justify-center w-full h-full">
          {searchResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-[-80px] text-custom-grey">
              <MdPeople className="w-[200px] h-[200px] mb-[-20px]" />
              <span className="text-2xl font-bold">나의 일촌의 일촌과 친구가 되어보세요!</span>
              <span className="font-bold">원하는 관심분야를 검색하면 해당되는 이촌을 보여드립니다</span>
            </div>
          ) : (
            <div className={`mt-[5%] flex justify-center items-center flex-grow w-full h-full transition-transform duration-300 ${selectProfile ? 'translate-x-[-450px]' : ''}`}>
              <ProfileList profiles={searchResults} onCardClick={handleCardClick} />
            </div>
          )}
          {selectProfile && (
            <ProfileSlide isOpen={true} onCloseSlide={closeProfile} openIntroduceModal={(id) => openIntroduceModal(id, selectProfile.id)} ProfileId={selectProfile.id}/>
          )}
          {introduceModalOpen && <GettingIntroduceModal onCloseModal={onCloseModal} friendId={friendId} ProfileId={selectProfile.id}/>}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
