"use client"
import Image from 'next/image'
import React from 'react'
import { useLoadPlaylistImage } from '@/hook/useLoadAvatar'
import PlayButton from './PlayButton'
import { useRouter } from 'next/navigation'
import {UserPlaylistProps} from '../Interfaces/types'

export const UserPlaylist: React.FC<UserPlaylistProps> = ({ playlist, user, href }) => {
    const loadImage = useLoadPlaylistImage(playlist);
    const playlistTitle = playlist.playlist_name;
    const router = useRouter()

    const onClick = () => {
        router.push(href)
    }

    return (
        <div 
          className='relative 
            group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 
            bg-neutral-400/5 hover:bg-neutral-400/10
            cursor-pointer transition p-2 
            w-full max-w-xs sm:max-w-sm lg:max-w-md
            ' 
            onClick={onClick}>
            <div className='relative aspect-square w-full rounded-md overflow-hidden'>
                <Image
                    src={loadImage!}
                    alt='playlistImage'
                    fill
                    className='object-cover'
                />
            </div>
            <div className='flex flex-col mb-3 mt-3 w-full'>
                <p className='text-white font-semibold truncate'>{playlistTitle}</p>
                <p className="font-semibold text-neutral-400 text-[15px] truncate">
                    Playlist &bull; {user.full_name}
                </p>
            </div>

            <div className='absolute right-5 bottom-5 pr-3'>
                <PlayButton />
            </div>
        </div>
    )
}