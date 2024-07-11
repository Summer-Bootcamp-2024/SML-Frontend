import React from 'react'
import Creditlottie from './Creditlottie.jsx'
import slideimage from '../../assets/images/profile.png'

function Mainsecond() {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-80px)] bg-white">
      <div className="flex flex-col items-center justify-center w-full h-[440px] bg-custom-blue/30">
        <div className="flex">
          <div className="w-[1200px] flex items-center justify-between">
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
                <span className="text-[16px] font-semibold">
                  크레딧을 선물하여 내 일촌의 지인을 소개받아
                </span>
                <span className="text-[16px] font-semibold">더 넓은 경험을 쌓아보세요!</span>
              </div>
            </div>
            <div className='w-[450px] flex justify-between relative'>
              <Creditlottie/>
              <div className='flex items-center justify-center w-full'>
                <img src={slideimage} className="h-[365px] rotate-[10.50deg] shadow"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mainsecond
