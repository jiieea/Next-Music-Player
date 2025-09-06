"use client"
import React from 'react'
import useLoadImage from '@/hook/useLoadImage'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'
import usePlayerSong from '@/hook/usePlayerSong'
import useLoadSongUrl from '@/hook/useLoadSongUrl'
import useGetSongDuration from '@/hook/useGetSongDuration'
import { MediaItemProps } from '../Interfaces/types'
const MediaItem: React.FC<MediaItemProps> = ({
    data,
    onClick
}) => {
    const imagePath = useLoadImage(data);
    const player = usePlayerSong();
    const songUrl = useLoadSongUrl(data);
    const songDuration = useGetSongDuration(songUrl);

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id)
        }
        return player.setId(data.id)
    }
    return (
        <div
            className="
          flex 
          items-center 
          gap-x-3 
          cursor-pointer 
          w-full 
          p-3 
          rounded-md
        "
            onClick={handleClick}
        >
            <div className="relative min-h-[49px] min-w-[49px] rounded-md overflow-hidden group"> {/* Added group class */}
                <Image
                    alt="song image"
                    src={imagePath || "/images/liked.png"}
                    fill
                    className="object-cover transition-all duration-300 group-hover:brightness-50" // Adjusted brightness and transition
                />
                <div
                    className="
              absolute 
              inset-0 
              flex 
              items-center 
              justify-center 
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            " // Fade in play button on hover
                >
                    <FaPlay className="text-white text-2xl" /> {/* Increased icon size */}
                </div>
            </div>
            <div className="flex flex-col flex-grow justify-center gap-y-1 w-[150px] md:w-full">
                <p className="text-white font-semibold text-base truncate text-[12px] md:text-[15px]  w-[100px]">{data.title}</p>
                <p className="text-neutral-400 text-sm truncate text-[12px] md:text-[13px]">{data.author}</p>
            </div>
            {songDuration && (
                <p className="text-neutral-400 text-sm ml-auto hidden md:block">{songDuration}</p>
            )}
            
          
        </div>
    )
}

export default MediaItem