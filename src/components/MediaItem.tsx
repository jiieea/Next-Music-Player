"use client"
import React from 'react'
import { Song } from '../../types'
import useLoadImage from '@/hook/useLoadImage'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'
import usePlayerSong from '@/hook/usePlayerSong'
interface MediaItemProps {
    data: Song
    onClick?: (id: string) => void
}
const MediaItem: React.FC<MediaItemProps> = ({
    data,
    onClick
}) => {
    const imagePath = useLoadImage(data);
    const player = usePlayerSong()
    const handleClick = () => {
        if (onClick) {
            return onClick(data.id)
        }

        return player.setId(data.id)

    }
    return (
        <div className='
        flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-3 rounded-md
    ' onClick={handleClick}>
            <div className='relative min-h-[49px] min-w-[49px] overflow-hidden  rounded-md'>
                <Image alt='' src={imagePath || 'images/liked/png'} fill className='object-cover hover:brightness-30 transition ease-in-out' />
                <div className='absolute left-4 top-4  '>
                    <FaPlay className='opacity-0 hover:opacity-100 text-white transition' />
                </div>
            </div>
            <div>
                <p className='text-white font-semibold'>{data.title}</p>
                <p className='text-neutral-500 font-semibold text-[12px ] truncate'>{data.author}</p>
            </div>
        </div>
    )
}

export default MediaItem
