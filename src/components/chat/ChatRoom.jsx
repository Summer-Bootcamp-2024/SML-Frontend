import profileImg from '../../assets/images/myprofile/profileImg.png'


function ChatRoom() {
  
  return (
        <div className='flex items-center justify-center w-[40%] mr-[-30px] h-screen bg-white'>
            <div className='w-[350px] h-[600px] border-2 border-custom-grey rounded-[10px] flex justify-center items-center overflow-y-auto shadow-lg'>
                <div className='flex flex-col  w-[90%] h-[90%]'>
                    <div className='flex items-center w-full h-[70px] border-b-[1px] border-custom-grey'>
                    <img className="w-[50px] h-[50px] rounded-[115px] ml-[20px] " src={profileImg}/>
                        <span className='text-[18px] font-bold ml-[10px]'>김대희</span>
                    </div>
                    <div className='flex items-center w-full h-[70px] border-b-[1px] border-custom-grey'>
                    <img className="w-[50px] h-[50px] rounded-[115px] ml-[20px] " src={profileImg}/>
                        <span className='text-[18px] font-bold ml-[10px]'>김대희</span>
                    </div>
                    <div className='flex items-center w-full h-[70px] border-b-[1px] border-custom-grey'>
                    <img className="w-[50px] h-[50px] rounded-[115px] ml-[20px] " src={profileImg}/>
                        <span className='text-[18px] font-bold ml-[10px]'>김대희</span>
                    </div>
                    <div className='flex items-center w-full h-[70px] border-b-[1px] border-custom-grey'>
                    <img className="w-[50px] h-[50px] rounded-[115px] ml-[20px] " src={profileImg}/>
                        <span className='text-[18px] font-bold ml-[10px]'>김대희</span>
                    </div>
                    <div className='flex items-center w-full h-[70px] border-b-[1px] border-custom-grey'>
                    <img className="w-[50px] h-[50px] rounded-[115px] ml-[20px] " src={profileImg}/>
                        <span className='text-[18px] font-bold ml-[10px]'>김대희</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;
