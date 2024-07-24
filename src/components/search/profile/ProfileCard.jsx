import ProfileImg from './ProfileImg'
import ProfileDetail from './ProfileDetail'
import { useState } from 'react'

function ProfileCard({ profile, onCardClick, isSelected }) {

  return (
    <div
      onClick={() => onCardClick(profile)}
      className={`w-[200px] h-[300px] flex flex-col justify-center items-center rounded-[10px] shadow-md shadow-custom-blue/50 border-2
       border-custom-blue cursor-pointer ${isSelected ? 'bg-custom-orange' : '!bg-custom-white'}`}
      >
      <ProfileImg src={profile.image_url}></ProfileImg>
      <ProfileDetail name={profile.name} job={profile.job} region={profile.region} category={profile.category}></ProfileDetail>
    </div>
  )
}

export default ProfileCard
