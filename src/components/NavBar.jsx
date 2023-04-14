import React from 'react';
import SplitButton from './SplitButton';
import SearchBox from './SearchBox';

export default function NavBar() {
  return (
    <nav className='w-full h-60 flex flex-col justify-start items-center bg-ECF0F1'>
      <div className='bg-193B48 h-1/2 w-full'></div>
      <div className='flex flex-row justify-center items-center gap-5 w-8/12 h-28 bg-white rounded relative -top-14'>
        <div className='flex flex-row justify-center gap-5 w-8/12 h-10'>
          <SearchBox />
          <SplitButton />
        </div>
      </div>
    </nav>
  )
}
