import React, { useState, useRef, useEffect } from 'react';
import Mainfirst from '../components/main/Mainfirst';
import Mainsecond from '../components/main/Mainsecond';
import Mainthird from '../components/main/Mainthird';
import Header from '../components/main/Header';
import { MdDoubleArrow } from "react-icons/md";

const useInterval = (callback, interval) => {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (interval !== 10000) {
      let id = setInterval(tick, interval);
      return () => clearInterval(id);
    }
  }, [interval]);
};

function MainPage() {
  const SLIDE_NUM = 3; //슬라이드 수
  const [slideIndex, setSlideIndex] = useState(1); // 1로 시작
  const slideRef = useRef(null);
  const [customInterval, setCustomInterval] = useState(4000); //슬라이드가 4초씩 이동

  const slideHandler = (direction) => { //버튼 클릭 시 슬라이드 이동, -1은 왼쪽 +1은 오른쪽
    setSlideIndex((prevIndex) => prevIndex + direction);
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = "all 500ms ease-in-out"; //이미지 변경 효과(0.5초동안)
      slideRef.current.style.transform = `translateX(${-1 * (100 / (SLIDE_NUM + 2)) * slideIndex}%)`;//하나의 슬라이드(20%)만큼 이동
    }
  }, [slideIndex]);

  useInterval(() => setSlideIndex((slideIndex) => slideIndex + 1), customInterval); //자동 슬라이드

  useEffect(() => {
    if (slideIndex === 0) { //클론된 마지막 슬라이드
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.transition = "none"; //클론 슬라이드 이므로 애니메이션 비활성화
          setSlideIndex(SLIDE_NUM); //클론된 슬라이드와 같은 마지막 슬라이드로 설정
          slideRef.current.style.transform = `translateX(${-1 * (100 / (SLIDE_NUM + 2)) * SLIDE_NUM}%)`; //마지막 슬라이드로 이동
        }
      }, 500);
    } else if (slideIndex === SLIDE_NUM + 1) { //클론된 첫 슬라이드
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.transition = "none"; 
          setSlideIndex(1); // 첫번째 슬라이드로 이동
          slideRef.current.style.transform = `translateX(${-1 * (100 / (SLIDE_NUM + 2)) * 1}%)`;
        }
      }, 500);
    } else {
      if (slideRef.current) {
        slideRef.current.style.transition = "all 500ms ease-in-out";
      }
    }
  }, [slideIndex, SLIDE_NUM]);

  useEffect(() => {
    if (slideIndex === 4) { // 마지막 인덱스
      setCustomInterval(1000); //클론슬라이드이므로 기존의 2배속도로 이미지 효과 
    } else {
      setCustomInterval(4000); //그게 아니면 4초씩 이동
    }
  }, [slideIndex]);

  return (
    <>
      <Header />
      <div className="relative w-full overflow-hidden">
        <div
          ref={slideRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ width: `${100 * (SLIDE_NUM + 2)}%` }}
        >
          <div className="flex w-full h-full"> 
            <Mainthird />
          </div>
          <div className="flex w-full h-full">
            <Mainfirst />
          </div>
          <div className="flex w-full h-full">
            <Mainsecond />
          </div>
          <div className="flex w-full h-full">
            <Mainthird />
          </div>
          <div className="flex w-full h-full">
            <Mainfirst />
          </div>
        </div>
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={() => slideHandler(-1)}
        >
          <MdDoubleArrow className="w-10 h-10 transform rotate-180 text-custom-grey" />
        </button>
        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={() => slideHandler(1)}
        >
          <MdDoubleArrow className="w-10 h-10 text-custom-grey" />
        </button>
      </div>
    </>
  );
}

export default MainPage;
