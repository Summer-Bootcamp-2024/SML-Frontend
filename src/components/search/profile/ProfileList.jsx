import ProfileCard from './ProfileCard'

function ProfileList({ profiles, onCardClick }) {
  return (
    <div className="w-[870px] flex gap-[20px] flex-wrap items-center justify-center">
      {profiles.map(profile => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onCardClick={() => onCardClick(profile)}></ProfileCard>
      ))}
    </div>
  )
}

export default ProfileList
