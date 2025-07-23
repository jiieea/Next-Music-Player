import React from 'react'
import { Song } from '../../types'
import MediaItem from './MediaItem'
import LikedButton from './LikedButton'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
interface PlayerContentProps {
    song: Song,
    songUrl: string
}
export const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    const Icon = true ? BsPauseFill : BsPlayFill;
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikedButton songId={song.id} />
                </div>
            </div>
            <div className='flex md:hidden col-auto w-full justify-end items-center'>
                <div
                    onClick={() => { }}
                    className='h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer'
                >
                    <Icon className='text-black ' size={30} />
                </div>
            </div>
            <div
                className='hidden w-full md:flex justify-center items-center 
                 h-full max-w-[722px] gap-x-6'>
                <AiFillStepBackward onClick={() => { }}
                    className='text-neutral-400 cursor-pointer hover:text-white transition' size={30} />
            <div onClick={() => {}} className='flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer'>
                <Icon size={30} className='text-black ' />
            </div>
            <AiFillStepForward  size={30} className='text-neutral-400 cursor-pointer hover:text-white transition' onClick={() => {}}/>
            </div>
        </div>
    )
}
