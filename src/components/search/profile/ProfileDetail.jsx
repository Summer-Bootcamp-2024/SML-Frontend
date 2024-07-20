function ProfileDetail({name, job, region, category}) {
    return (
        <div className="w-[170px] h-[138px] flex flex-col justify-between text-center mt-[10px]">
            <h2>{name}</h2>
            <hr className="w-[170px] hover:text-black"/>
            <p>{job}</p>
            <p>{region}</p>
            <p>{category}</p>
        </div>
    )
}

export default ProfileDetail;