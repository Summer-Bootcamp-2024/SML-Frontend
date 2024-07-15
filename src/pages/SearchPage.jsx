import Sidebar from '../components/Sidebar'
import Search from '../components/search/SearchBar'
import ProfileList from '../components/search/profile/ProfileList'
import profileImg from '../assets/images/myprofile/profileImg.png'
import { useState } from 'react'
import ProfileSlide from '../components/search/profile/ProfileSlide'
import Credit from '../components/CreditModal'
function SearchPage() {
  const [selectProfile, setSelectProfile] = useState(null)
  const [creditOpen, setCreditOpen] = useState(false)

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

  const openCreditModal = () => {
    setCreditOpen(true)
    console.log()
  }

  const onCloseCreditModal = () => {
    setCreditOpen(false)
  }

  return (
    <div className="flex w-full h-[100vh] ">
      <Sidebar></Sidebar>
      <div className="flex flex-col  items-center w-[calc(100vw-296px)] h-full overflow-y-auto">
        <div className="flex h-[150px] items-center justify-start w-full border-b-[1px] border-custom-grey">
          <Search></Search>
        </div>
        <div
          className={`flex justify-center items-center flex-grow w-full h-full transition-transform duration-300 border-2  border-green-400 ${selectProfile ? 'translate-x-[-400px]' : ''}`}>
          <ProfileList profiles={profiles} onCardClick={handleCardClick} className=""></ProfileList>
        </div>
        {selectProfile && (
          <ProfileSlide isOpen={true} onClose={closeProfile} onOpenCreditModal={openCreditModal} />
            )}
        {creditOpen && <Credit onCloseCreditModal={onCloseCreditModal}/>}
      </div>
    </div>
  )
}

export default SearchPage