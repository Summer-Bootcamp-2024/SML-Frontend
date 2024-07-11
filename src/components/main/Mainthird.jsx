import React from 'react';
import slideimage from '../../assets/images/mainthird.png'

function Mainthird() {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-80px)] bg-white">
      <div className="flex flex-col items-center justify-center w-full h-[440px] bg-custom-blue/30">
        <div className='flex'>
          <div className='w-[1200px] flex items-center justify-between'>
            <div className="flex flex-col p-[20px]">
              <div className="flex flex-col justify-center">
                <div>
                  <span className="text-[48px] font-bold mr-[15px]">내친구는</span>  
                  <span className="text-[48px] font-bold text-custom-blue mr-[15px]">일촌</span>
                </div>
                <div>
                  <span className="text-[48px] font-bold">일촌의 지인은 </span>
                  <span className="text-[48px] font-bold text-custom-blue">이촌</span>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className='text-[16px] font-semibold'>일촌과 이촌으로 나와의 관계도를 한눈에 파악할 수 있어요!</span>
              </div>
            </div>
            <img src={slideimage} className='w-[400px] h-[400px] rotate-[10.50deg]'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainthird;