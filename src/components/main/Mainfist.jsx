import React from 'react'
import Lottiefile from './Firstlottie.jsx'
import { MdDoubleArrow } from "react-icons/md";

function Mainfirst() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <div className="w-full h-[440px] flex justify-center items-center bg-custom-blue/30">
        <div className='w-[1150px] flex items-center justify-between ml-[100px]'>
          <div className="flex flex-col p-[20px]">
            <div className="flex justify-center">
              <span className="text-[48px] font-bold text-custom-blue mr-[15px]">Search, Match</span>
              <span className="text-[48px] font-bold mr-[15px]">and</span>
              <span className="text-[48px] font-bold text-custom-blue"> Link</span>
            </div>
            <div className="flex flex-col items-start">
              <span className='text-[16px] font-semibold'>실력만큼 중요해진 기회!</span>
              <span className='text-[16px] font-semibold'>그리고 그 기회는 인간 관계 속에서 발생합니다</span>
            </div>
          </div>
          <Lottiefile/>
        </div>
        <button>
          <MdDoubleArrow style={{ height: 60, width: 60, color:"#bdbdbd", opacity:0.3, marginLeft:80}}/>
        </button>
      </div>
    </div>
  )
}
export default Mainfirst
