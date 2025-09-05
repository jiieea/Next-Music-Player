"use client"

import Image from 'next/image'
import React from 'react'
import { Playlist, UserDetails } from '../../../../types'
import { useLoadPlaylistImage } from '@/hook/useLoadAvatar'
import { useRouter } from 'next/navigation'


interface UserPlaylistsProps {
    data: Playlist
    user: UserDetails
    href: string
}
const UserPlaylists: React.FC<UserPlaylistsProps> = (
    {
        data,
        href,
        user
    }
) => {
    const loadImage = useLoadPlaylistImage(data);
    const userName = user.full_name
    const router = useRouter();

    const onClick = () => {
        router.push(href)
    }
    return (
        <>
            <div className='flex gap-x-4 items-center p-3 ' key={data.id} onClick={onClick}>
                {/* image song */}
                <div className='w-16 h-16'>
                    <Image
                        src={loadImage || "/images/liked.png"}
                        alt='playlistimage'
                        width={60} // 56px = 3.5rem (w-14)
                        height={60} // 56px = 3.5rem (h-14)
                        className='object-cover h-full w-full'
                        onClick={ onClick}
                    />
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-white font-semibold '>{data.playlist_name}</h1>
                    <p className='text-neutral-600'>playlist &bull; {userName} </p>
                </div>
            </div>
        </>
    )
}

export default UserPlaylists