// components/PlaylistOption.tsx
import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Playlist } from '../../../../types';
import { RemovePlaylistBtn } from './RemovePlaylistBtn';
import UpdatePlaylistModal from './UpdatePlaylistModal';
import { UpdatePlaylistForm } from './UpdatePlaylistForm';

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
    return (
        <div className=''>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <BsThreeDotsVertical size={25} 
                    className='text-neutral-500 hover:text-white transition cursor-pointer hidden md:block' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56 bg-neutral-800 border-neutral-700'>
                    {/* 👇 Styles are applied here */}
                    <DropdownMenuItem 
                      asChild 
                      className="bg-neutral-800 hover:bg-neutral-700 text-white focus:bg-neutral-700 p-3 cursor-pointer"
                    >
                       <RemovePlaylistBtn playlistData={playlistData} onHandleRemovePlaylist={onHandleRemovePlaylist}/>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                    asChild
                       className="bg-neutral-800 hover:bg-neutral-700 text-white focus:bg-neutral-700 p-2 cursor-pointer"
                    >
                      <UpdatePlaylistModal >
                        <UpdatePlaylistForm  playlistData={ playlistData}/>
                        </ UpdatePlaylistModal>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default PlaylistOption