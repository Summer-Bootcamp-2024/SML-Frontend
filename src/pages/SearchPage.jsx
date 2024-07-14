import Sidebar from "../components/Sidebar";
import SearchCon from "../components/search/SearchCon";
import ProfileList from "../components/search/ProfileList";
import profileImg from "../assets/images/profileImg.png";
import { useState } from "react";
import ProfileSlide from "../components/ProfileSlide";
import Credit from "../components/Credit";
function SearchPage() {
    const [selectProfile, setSelectProfile] = useState(null);
    const [creditOpen, setCreditOpen] = useState(false);

    const profiles = [
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg},
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg},
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg},
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg},
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg},
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg},
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg},
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg},
    ]

    const handleCardClick = (profile) => {
        setSelectProfile(profile);
    }

    const closeProfile = () => {
        setSelectProfile(null);
    }

    const openCreditModal = () => {
        setCreditOpen(true);
    }

    return (
        <div className="flex w-full h-[100vh]">
            <Sidebar></Sidebar>
            <div className="flex flex-col gap-[50px] items-center w-[calc(100vw-296px)] h-full overflow-y-auto">
                <div className="flex flex-shrink-0 h-[150px] items-center justify-center w-full border-b-2">
                    <SearchCon></SearchCon>
                </div>
                <div className={`flex items-center justify-center flex-grow w-full transition-transform duration-300 ${selectProfile ? 'translate-x-[-400px]' : ''}`}>
                    <ProfileList profiles={profiles} onCardClick={handleCardClick}></ProfileList>
                </div>
                {selectProfile && (
                    <ProfileSlide isOpen={true} onClose={closeProfile} onOpenCreditModal={openCreditModal}/>
                )}
                {creditOpen && (
                    <Credit />
                )}
            </div>
        </div>
    )
}

export default SearchPage;