import React, { useState, useRef, useEffect } from 'react';
import Mainfirst from '../components/main/Mainfirst';
import Mainsecond from '../components/main/Mainsecond';
import Mainthird from '../components/main/Mainthird';
import Header from '../components/main/Header';
import { MdDoubleArrow } from "react-icons/md";

function MainPage() {
  const COPIED_NUM = 3; //슬라이드 수
  const [slideIndex, setSlideIndex] = useState(0); //슬라이드 인덱스
  const slideRef = useRef(null); //슬라이드 컨테이너 참조 -> 동적으로 제어하기위해

  const slideHandler = (direction) => { //버튼 클릭시 슬라이드 이동
    setSlideIndex((prevIndex) => (prevIndex + direction + COPIED_NUM) % COPIED_NUM);
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = "all 500ms ease-in-out";
      slideRef.current.style.transform = `translateX(${-1 * ((100 / COPIED_NUM) * slideIndex)}%)`;
    }
  }, [slideIndex]);

  return (
    <>
      <Header />
      <div className="relative w-full overflow-hidden">
        <div
          ref={slideRef}
          className="flex"
          style={{ width: `${100 * COPIED_NUM}vw`}}
        >
          <div className="flex w-full h-full">
            <Mainfirst />
          </div>
          <div className="flex w-full h-full">
            <Mainsecond />
          </div>
          <div className="flex w-full h-full">
            <Mainthird />
          </div>
        </div>
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={() => slideHandler(-1)}
        >
          <MdDoubleArrow className="w-10 h-10 text-white transform rotate-180" />
        </button>
        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={() => slideHandler(1)}
        >
          <MdDoubleArrow className="w-10 h-10 text-white" />
        </button>
      </div>
    </>
  );
}

export default MainPage;
