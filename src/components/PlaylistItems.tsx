import Image from 'next/image'
import React from 'react'
import { Playlist } from '../../types'
import { useLoadPlaylistImage } from '@/hook/useLoadAvatar'

interface PlaylistProps {
    playlist : Playlist
}

const PlaylistItems:React.FC<PlaylistProps> = (
    {
        playlist
    }
) => {
    const playlistImage = useLoadPlaylistImage(playlist)
  return (
    <div className='flex flex-col gap-y-2'>
      <Image 
      src={playlistImage || "/images/liked.png"}
      alt='playlist image'
      width={40}
      height={40}
      className='object-cover'
      />
    </div>
  )
}

export default PlaylistItems
