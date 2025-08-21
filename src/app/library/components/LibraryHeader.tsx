
"use client"
import React from 'react'
import { UserDetails } from '../../../../types'
import Image from 'next/image'
import { useLoadAvatar } from '@/hook/useLoadAvatar'
import { BiSearch } from 'react-icons/bi'
import SheetLibrary from '@/components/Sheet'


interface LibraryHeaderProps {
    user: UserDetails | null
}
const LibraryHeader: React.FC<LibraryHeaderProps> = (
    {
        user
    }
) => {
    const avatar = useLoadAvatar(user!);

    // event handler to open dropdown

    return (
        <div className='flex justify-between mt-5 items-center'>
            {/* avatar image */}
            <div className='flex gap-x-5'>
                <Image src={avatar || "/images/liked.png"} alt='useravatar'
                    height={40}
                    width={40}
                    className='object-cover rounded-full' />
                <h1 className='text-white font-semibold text-2xl'>
                    Library
                </h1>
            </div>
            
            {/* add playlist or songs icon */}
            <div className='flex gap-x-4'>
            {/* add icons  */}
                <BiSearch  className='text-white' size={25}/>
              <SheetLibrary />
            </div>
        </div>
    )
}

export default LibraryHeader
