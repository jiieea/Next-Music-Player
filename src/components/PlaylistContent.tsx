import React, { useState } from 'react'
import { Song } from '../../types'
import MediaItem from './MediaItem'
import LikedButton from './LikedButton'
import { RxDotsHorizontal } from "react-icons/rx";
import { FaTrash } from "react-icons/fa6";
interface PlaylistContentProps {
    songs: Song[]
}
export const PlaylistContent: React.FC<PlaylistContentProps> = ({
    songs
}) => {
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

    const handleOpenDropdown = (id: string) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };


    const handleRemoveSong = () => {
        alert('oke')
    }
    return (
        <div className="flex flex-col gap-x-4 w-full px-6    ">
            {
                songs.map((song, index) => (
                    <div className="flex items-center rounded-md hover:bg-neutral-800/50 px-5" key={song.id}>
                        <div className="flex-1">
                            <div className="flex items-center gap-x-1">
                                <p className="text-white font-semibold">{index + 1}</p>
                                <MediaItem data={song}
                                />
                                <LikedButton songId={song.id} />
                                <div className="relative mt-1 pl-2">
                                    <button
                                        type='button'
                                        title='add to playlist'
                                        onClick={() => handleOpenDropdown(song.id)}
                                        className='cursor-pointer opacity-75 transition '>
                                        <RxDotsHorizontal
                                            className='hover:scale-110 items-center'
                                            color="white"
                                            size={25}
                                        />
                                    </button>
                                    {
                                        openDropdownId === song.id && (
                                            <div className="absolute right-0 bottom-full mb-2 w-70 bg-neutral-800
                                            rounded-md shadow-lg z-10
                                        ">
                                                <div className='py-1'>
                                                    <button
                                                        title='add to playlist'
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
                                                    >
                                                       <div className='flex w-50 items-center gap-x-2' onClick={handleRemoveSong}>
                                                        <FaTrash /> <span>remove from this playlist</span>
                                                       </div>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
