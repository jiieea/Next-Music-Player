"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import PlaylistOption from './PlaylistOption'
import { Button } from '@/components/ui/button'
import { CiGlobe } from "react-icons/ci";
import PlaylistOptionMobile from './PlaylistOptionMobile'
import { PlaylistHeaderProps } from '../../../Interfaces/types'
import { FaPlus } from "react-icons/fa6";
import SortButtonSheet from './SortButtonSheet'
import UpdateButtonModal from './UpdateButtonModal'
import { useUsers } from '@/hook/useUser'
import { useLoadAvatar } from '@/hook/useLoadAvatar'

export const PlaylistHeader: React.FC<PlaylistHeaderProps> = (
    {
        playlistImage,
        playllistDataOwner,
        sort,
        onHandleSortByTitle,
        onHandlePlaylistImageClick,
        onHandleAccountPush,
        totalDuration,
        playlistSongs,
        playlistData,
        onHandleRemovePlaylist,
        Icon,
        onHandleSortByArtist,
        onHandleSortByDate,
        songs
    }
) => {
    const { description, user_id } = playlistData;
    const [disabled, setDisabled] = useState(false);
    const userName = playllistDataOwner.full_name
    const avatar = useLoadAvatar(playllistDataOwner)
    const { user } = useUsers()
    useEffect(() => {
        if (user?.id !== user_id) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [user_id, user?.id, disabled]);


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
            <div className='flex flex-col justify-start  space-y-2.5 w-full md:w-2/3'>
                <div className='flex justify-start flex-col'>
                    <p className='text-[1rem] ps-0 md:ps-2 font-semibold text-white md:block hidden'>Playlist</p>
                    <p
                        className='md:text-4xl text-2xl font-semibold text-start text-white ml-[-1rem] md:ml-0 md:ps-2   w-full'>
                        {playlistData?.playlist_name} </p>
                    {
                        description && (
                            <p className='ml-[-1rem] text-neutral-400 text-start font-semibold text-[13px] md:text-[16px] md:ps-2 md:ml-0'>
                                {description}
                            </p>
                        )
                    }
                    <div className='flex gap-x-1 items-center ml-[-1.5em] md:ml-0'>
                        <div className='w-10 h-10 flex items-center justify-center  md:ml-0'>
                            <Image
                                src={avatar || '/images/liked.png'}
                                alt='User avatar'
                                height={20}
                                width={20}
                                onClick={onHandleAccountPush}
                                className='rounded-full object-cover w-2/3 h-2/3' />
                        </div>
                        <p className='text-white font-semibold text-sm mr-3 hover:underline transition'
                            onClick={onHandleAccountPush}>
                            {userName} &bull;
                        </p>
                        <p className='text-neutral-500 font-semibold'> { playlistSongs.length } titles,</p>
                            <p className='text-neutral-500 font-semibold text-sm md:text-[14px ] '>
                                {
                                    totalDuration
                                }
                            </p>
                    </div>
                </div>
                {/* This div is shown only on mobile */}
                <div className="flex-col md:flex-row flex items-center">
                    <div className='flex gap-x-2   md:items-center ml-[-12em] md:ml-0 flex-col md:flex-row'>
                        <div className="flex gap-x-2  flex-col ">
                            <div className='flex  items-center gap-y-1 hidden'>
                                <div className='w-10 h-10 flex items-center justify-center  md:ml-0'>
                                    <Image
                                        src={avatar || '/images/liked.png'}
                                        alt='User avatar'
                                        height={20}
                                        width={20}
                                        onClick={onHandleAccountPush}
                                        className='rounded-full object-cover w-2/3 h-2/3' />
                                </div>
                                <p className='text-white md:text-neutral-400 font-semibold text-sm mr-3 hover:underline transition'
                                    onClick={onHandleAccountPush}>
                                    {playllistDataOwner.full_name}
                                </p>
                                <p className='font-semibold text-neutral-400 hidden md:block text-[15px]'>
                                    &bull; {playlistSongs.length} {playlistSongs.length === 1 ? 'title' : 'titles'}
                                </p>
                            </div>
                            <div className='flex gap-x-4 items-center md:hidden ml-[-1rem]'>
                                <CiGlobe size={22} className='text-neutral-500 ' />
                                <p className='text-neutral-500 font-semibold text-sm md:text-[14px ] '>
                                    {
                                        totalDuration
                                    }
                                </p>
                            </div>
                        </div>
                        {/* This div is shown on all screens but with responsive padding */}
                        <div className=' gap-1 items-center py-2 px-2 md:ml-0 hidden md:flex'>
                            <CiGlobe size={15} className='text-neutral-500 md:hidden' />
                            <p className='text-neutral-500 md:hidden font-semibold text-sm md:text-[14px ] '>
                                {
                                    totalDuration
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex  items-center justify-start  md:flex-row mr-[-1.5em] ml-[-2em] md:ml-0 md:mr-0 gap-x-2 flex-row-reverse">
                    <Button onClick={onHandlePlaylistImageClick} variant="ghost" className='bg-green-500 rounded-full hover:bg-green-300 transition hover:scale-110' >
                        <Icon className='text-black ' />
                    </Button>
                    <PlaylistOption
                        playlistData={playlistData}
                        onHandleRemovePlaylist={onHandleRemovePlaylist} />
                    {/* playlist option mobile visible */}
                    <PlaylistOptionMobile
                        playlistSongs={playlistSongs}
                        disabled={disabled}
                        songs={songs}
                        playlistImage={playlistImage}
                        playlistData={playlistData}
                        userName={userName!}
                    />
                    {/* buttons to add sorting logic add song and update playlist */}
                    <div className='flex gap-x-3 items-center md:hidden'>
                        <Button variant="secondary" disabled={disabled} className='rounded-2xl p-1 bg-neutral-800'>
                            <FaPlus className='text-white' size={10} />
                            <p className='text-white font-semibold text-[10px] '>Add song</p>
                        </Button>
                        <SortButtonSheet
                            onHandleSort={onHandleSortByTitle}
                            sort={sort}
                            onHandleSortByArtist={onHandleSortByArtist}
                            onHandleSortByDate={onHandleSortByDate}
                        />
                        <UpdateButtonModal
                            disabled={disabled}
                            playlistData={playlistData}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}