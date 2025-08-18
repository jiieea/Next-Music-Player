
import React from 'react'
import LibraryHeader from './components/LibraryHeader';
import getUserData from '@/action/getUserData';
const Page = async() => {
    const userData = await getUserData();
  return (
    <div className='w-full h-full
     bg-neutral-900 rounded-md md:hidden p-5'>
      {/* Header */}
    <LibraryHeader  user={ userData}/>
    </div>
  )
}

export default Page;