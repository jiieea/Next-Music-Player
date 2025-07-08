'use client'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'
const Library = () => {
    const addToPlaylist = () => {
        alert('ok');
    }
    return (
        <div className="flex flex-col">
            <div className="flex
        items-center justify-between
        px-5 pt-4">
                <div className='inline-flex gap-x-2 '>
                    <TbPlaylist size={26} className='text-neutral-400' />
                    <p className='text-neutral-400 font-medium text-md'>Your Library</p>
                </div>
                <AiOutlinePlus
                    className='cursor-pointer text-neutral-500
                 hover:text-white transition' onClick={addToPlaylist}
                    size={20} />
            </div>
            <p className='text-white font-semibold px-5 pt-2'>List of songs!</p>
        </div>
    )
}

export default Library
