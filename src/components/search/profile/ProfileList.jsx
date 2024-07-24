import { useState } from 'react'
import ProfileCard from './ProfileCard'

function ProfileList({ profiles, onCardClick, onCloseSlide }) {
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const handleCardClick = (profile) => {
    setSelectedProfileId(profile.id);
    onCardClick(profile);
  }

  const handleCloseSlide = () => {
    setSelectedProfileId(null);
    onCloseSlide();
  }

  return (
    <div className="w-[870px] flex gap-[20px] flex-wrap items-center justify-center">
      {profiles.map(profile => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          isSelected={profile.id === selectedProfileId}
          onCardClick={handleCardClick}
          onCloseSlide={handleCloseSlide}
          ></ProfileCard>
      ))}
    </div>
  )
}

export default ProfileList
