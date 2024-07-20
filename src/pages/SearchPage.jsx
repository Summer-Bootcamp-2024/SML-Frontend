import Sidebar from '../components/Sidebar';
import SearchBar from '../components/search/SearchBar';
import ProfileList from '../components/search/profile/ProfileList';
import { useState } from 'react';
import ProfileSlide from '../components/search/profile/ProfileSlide';
import Credit from '../components/CreditModal';
import { useUserIdStore, useApiUrlStore } from '../store/store';
import { MdPeople } from "react-icons/md";
import basicProfile from "../assets/images/myprofile/basicProfile.png";

function SearchPage() {
  const { user_id } = useUserIdStore();
  const { apiUrl } = useApiUrlStore();
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [selectProfile, setSelectProfile] = useState(null);
  const [friendId, setFriendId] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const handleCardClick = (profile) => {
    setSelectProfile(profile);
  };

  const closeProfile = () => {
    setSelectProfile(null);
  };

  const openCreditModal = () => { // 선물하기 모달 열기
    setCreditModalOpen(true);
  };

  const onCloseModal = () => {
    setCreditModalOpen(false);
  };

  return (
    <div className="flex w-full h-[100vh] font-[Pretendard] ">
      <Sidebar></Sidebar>
      <div className="flex flex-col items-center w-[calc(100vw-296px)] h-full">
        <div className="flex h-[150px] items-center justify-start w-full border-b-[1px] border-custom-grey">
          <SearchBar setSearchResults={setSearchResults} />
        </div>
        <div className="flex items-center justify-center w-full h-full">
          {searchResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-custom-grey">
              <MdPeople className="w-[200px] h-[200px]" />
              <span className="text-2xl font-bold">나의 일촌의 일촌과 친구가 되어보세요!</span>
              <span className="font-bold">원하는 관심분야를 검색하면 해당되는 이촌을 보여드립니다</span>
            </div>
          ) : (
            <div className={`mt-[5%] flex justify-center items-center flex-grow w-full h-full transition-transform duration-300 ${selectProfile ? 'translate-x-[-400px]' : ''}`}>
              <ProfileList profiles={searchResults} onCardClick={handleCardClick} />
            </div>
          )}
          {selectProfile && (
            <ProfileSlide isOpen={true} onCloseSlide={closeProfile} openCreditModal={openCreditModal} ProfileId={selectProfile}/>
          )}
          {creditModalOpen && <Credit onCloseModal={onCloseModal} />}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
