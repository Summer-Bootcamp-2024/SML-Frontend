import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import FriendGraph from '../components/friend/FriendGraph';
import FriendList from '../components/friend/FriendList';



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
   <div className='flex font-[Pretendard]'>
    <Sidebar/>
    <div className='ml-[296px] flex flex-col justify-center w-[calc(100vw-296px)] h-screen'>
      <div className=' h-[20%] flex items-center border-b-[1px] border-custom-grey '>
      <select
        className='w-[170px] h-[45px] border-[1px] border-custom-grey bg-custom-white rounded-[10px] ml-[40px] font-semibold text-[18px] text-custom-indigo indent-[10px]'
        onChange={onListHandler}>
          {Sortoption.map((item) => (
            <option value={item.value} key={item.name} className='text-[18px]'>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex items-center justify-center w-full h-[80%]'>
      {sortOption ==='graph' ? <FriendGraph/> : <FriendList/>}
      </div>
    </div>
   </div>
  );
}

export default FriendListPage;
