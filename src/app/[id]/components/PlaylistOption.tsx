import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FiMinusCircle } from "react-icons/fi";
import { RxPencil1 } from "react-icons/rx";
import { Playlist } from '../../../../types';


interface PlaylistOptionProps {
    onHandleRemovePlaylist: (playlistId: string) => void
    playlistData: Playlist
}

const PlaylistOption: React.FC<PlaylistOptionProps> = (
    {
        onHandleRemovePlaylist,
        playlistData
    }
) => {
    const playistId = playlistData.id;
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <BsThreeDotsVertical size={25} className='text-white cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuItem onClick={() => onHandleRemovePlaylist(playistId)}><FiMinusCircle className='text-neutral-600 ' size={20} /><span>Delete</span></DropdownMenuItem>
                <DropdownMenuItem>
                    {/* add new event handler : update playlist modal */}
                    <RxPencil1 className='text-neutral-500 ' size={25} /> <span>Update Playlist</span></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default PlaylistOption
