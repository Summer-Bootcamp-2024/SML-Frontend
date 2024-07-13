import Sidebar from "../components/Sidebar";
import SearchCon from "../components/search/SearchCon";
import ProfileList from "../components/search/ProfileList";
import profileImg from "../assets/images/profileImg.png";
function SearchPage() {
    const profiles = [
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg},
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg},
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg},
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg},
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg},
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg},
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg},
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg},
        { name: '김대희', job: '백엔드 개발자', loc: '서울시 중구', interest: '테니스', imgSrc: profileImg}

    ]
    return (
        <div className="flex w-full h-[100vh]">
            <Sidebar></Sidebar>
            <div className="flex flex-col gap-[50px] items-center w-[calc(100vw-296px)] h-full overflow-y-auto">
                <div className="flex flex-shrink-0 h-[150px] items-center justify-center w-full border-b-2">
                    <SearchCon></SearchCon>
                </div>
                <div className="flex items-center justify-center flex-grow w-full">
                    <div className="flex flex-col items-center w-full">
                        <ProfileList profiles={profiles}></ProfileList>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;