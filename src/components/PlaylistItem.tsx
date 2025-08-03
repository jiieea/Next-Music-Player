import { useLoadPlaylistImage } from '@/hook/useLoadAvatar';
import Image from 'next/image'
import React from 'react'
import { Playlist } from '../../types';

interface PlaylistItemProps {
    playlist : Playlist
    onClick : () => void
}
const PlaylistItem:React.FC<PlaylistItemProps> = ({
    playlist,
    onClick
}) => {
    const playlistImage = useLoadPlaylistImage(playlist);
    console.log(playlistImage)
    return (
        <div
            className='flex items-center
        gap-x-3 cursor-pointer hover:bg-neutral-800/50
        w-full p-3 rounded-md'
            onClick={onClick}
        >
            <div className='relative min-h-[49px] min-w-[49px] rounded-md overflow-hidden group'>
                <Image
                    alt='playlist Image'
                    src={playlistImage || "/images/liked.png"}
                    fill
                    sizes=''
                    className="object-cover transition-all duration-300 group-hover:brightness-50" // Adjusted brightness and transition
                />
            </div>
            <div className="flex flex-col flex-grow justify-center gap-y-1 w-[150px] md:w-full">
                <p className="text-white font-semibold text-base truncate text-[12px] md:text-[15px]  w-[150px]">{playlist.playlist_name}</p>
            </div>
        </div>
    )
}

export default PlaylistItem