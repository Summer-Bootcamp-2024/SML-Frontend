import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import FriendGraph from '../components/FriendGraph';
import FriendList from '../components/FriendList';



function FriendListPage() {
  const [sortOption, setSortOption] = useState('graph')
  
  const Sortoption = [
    { value: 'graph', name: 'Friend Graph' },
    { value: 'list', name: 'Friend List' },
  ]
  
  const onListHandler = (e) => {
    setSortOption(e.target.value)
    console.log(sortOption)
  }
  
  return (
   <div className='flex'>
    <Sidebar/>
    <div className='flex flex-col justify-center w-[calc(100vw-296px)] h-screen '>
      <select
      className='w-[170px] h-[45px] border-[1px] border-custom-grey bg-custom-white rounded-[10px] mt-[-20px] ml-[40px] font-semibold text-[18px] text-custom-indigo indent-[10px]'
      onChange={onListHandler}
      >
        {Sortoption.map((item) => (
          <option value={item.value} key={item.name} className='text-[18px]'>
            {item.name}
          </option>
        ))}
      </select>
      <div className='flex items-center justify-center w-full'>
      {sortOption ==='graph' ? <FriendGraph/> : <FriendList/>}
      </div>
    </div>
   </div>
  );
}

export default FriendListPage;
