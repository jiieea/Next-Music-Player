"use client"
import React from 'react'
import { UserDetails } from '../../../../types'
import Image from 'next/image'
import { useLoadAvatar } from '@/hook/useLoadAvatar'

interface LibraryHeaderProps {
    user : UserDetails | null
}
const LibraryHeader:React.FC<LibraryHeaderProps>= (
    {
        user
    }
) => {
    const avatar = useLoadAvatar(user!)
    return (
        <div className='flex gap-x-5'>
            {/* avatar image */}
            <Image  src={avatar || "/images/liked.png"} alt='useravatar'
            height={30}
            width={30}
            className='object-cover rounded-full'/>
            <h1 className= 'text-white font-semibold text-2xl'>
                Library
            </h1>
        </div>
    )
}

export default LibraryHeader
