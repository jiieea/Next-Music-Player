"use client"

import Image from 'next/image';
import React from 'react'
import { AiFillPushpin } from "react-icons/ai";
import { Playlist, Song } from '../../../../types';
import UserSongs from './UserSongs';
// import { useLoadPlaylistImage } from '@/hook/useLoadAvatar';

interface LibraryContentProps {
  userSongs: Song[]
  userPlaylists: Playlist[]
}

const LibraryContent: React.FC<LibraryContentProps> = (
  {
    userSongs,
    userPlaylists
  }
) => {
  return (
    <div className='flex gap-x-2'>
      <div className=''>
        {/* we create pills to sort what user search for  */}
        {/* code  */}
      </div>


      {/* fetch user songs */}
      <div className='flex flex-col space-y-0.5 overflow-y-auto'>
        <div className='flex gap-x-4 items-center p-3'>
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
              </span>Playlist &bull; Songs </p>
          </div>
        </div>
        {
          userSongs.map((song) => (
            <UserSongs key={song.id} data={song} />
          ))
        }
        {
          // map playlists
          userPlaylists.map((playlist) => (
            <div className='flex gap-x-4 items-center p-3' key={playlist.id}>
              {/* image song */}
              <Image src={ "/images/liked.png"} alt='playlistimage'
                width={60}
                height={60}
                className=''
              />
              <div className='flex flex-col'>
                <h1 className='text-white font-semibold '>{playlist.playlist_name}</h1>
                <p className='text-neutral-600'>   playlist &bull; </p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default LibraryContent
