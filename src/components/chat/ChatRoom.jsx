function ChatRoom({roomListData, onChatRoomClick}) {
    

  return (
        <div className='flex items-center justify-center w-[40%] mr-[-30px] h-screen bg-white font-[Pretendard]'>
            <div className='w-[350px] h-[600px] border-2 border-custom-grey rounded-[10px] flex justify-center items-center overflow-y-auto shadow-lg'>
                <div className='flex flex-col  w-[90%] h-[90%]'>
                    {roomListData.map((room) => (
                    <div key={room.room_id} className='flex items-center w-full h-[60px] border-b-[1px] my-[5px] border-custom-grey'
                    onClick={()=>onChatRoomClick(room.room_id)}>
                      <img className="w-[50px] h-[50px] rounded-[115px] ml-[20px]" src={room.other_img}/>
                      <span className='text-[16px] font-bold ml-[15px]'>{room.other_name}</span>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;
