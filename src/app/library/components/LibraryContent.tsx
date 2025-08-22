"use client"

import Image from 'next/image';
import React from 'react'
import { AiFillPushpin } from "react-icons/ai";
import { Playlist, Song, UserDetails } from '../../../../types';
import UserSongs from './UserSongs';
import UserPlaylsts from './UserPlaylists';
import { useRouter } from 'next/navigation';
// import { useLoadPlaylistImage } from '@/hook/useLoadAvatar';
interface LibraryContentProps {
  userSongs: Song[]
  userPlaylists: Playlist[]
  userData: UserDetails,
  likedSongs : number
}

const LibraryContent: React.FC<LibraryContentProps> = (
  {
    userSongs,
    userPlaylists,
    userData,
    likedSongs
  }
) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/liked')
  }
  return (
    <div className='flex gap-x-2 bg-neutral-900 mt-2 mb-1'>
         {/* fetch user songs */}
      <div className='flex flex-col space-y-0.5 overflow-y-auto'>
        <div className='flex gap-x-4 items-center p-3' onClick={onClick}>
          {/* image song */}
          <Image src={"/images/liked.png"} alt='likedsongs'
            width={60}
            height={60}
            className=''
          />
          <div className='flex flex-col'>

            <h1 className='text-white font-semibold '>Liked Songs</h1>
            <p className='text-neutral-600 flex items-center gap-x-1'>
              <span><AiFillPushpin size={15} className='text-green-500' />
              </span>Playlist &bull; {likedSongs} Songs </p>
          </div>
        </div>
        <div className='mb-[7em]'>
          {
            userSongs.map((song) => (
              <UserSongs key={song.id} data={song} />
            ))
          }
          {
            // map playlists
            userPlaylists.map((playlist) => (
              <UserPlaylsts data={playlist} key={playlist.id} user={userData} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default LibraryContent
