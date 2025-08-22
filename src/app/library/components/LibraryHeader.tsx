
"use client"
import React from 'react'
import { UserDetails } from '../../../../types'
import Image from 'next/image'
import { useLoadAvatar } from '@/hook/useLoadAvatar'
import { BiSearch } from 'react-icons/bi'
import SheetLibrary from '@/components/Sheet'
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'

interface LibraryHeaderProps {
    user: UserDetails | null
}
const LibraryHeader: React.FC<LibraryHeaderProps> = (
    {
        user
    }
) => {
    const avatar = useLoadAvatar(user!);
    const router = useRouter()
    // event handler to open dropdown
    const onClick = () => {
        router.push('/account')
    }
    return (
        <div className='flex  mt-5  flex-col  space-y-5'>
            <div className="flex items-center justify-between">
                {/* avatar image */}
                <div className='flex gap-x-5 items-center'>
                    <Image src={avatar || "/images/liked.png"} alt='useravatar'
                        height={40}
                        onClick={onClick}
                        width={40}
                        className='object-cover rounded-full' />
                    <h1 className='text-white font-semibold text-2xl'>
                        Library
                    </h1>
                </div>

                {/* add playlist or songs icon */}
                <div className='flex gap-x-4'>
                    {/* add icons  */}
                    <BiSearch className='text-white' size={25} />
                    <SheetLibrary />
                </div>
            </div>
            {/* <p className='text-white'>helo</p> */}
            <div className="flex gap-x-2.5">
                <Badge variant="secondary" className='bg-green-500'>songs</Badge>
                <Badge variant="secondary" className='bg-green-500'>playlists</Badge>
            </div>
        </div>
    )
}

export default LibraryHeader
