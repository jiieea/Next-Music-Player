import React from 'react'
import { Song } from '../../types'


interface UserSongsProps {
    songs : Song[]
}
const UserSongs : React.FC<UserSongsProps> = ({
    songs
}) => {
  return (
    <div>
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

export default UserSongs
