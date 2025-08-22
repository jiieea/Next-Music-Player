export const revalidate = 0;

import getLikedSong from '@/action/getLikedSong';
import Header from '@/components/Header';
import Image from 'next/image';
import React from 'react'
import LikedContent from '@/components/LikedContent';
import getUserData from '@/action/getUserData';
import { MobileNavbar } from '@/components/MobileNavbar';

const page = async () => {
  const likedSongs = await getLikedSong();
  const user = await getUserData();
  return (
    <div
      className="
    bg-neutral-900
      w-full h-full overflow-y-auto
      overflow-hidden rounded-lg mb-11 md:mb-0">
      {
        user && (
          <Header userData={user} className='bg-gradient-to-b from-violet-700'>
            <div className='mt-8 pt-4 flex items-center gap-x-4' >
              <Image
                src="/images/liked.png"
                alt="Liked Songs"
                width={200} // Increased width to match lg:w-50 (200px)
                height={200} // Increased height to match lg:w-50 (200px)
                className="relative object-cover rounded-md mb-4 w-24 lg:w-50"
              />
              <div className='flex flex-col'>
                <p className='text-[1rem] ps-0 md:ps-2 font-semibold text-white'>Playlist</p>
                <p className='text-4xl font-semibold text-white lg:text-8xl'>Liked Songs</p>
                <div className="flex">
                  {/* <Image src={user.avatar_url}/> */}
                  <p className='ps-0 md:ps-2 text-white font-semibold text-[13px]'>{user.full_name || "user"}  <span className='text-neutral-400'>&bull; {likedSongs.length} {
                    likedSongs.length === 1 ? "Song" : "Songs"} Liked</span></p>

                </div>
              </div>
            </div>
          </Header>
        )
      }
      <LikedContent songs={likedSongs} />
      <div className="fixed bottom-0 w-full px-0 md:hidden">
      <MobileNavbar />
      </div>
    </div>
    
  )
}

export default page
