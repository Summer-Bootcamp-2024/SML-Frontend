import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import FriendGraph from '../components/friend/FriendGraph';
import FriendList from '../components/friend/FriendList';

function FriendListPage() {
  const [clickOption, setClickOption] = useState('graph');
  
  const onClickHandler = (value) => {
    setClickOption(value);
  }

  const getButtonClasses = (option) => {
    const baseClasses = 'justify-center items-center flex w-[130px] h-[50px] border-2 rounded-[10px] ml-[20px] text-[18px] hover:cursor-pointer';
    const activeClasses = 'border-custom-indigo bg-custom-indigo text-white font-semibold';
    const inactiveClasses = 'border-custom-grey bg-custom-white text-custom-grey hover:text-custom-indigo hover:font-semibold hover:border-custom-indigo';
    return `${baseClasses} ${clickOption === option ? activeClasses : inactiveClasses}`;
  }

  return (
    <div className='flex w-full h-[100vh] font-[Pretendard]'>
      <Sidebar/>
      <div className="flex flex-col ml-[296px] items-center w-[calc(100vw-296px)] ">
        <div className="flex h-[20%] items-center justify-start w-full border-b-[1px] border-custom-blue">
          <button
            className={getButtonClasses('graph')}
            onClick={() => onClickHandler('graph')}
          >
            일촌 그래프
          </button>
          <button
            className={getButtonClasses('list')}
            onClick={() => onClickHandler('list')}
          >
            일촌 목록
          </button>
        </div>
        <div className='flex items-center justify-center w-full h-full'>
          {clickOption === 'graph' ? <FriendGraph /> : <FriendList />}
        </div>
      </div>
    </div>
  );
}

export default FriendListPage;
