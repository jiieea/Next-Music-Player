import Image from 'next/image'
import React from 'react'
import { Playlist, UserDetails } from '../../types'
import { useLoadPlaylistImage } from '@/hook/useLoadAvatar'
import PlayButton from './PlayButton'
import { useRouter } from 'next/navigation'

interface UserPlaylistProps {
    playlist: Playlist
    user: UserDetails
    href : string
}

export const UserPlaylist: React.FC<UserPlaylistProps> = ({ playlist , user  ,  href }) => {
    const loadImage = useLoadPlaylistImage(playlist);
    const playlistTitle = playlist.playlist_name;
    const router = useRouter()

    const onClick = () => {
        router.push(href)
    }
    
    return (
        <div className=' relative 
    group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 
    bg-neutral-400/5 hover:bg-neutral-400/10
    cursor-pointer transition p-2  max-w-[200px] 
' onClick={onClick}  >
            <Image
                src={loadImage!}
                alt='playlistImage'
                width={350}
                height={350}
                className=' object-cover w-[350px]  md:w-[200px] md:h-[200px] rounded-md'
            />
            <div className='flex flex-col mb-3  mt-3'>
                <p className='text-white font-semibold'>{ playlistTitle }</p>
                <p className=" font-semibold text-neutral-400 text-[15px]">Playlist &bull; { user.full_name}</p>
            </div>

            <div className='absolute right-5 bottom-25 pr-3' >
                <PlayButton />
            </div>
        </div>
    )
}
