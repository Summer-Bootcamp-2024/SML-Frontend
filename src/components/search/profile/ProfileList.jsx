import ProfileCard from './ProfileCard'

function ProfileList({ profiles, onCardClick }) {
  return (
    <div className="w-[870px] flex gap-[20px] flex-wrap items-center justify-center">
      {profiles.map((profile, index) => (
        <ProfileCard
          key={index}
          profile={profile}
          onClick={onCardClick}></ProfileCard>
      ))}
    </div>
  )
}

export default ProfileList
