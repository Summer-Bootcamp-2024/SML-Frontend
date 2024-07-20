import ProfileImg from './ProfileImg'
import ProfileDetail from './ProfileDetail'

function ProfileCard({ profile, onCardClick }) {



  return (
    <div
      onClick={() => onCardClick(profile.id)}
      className="w-[200px] h-[300px] flex flex-col justify-center items-center rounded-[10px] shadow-md shadow-custom-blue/50 border-2
       border-custom-blue cursor-pointer hover:bg-custom-orange/80 hover:border-custom-orange hover:border-3 hover:shadow-custom-orange/70
       "
      >
      <ProfileImg src={profile.image_url}></ProfileImg>
      <ProfileDetail name={profile.name} job={profile.job} region={profile.region} category={profile.category}></ProfileDetail>
    </div>
  )
}

export default ProfileCard
