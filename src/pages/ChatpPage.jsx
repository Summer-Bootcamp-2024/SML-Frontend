import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import profileImg from '../assets/images/myprofile/profileImg.png';
import { MdSend } from "react-icons/md";
import sendimg from '../assets/images/sendimg.png'



function ChatPage() {
 
  
  
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='flex justify-center items-center w-[calc(100vw-296px)] h-screen bg-white'>
            <div className='flex justify-between w-[80%] h-[600px] '>
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
                <div className='w-[580px] h-[600px] border-2 border-custom-grey rounded-[10px] flex items-center justify-center bg-white shadow-lg'>
                    <div className='flex flex-col w-[90%]'>
                    <div className='flex items-center w-full h-[60px] border-b-[1px] border-custom-grey'>
                        <img className="w-[40px] h-[40px] rounded-[115px] ml-[20px] " src={profileImg}/>
                            <span className='text-[14px] font-bold ml-[10px]'>김대희</span>
                    </div>
                    <div className='flex justify-center overflow-y-auto w-full h-[400px]'>
                        <div className='w-[90%] flex justify-between mt-[10px]'>
                        <div className='w-auto h-[40px] bg-[#E9E9EB] rounded-[20px] mt-[150px] p-[20px] flex items-center justify-center'>안됩니다</div>
                        <div className='flex flex-col justify-center max-w-[50%] h-[120px] bg-custom-blue rounded-[20px]'>
                            <div className=' text-custom-white text-[14px] ml-[15px] mr-[15px] mb-[10px]'>김대희님의 일촌인 원영서님을 소개받기 원합니다!</div>
                            <div className='flex justify-center '> 
                                <button className='w-[80px] h-[35px] bg-custom-white rounded-[10px] mr-[20px] border-[1px] border-custom-grey'>수락</button>
                                <button className='w-[80px] h-[35px] bg-custom-white rounded-[10px] border-[1px] border-custom-grey'>거절</button>
                            </div>
                        </div>
                        </div>
                        
                    </div>
                    <div className='flex items-center justify-center w-full h-[80px] border-t-[1px] border-custom-grey'>
                        <input className='w-[400px] h-[60px] border-2 border-custom-indigo rounded-[20px] bg-custom-white indent-[20px]'></input>
                        <img src={sendimg} className='w-[50px] h-[50px] ml-[20px]'/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ChatPage;
