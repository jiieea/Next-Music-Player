import React from 'react'
import LibraryHeader from './components/LibraryHeader';
import getUserData from '@/action/getUserData';
import { MobileNavbar } from '@/components/MobileNavbar';
import LibraryContent from './components/LibraryContent';
import getSongById from '@/action/getSongsById';
import getPlaylistByUserId from '@/action/getPlaylistByUserId';
import getLikedSong from '@/action/getLikedSong';

const Page = async () => {
  const userData = await getUserData();
  const userSongs = await getSongById();
  const userPlaylists = await getPlaylistByUserId();
  const userLikedSongs  = await getLikedSong();
  const likedSongs = userLikedSongs.length;



  return (
    <div className='w-full h-full bg-neutral-900 rounded-md md:hidden '>
      {/* Content wrapper with bottom padding */}
      <div className="p-5 border-b-2 border-black drop-shadow-xs ">
        <LibraryHeader user={userData} />
      </div>

      {/* library content */}
      <LibraryContent 
        userSongs={userSongs}
        likedSongs = { likedSongs }
        userPlaylists={userPlaylists}
        userData ={ userData !}
      />

      {/* Mobile Navbar with full width */}
      <div className='bottom-0 fixed w-full md:hidden'>
        <MobileNavbar />
      </div>
    </div>
  )
}

export default Page;