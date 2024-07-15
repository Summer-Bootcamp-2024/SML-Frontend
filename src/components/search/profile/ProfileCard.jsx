import ProfileImg from './ProfileImg'
import ProfileDetail from './ProfileDetail'

function ProfileCard({ name, job, loc, interest, imgSrc, onClick }) {

  return (
    <div
      onClick={onClick}
      className="w-[200px] h-[300px] flex flex-col justify-center items-center rounded-[10px] shadow-md shadow-custom-blue/50 border-2 border-custom-blue cursor-pointer hover:bg-custom-orange/80 hover:border-custom-orange hover:border-3 hover:shadow-custom-orange/50">
      <ProfileImg src={imgSrc}></ProfileImg>
      <ProfileDetail name={name} job={job} loc={loc} interest={interest}></ProfileDetail>
    </div>
  )
}

export default ProfileCard
