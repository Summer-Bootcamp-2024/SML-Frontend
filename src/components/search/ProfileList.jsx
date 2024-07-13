import ProfileCard from './ProfileCard';
function ProfileList({profiles, onCardClick}) {
    return (
        <div className='w-[870px] flex gap-[20px] flex-wrap'>
            {profiles.map((profile, index) => (
                <ProfileCard
                key={index}
                name={profile.name}
                job={profile.job}
                loc={profile.loc}
                interest={profile.interest}
                imgSrc={profile.imgSrc}
                onClick={() => onCardClick(profile)}></ProfileCard>
            ))}
        </div>
    )
}

export default ProfileList;