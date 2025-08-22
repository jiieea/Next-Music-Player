"use client"

import Image from 'next/image'
import React from 'react'
import { Playlist, UserDetails } from '../../../../types'
import { useLoadPlaylistImage } from '@/hook/useLoadAvatar'


interface UserPlaylistsProps {
    data : Playlist
    user : UserDetails
}
 const UserPlaylists:React.FC<UserPlaylistsProps > = (
    {
        data,
        user
    }
) => {
    const loadImage = useLoadPlaylistImage(data);
    const userName = user.full_name
    return (
        <>
            <div className='flex gap-x-4 items-center p-3  ' key={data.id}>
                {/* image song */}
                <Image src={loadImage || "/images/liked.png"} alt='playlistimage'
                    width={60}
                    height={60}
                    className=''
                />
                <div className='flex flex-col'>
                    <h1 className='text-white font-semibold '>{data.playlist_name}</h1>
                    <p className='text-neutral-600'>   playlist &bull; { userName} </p>
                </div>
            </div>
        </   >
    )
}


export default  UserPlaylists