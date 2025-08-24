"use client"

import useLoadImage from '@/hook/useLoadImage'
import Image from 'next/image'
import React from 'react'
import { Song } from '../../../../types'
import usePlayerSong from '@/hook/usePlayerSong'
// import useLoadSongUrl from '@/hook/useLoadSongUrl'

interface UserSongsProps {
    data : Song,
    onHandlePlaySong : (id : string) => void;
}
const UserSongs:React.FC<UserSongsProps>= (
    {
        data
        , onHandlePlaySong
    }
) => {
    const loadImgUrl = useLoadImage(data);
    // const songUrl = useLoadSongUrl(data);
    const player = usePlayerSong()


const handlePlaySong =() => {
  if(onHandlePlaySong) {
    return onHandlePlaySong(data.id);
  }else {
    return player.setId(data.id)
  }
}
  return (
    <>
      <div className='flex gap-x-4 items-center p-3' key={data.id} onClick={handlePlaySong}>
                     {/* image song */}
                     <Image src={loadImgUrl || "/images/liked.png"} alt='playlistimage'
                       width={60}
                       height={60}
                       className=''
                     />
                     <div className='flex flex-col'>
                       <h1 className='text-white font-semibold '>{ data.title }</h1>
                       <p className='text-neutral-600'>   songs &bull; { data.author}</p>
                     </div>
                   </div>
    </>
  )
}

export default UserSongs
