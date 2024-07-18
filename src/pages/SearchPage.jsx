import Sidebar from '../components/Sidebar'
import Search from '../components/search/SearchBar'
import ProfileList from '../components/search/profile/ProfileList'
import profileImg from '../assets/images/myprofile/profileImg.png'
import { useState } from 'react'
import ProfileSlide from '../components/search/profile/ProfileSlide'
import Credit from '../components/CreditModal'

function SearchPage() {
  const [creditModalOpen, setCreditModalOpen] = useState(false)
  const [selectProfile, setSelectProfile] = useState(null)

  const profiles = [
    {
      name: '김대희',
      job: '백엔드 개발자',
      loc: '서울시 중구',
      interest: '테니스',
      imgSrc: profileImg,
    },
    {
      name: '김대희',
      job: '백엔드 개발자',
      loc: '서울시 중구',
      interest: '테니스',
      imgSrc: profileImg,
    },
    {
      name: '김대희',
      job: '백엔드 개발자',
      loc: '서울시 중구',
      interest: '테니스',
      imgSrc: profileImg,
    },
    {
      name: '김대희',
      job: '백엔드 개발자',
      loc: '서울시 중구',
      interest: '테니스',
      imgSrc: profileImg,
    },
    {
      name: '김대희',
      job: '백엔드 개발자',
      loc: '서울시 중구',
      interest: '테니스',
      imgSrc: profileImg,
    },
    {
      name: '김대희',
      job: '백엔드 개발자',
      loc: '서울시 중구',
      interest: '테니스',
      imgSrc: profileImg,
    },
    {
      name: '김대희',
      job: '백엔드 개발자',
      loc: '서울시 중구',
      interest: '테니스',
      imgSrc: profileImg,
    },
    {
      name: '김대희',
      job: '백엔드 개발자',
      loc: '서울시 중구',
      interest: '테니스',
      imgSrc: profileImg,
    },
  ]

  const handleCardClick = (profile) => {
    setSelectProfile(profile)
  }

  const closeProfile = () => {
    setSelectProfile(null)
  }

  const openCreditModal = () => { //선물하기 모달 열기
    setCreditModalOpen(true)
  }

  const onCloseModal = () => {
    setCreditModalOpen(false)
  }

  return (
    <div className="flex w-full h-[100vh] ">
      <Sidebar></Sidebar>
      <div className="flex flex-col items-center w-[calc(100vw-296px)] h-full overflow-y-auto">
        <div className="flex h-[200px] p-[3%] items-center justify-start w-full border-b-[1px] border-custom-grey">
          <Search></Search>
        </div>
        <div
          className={`mt-[5%] flex justify-center items-center flex-grow w-full h-full transition-transform duration-300 ${selectProfile ? 'translate-x-[-500px]' : ''}`}>
          <ProfileList profiles={profiles} onCardClick={handleCardClick} className=""></ProfileList>
        </div>
        {selectProfile &&(
          <ProfileSlide isOpen={true} onCloseSlide={closeProfile} openCreditModal={openCreditModal}/>
            )}
        {creditModalOpen && <Credit onCloseModal={onCloseModal}/>}
      </div>
    </div>
  )
}

export default SearchPage
