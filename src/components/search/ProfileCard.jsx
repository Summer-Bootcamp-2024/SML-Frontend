import ProfileImg from './ProfileImg';
import ProfileDetail from './ProfileDetail';
import profileImg from '../../assets/images/profileImg.png';

function ProfileCard({name, job, loc, interest, imgSrc}) {
    return (
        <div className='w-[200px] h-[300px] flex flex-col justify-around items-center rounded-[10px] shadow-md shadow-custom-blue/30 border-2 border-custom-blue cursor-pointer'>
            <ProfileImg src={imgSrc}></ProfileImg>
            <ProfileDetail name={name} job={job} loc={loc} interest={interest}></ProfileDetail>
        </div>
        

    )
}

export default ProfileCard;