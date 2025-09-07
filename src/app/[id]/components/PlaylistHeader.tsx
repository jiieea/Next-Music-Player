"use client"
import Image from 'next/image'
import React from 'react'
import PlaylistOption from './PlaylistOption'
import { Button } from '@/components/ui/button'
import { CiGlobe } from "react-icons/ci";
import PlaylistOptionMobile from './PlaylistOptionMobile'
import { PlaylistHeaderProps } from '../../../Interfaces/types'


export const PlaylistHeader: React.FC<PlaylistHeaderProps> = (
    {
        playlistImage,
        imageUrl,
        onHandlePlaylistImageClick,
        onHandleAccountPush,
        userName,
        totalDuration,
        playlistSongs,
        playlistData,
        onHandleRemovePlaylist,
        Icon
    }
) => {
    const { description } = playlistData;
    return (
        <div className='mt-8 pt-4 flex items-center gap-x-4 flex-col md:flex-row md:items-start md:text-start justify-center text-center md:justify-start p-3'>
            <Image
                src={playlistImage || '/images/liked.png'}
                alt='playlist image'
                width={250}
                height={250}
                quality={100}
                className='relative  object-cover rounded-md mb-4 w-45 md:w-50 h-45 md:h-50'
            />
            <div className='flex flex-col justify-start space-y-2.5 w-full md:w-2/3'>
                <p className='text-[1rem] ps-0 md:ps-2 font-semibold text-white md:block hidden'>Playlist</p>
                <p
                    className='md:text-4xl text-2xl font-semibold text-start text-white ml-[-1rem] md:ml-0 md:ps-2   w-full'>
                    {playlistData?.playlist_name} </p>
                {
                    description && (
                        <p className='text-neutral-400 font-semibold text-[13px] md:text-[16px] md:ps-2 ml-[-12em] md:ml-0'>
                            {description}
                        </p>
                    )
                }
                {/* This div is shown only on mobile */}
                <div className="flex-col md:flex-row flex items-center">
                    <div className='flex gap-x-2  md:items-center ml-[-12em] md:ml-0 flex-col md:flex-row'>
                        <div className="flex gap-x-2 items-center ">
                            <div className='w-10 h-10 flex items-center justify-center ml-3 md:ml-0'>
                                <Image
                                    src={imageUrl || '/images/liked.png'}
                                    alt='User avatar'
                                    height={20}
                                    width={20}
                                    onClick={onHandleAccountPush}
                                    className='rounded-full object-cover w-2/3 h-2/3' />
                            </div>
                            <p className='text-white md:text-neutral-400 font-semibold text-sm mr-3 hover:underline transition'
                                onClick={onHandleAccountPush}>
                                {userName}
                            </p>
                        </div>
                        {/* This div is shown on all screens but with responsive padding */}
                        <div className='flex gap-x-1  items-center md:ml-[-1em]'>
                            <p className='ps-0 md:ps-2 font-semibold text-neutral-400 hidden md:block text-[13px]'>
                                &bull; {playlistSongs.length} {playlistSongs.length === 1 ? 'title' : 'titles'} ,
                            </p>
                            <div className='flex gap-1 items-center p-2 ml-3 md:ml-0'>
                                <CiGlobe size={15} className='text-neutral-500 md:hidden' />
                                <p className='text-neutral-500 font-semibold text-sm md:text-[14px ] '>
                                    {
                                        totalDuration
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-x-2 items-center justify-start flex-row-reverse md:flex-row mr-[-1.5em] md:mr-0">
                    <Button onClick={onHandlePlaylistImageClick} variant="ghost" className='bg-green-500 rounded-full hover:bg-green-300 transition hover:scale-110' >
                        <Icon className='text-black' />
                    </Button>
                    <PlaylistOption
                        playlistData={playlistData}
                        onHandleRemovePlaylist={onHandleRemovePlaylist} />
                    {/* playlist option mobile visible */}
                    <PlaylistOptionMobile
                        playlistImage={playlistImage}
                        playlistData={playlistData}
                        userName={userName}
                    />
                </div>
            </div>
        </div>
    )
}