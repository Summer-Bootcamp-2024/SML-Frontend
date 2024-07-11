import React from 'react';
import Lottiefile from './Firstlottie.jsx';

function Mainsecond() {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-80px)] bg-white">
      <div className="flex flex-col items-center justify-center w-full h-[440px] bg-custom-blue/30">
        <div className='flex'>
          <div className='w-[1150px] flex items-center justify-between'>
            <div className="flex flex-col p-[20px]">
              <div className="flex flex-col">
                <div>
                    <span className="text-[48px] font-bold mr-[15px]">마음을</span>
                    <span className="text-[48px] font-bold text-custom-blue">크레딧</span>
                    <span className="text-[48px] font-bold">으로</span>
                </div>
                <div>
                    <span className="text-[48px] font-bold mr-[15px]">지인과의</span>
                    <span className="text-[48px] font-bold text-custom-blue">매칭</span>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className='text-[16px] font-semibold'>크레딧을 선물하여 내 일촌의 지인을 소개받아</span>
                <span className='text-[16px] font-semibold'>더 넓은 경험을 쌓아보세요!</span>
              </div>
            </div>
            <Lottiefile/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainsecond;
