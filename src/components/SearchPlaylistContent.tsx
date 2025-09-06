import Image from 'next/image'
import React from 'react'
import { Playlist } from '../../types'
import { useLoadPlaylistImage } from '@/hook/useLoadAvatar'
import PlayButton from './PlayButton'
import { useRouter } from 'next/navigation'

interface SearchPlaylistContentProps {
    data: Playlist
    href: string
}
const SearchPlaylistContent: React.FC<SearchPlaylistContentProps> = (
    {
        data,
        href
    }
) => {
    const image = useLoadPlaylistImage(data)
    const router = useRouter()
    const onClick = () => {
        router.push(href)
    }
    return (
        <div
            onClick={onClick}
            className='relative 
                                   group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 
                                   bg-neutral-400/5 hover:bg-neutral-400/10
                                   cursor-pointer transition p-2 
                                   w-full max-w-xs sm:max-w-sm lg:max-w-md
                                   '
        //    onClick={onClick}
        >
            <div className='relative aspect-square w-full rounded-md overflow-hidden'>
                <Image
                    src={image!}
                    alt='playlistImage'
                    fill
                    className='object-cover '
                />
            </div>
            <div className='flex flex-col mb-3 mt-3 w-full'>
                <p className='text-white font-semibold truncate'>{data.playlist_name}</p>
                {/* <p className="font-semibold text-neutral-400 text-[15px] truncate">
                                           Playlist &bull; {data.playlist_name}
                                       </p> */}
            </div>

            <div className='absolute right-5 bottom-5 pr-3'>
                <PlayButton />
            </div>
        </div>
    )
}

export default SearchPlaylistContent
