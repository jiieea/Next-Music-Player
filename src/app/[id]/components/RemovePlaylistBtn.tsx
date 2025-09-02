
import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Playlist } from '../../../../types';
import { FiMinusCircle } from 'react-icons/fi';

interface RemovePlaylistBtnProps {
    playlistData: Playlist
    onHandleRemovePlaylist: (playlistId: string) => void
}
export const RemovePlaylistBtn: React.FC<RemovePlaylistBtnProps> =
    (
        {
            playlistData,
            onHandleRemovePlaylist
        }
    ) => {
        const { playlist_name } = playlistData;

        return (
            <Dialog >
                <DialogTrigger asChild>
                    <button type='button' className="flex items-center gap-x-2 p-2 ">
                        <FiMinusCircle className='text-neutral-600 ' size={15} />
                        <span>Delete</span>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-neutral-800">
                    <DialogHeader>
                        <DialogTitle className='text-white'>Delete This Playlist </DialogTitle>
                        <DialogDescription>
                            Do you really wanna remove {playlist_name}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-x-3.5">
                        <DialogClose asChild>
                            <button className='bg-transparent text-green-400 font-semibold'>
                                Cancel
                            </button>
                        </DialogClose>
                        <DialogClose asChild>
                            <button className='bg-transparent text-green-400 font-semibold' onClick={() => onHandleRemovePlaylist(playlistData.id)}>
                                Delete
                            </button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };