export const revalidate = 0;

import getLikedSong from '@/action/getLikedSong';
import Header from '@/components/Header';
import Image from 'next/image';
import React from 'react'
import LikedContent from '@/components/LikedContent';


const page = async () => {
  const likedSongs = await getLikedSong();
  return (
    <div
      className="
    bg-neutral-900
     w-full h-full overflow-y-auto
      overflow-hidden rounded-lg">
      <Header>
        <div className='mt-8 pt-4 flex items-center gap-x-4' >
          <Image src="/images/liked.png" alt="Liked Songs"  width={95} height={95}
          className="relative object-cover rounded-md mb-4 w-24 lg:w-50  " />
        <div className='flex flex-col'>
          <p className='text-[1rem] font-semibold text-white'>Playlist</p>
          <p className='text-4xl font-semibold text-white lg:text-8xl'>Liked Songs</p>
          <p className='text-white font-semibold text-[13px]'>user , songs liked</p>
        </div>
          </div>
      </Header>

    <LikedContent  songs= {likedSongs} />
    </div>
  )
}

export default page
