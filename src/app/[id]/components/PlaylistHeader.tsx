"use client"
import Image from 'next/image'
import React from 'react'
import PlaylistOption from './PlaylistOption'
import { Playlist, Song } from '../../../../types'

interface PlaylistHeaderProps {
    playlistImage: string
    imageUrl: string,
    onHandleAccountPush: () => void,
    userName : string,
    onHandleRemovePlaylist : (playlistId : string) => void,
    playlistData : Playlist,
    playlistSongs : Song[]

}

export const PlaylistHeader: React.FC<PlaylistHeaderProps> = (
    {
        playlistImage,
        imageUrl,
        onHandleAccountPush,
        userName,
        playlistSongs,
        playlistData,
        onHandleRemovePlaylist
    }
) => {
    return (
        <div className='mt-8 pt-4 flex items-center gap-x-4 flex-col md:flex-row md:items-start md:text-start justify-center text-center md:justify-start p-3'>
            <Image
                src={playlistImage || '/images/liked.png'}
                alt='playlist image'
                width={250}
                height={250}
                quality={100}
                className='relative object-cover rounded-md mb-4 w-45 md:w-50 h-45 md:h-50'
            />
            <div className='flex flex-col justify-start space-y-2.5 w-full md:w-2/3'>
                <p className='text-[1rem] ps-0 md:ps-2 font-semibold text-white md:block hidden'>Playlist</p>
                <p className='text-2xl font-semibold text-start text-white md:text-4xl lg:text-8xl w-full'>{playlistData?.playlist_name}</p>
                {/* This div is shown only on mobile */}
                <div className="flex-col md:flex-row flex items-center">
                    <div className='flex gap-x-2 items-center'>
                        <div className='w-10 h-10 flex items-center justify-center'>
                            <Image
                                src={imageUrl || '/images/liked.png'}
                                alt='User avatar'
                                height={20}
                                width={20}
                                onClick={onHandleAccountPush}
                                className='rounded-full object-cover w-2/3 h-2/3' />
                        </div>
                        <p className='text-neutral-400 font-semibold text-sm mr-3 hover:underline transition'
                            onClick={onHandleAccountPush}>
                            { userName }
                        </p>
                    </div>
                    {/* This div is shown on all screens but with responsive padding */}
                    <div className='flex gap-x-3 md:gap-x-4 items-center'>
                        <p className='ps-0 md:ps-2 font-semibold text-neutral-400'>
                            {playlistSongs.length} {playlistSongs.length === 1 ? 'song' : 'songs'}
                        </p>
                        <PlaylistOption
                            playlistData={playlistData}
                            onHandleRemovePlaylist={onHandleRemovePlaylist} />
                    </div>
                </div>
            </div>
        </div>
    )
}