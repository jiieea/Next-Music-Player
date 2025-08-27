import React from 'react'
import getUserData from '@/action/getUserData';
import { MobileNavbar } from '@/components/MobileNavbar';
import getSongById from '@/action/getSongsById';
import getPlaylistByUserId from '@/action/getPlaylistByUserId';
import getLikedSong from '@/action/getLikedSong';
import { LibraryChildComponent } from './components/LibraryChildComponent';

const Page = async () => {
  const userData =await getUserData()
  const userSongs = await getSongById();
  const userPlaylists = await getPlaylistByUserId();
  const userLikedSongs  = await getLikedSong();
  const likedSongs = userLikedSongs.length;

  return (
    <div className='w-full h-full bg-neutral-900 rounded-md md:hidden '>
      <LibraryChildComponent 
        userData={ userData !}
        userSongs={ userSongs}
        userPlaylists={ userPlaylists}
        liked={ likedSongs}
      />

      {/* Mobile Navbar with full width */}
      <div className='bottom-0 fixed w-full md:hidden'>
        <MobileNavbar />
      </div>
    </div>
  )
}

export default Page;