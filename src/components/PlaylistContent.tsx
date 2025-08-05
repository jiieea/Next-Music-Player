import React from 'react'
import { Song } from '../../types'


interface PlaylistContentProps {
    songs : Song[]
}
export const PlaylistContent:React.FC<PlaylistContentProps> = ({
    songs
}) => {
  return (
    <div className='text-white'>
        {
            songs.map((song) => (
                <p key={song.id} className='text-white'>
                    {song.title}
                </p>
            ))
        }
    </div>
  )
}
