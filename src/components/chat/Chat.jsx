import profileImg from '../../assets/images/myprofile/profileImg.png'
import sendimg from '../../assets/images/sendimg.png'
import axios from 'axios';
import { useApiUrlStore } from '../../store/store';
import { useState } from 'react';


function Chat() {
    const {apiUrl} = useApiUrlStore()
    const [status, setStatus] = useState('pending')

  
//일촌요청 전송
const postFriendStatus = async () => {
    try {
      const response = await axios.post(`${apiUrl}/friends/${friend_id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Error fetching friend data:', error);
      alert('일촌요청에 실패했습니다');
    }
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  }

  //일촌요청 수락/거절
const updateFriendStatus = async () => {
    const putstatus = { status }; 
    
    try {
      const response = await axios.put(`${apiUrl}/friends/${friend_id}`, putstatus, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Error fetching friend data:', error);
      alert('일촌관계 변경을 실패했습니다');
    }
  };


    
  return (
        <div className='flex items-center justify-center w-[60%] h-screen ml-[-30px] bg-white'>
            <div className='w-[650px] h-[600px] border-2 border-custom-grey rounded-[10px] flex items-center justify-center bg-white shadow-lg'>
                <div className='flex flex-col justify-center w-[90%] h-full'>
                <div className='flex items-center w-full h-[70px] border-b-[1px] border-custom-grey'>
                    <img className="w-[40px] h-[40px] rounded-[115px] ml-[20px] " src={profileImg}/>
                    <span className='text-[16px] font-bold ml-[10px]'>김대희</span>
                    <button className='text-[14px] font-semibold text-custom-blue ml-auto mr-[20px]' onClick={postFriendStatus}>일촌 요청</button>
                </div>
                <div className='flex justify-center overflow-y-auto w-full h-[450px] '>
                    <div className='w-[90%] flex flex-col items-center mt-[10px]'>
                        <div id="sender" className='flex flex-col justify-center max-w-[50%] h-auto p-[15px] bg-custom-blue rounded-[20px] ml-[50%]'>
                            <div className=' text-custom-white text-[14px] ml-[15px] mr-[15px] mb-[10px]'>김대희님의 일촌인 원영서님을 소개받기 원합니다!</div>
                            <div className='flex justify-center '> 
                                <button className='w-[80px] h-[35px] bg-custom-white rounded-[10px] mr-[20px] border-[1px] border-custom-grey'>수락</button>
                                <button className='w-[80px] h-[35px] bg-custom-white rounded-[10px] border-[1px] border-custom-grey'>거절</button>
                            </div>
                        </div>
                        <div  className='w-auto h-auto bg-[#E9E9EB] rounded-[20px] p-[15px] flex items-center justify-center mr-[75%]'>안됩니다</div>
                        <div id="sender" className='flex flex-col justify-center max-w-[50%] h-auto p-[15px] bg-custom-blue rounded-[20px] ml-[50%]'>
                                    <div className=' text-custom-white text-[14px] ml-[15px] mr-[15px] mb-[10px]'>김대희님의 일촌인 원영서님을 소개받기 원합니다!</div>
                            <div className='flex justify-center '> 
                                <button 
                                className='w-[80px] h-[35px] bg-custom-white rounded-[10px] mr-[20px] border-[1px] border-custom-grey'
                                onClick={() => { handleStatusChange('accepted'); updateFriendStatus();}}>수락</button>
                                <button 
                                className='w-[80px] h-[35px] bg-custom-white rounded-[10px] border-[1px] border-custom-grey'
                                onClick={() => { handleStatusChange('rejected'); updateFriendStatus(); }}>거절</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center w-full h-[80px] border-t-[1px] border-custom-grey'>
                    <input className='w-[450px] h-[60px] border-2 border-custom-indigo rounded-[20px] bg-custom-white indent-[20px]'></input>
                    <img src={sendimg} className='w-[50px] h-[50px] ml-[20px]'/>
                </div>
                </div>
            </div>
        </div>
     );
}

export default Chat;
