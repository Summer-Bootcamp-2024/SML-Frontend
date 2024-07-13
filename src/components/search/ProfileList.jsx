import ProfileCard from './ProfileCard';
function ProfileList({profiles}) {
    return (
        <div className='w-[1075px] flex gap-[20px] flex-wrap'>
            {profiles.map((profile, index) => (
                <ProfileCard
                key={index}
                name={profile.name}
                job={profile.job}
                loc={profile.loc}
                interest={profile.interest}
                imgSrc={profile.imgSrc}></ProfileCard>
            ))}
        </div>
    )
}

export default ProfileList;