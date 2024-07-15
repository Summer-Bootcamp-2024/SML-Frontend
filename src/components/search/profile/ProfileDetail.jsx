function ProfileDetail({name, job, loc, interest}) {
    return (
        <div className="w-[170px] h-[138px] flex flex-col justify-between text-center mt-[10px]">
            <h2>{name}</h2>
            <hr className="w-[170px] hover:text-black"/>
            <p>{job}</p>
            <p>{loc}</p>
            <p>{interest}</p>
        </div>
    )
}

export default ProfileDetail;