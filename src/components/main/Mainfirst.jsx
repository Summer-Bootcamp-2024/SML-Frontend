import React from 'react';
import Lottiefile from './Firstlottie.jsx';

function Mainfirst() {
  return (
    <div className="flex items-center justify-center w-[100vw] h-[calc(100vh-80px)] bg-white">
      <div className="flex flex-col items-center justify-center w-full h-[440px] bg-custom-blue/30">
        <div className='flex'>
          <div className='w-[1150px] flex items-center justify-between'>
            <div className="flex flex-col p-[20px]">
              <div className="flex justify-center">
                <span className="text-[48px] font-bold text-custom-blue mr-[15px]">Search, Match</span>
                <span className="text-[48px] font-bold mr-[15px]">and</span>
                <span className="text-[48px] font-bold text-custom-blue">Link</span>
              </div>
              <div className="flex flex-col items-start">
                <span className='text-[16px] font-semibold'>실력만큼 중요해진 기회!</span>
                <span className='text-[16px] font-semibold'>그리고 그 기회는 인간 관계 속에서 발생합니다</span>
              </div>
            </div>
            <Lottiefile/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainfirst;
