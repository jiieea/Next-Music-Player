"use client"
import Header from '@/components/Header'
import React from 'react'
import { Song, UserDetails } from '../../../../types'
import { useUsers } from '@/hook/useUser'
import Image from 'next/image'
import { useLoadPlaylistImage } from '@/hook/useLoadAvatar'
import { PlaylistContent } from '@/components/PlaylistContent'

interface PlaylistPageProps {
    userData?: UserDetails
    songs : Song[]
}

const PlaylistPage: React.FC<PlaylistPageProps> = (
    {
        userData,
        songs
    }
) => {
    const { playlist } = useUsers();
    const playlistImage = useLoadPlaylistImage(playlist!);
    return (
        <>
            <Header className='bg-gradient-to-b from-blue-500' userData={userData}  >
                <div className='mt-8 pt-4 flex items-center gap-x-4'>
                    <Image
                        src={playlistImage || "/images/liked.png"}
                        alt='playlist image'
                        width={200}
                        height={200}
                        className='relative object-cover rounded-md mb-4 w-24 lg:w-50'
                    />
                    <div className='flex flex-col'>
                        <p className='text-[1rem] ps-0 md:ps-2 font-semibold text-white'>Playlist</p>
                        <p className='text-4xl font-semibold text-white lg:text-8xl'>{playlist?.playlist_name}</p>
                        <p className=' ps-0 md:ps-2 font-semibold text-white'>{ songs.length } {
                            songs.length == 1  ?  "song" : "songs"
}
                        </p>
                    </div>
                </div>

            </Header>
        {/* we get the playlist songs from the new playlist songs bucket */}
        <PlaylistContent songs={ songs } />
        </>
    )
}

export default PlaylistPage
