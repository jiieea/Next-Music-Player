import React from 'react'
import { GoPlusCircle } from 'react-icons/go';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import { FaArrowLeft } from "react-icons/fa6";
import { Input } from './ui/input';
import { Playlist, Song } from '../../types';
import { SongContainer } from './SongContainer';

interface InsertSongsSheetProps {
    songs: Song[]
    playlistData : Playlist
}
const InsertSongsSheet: React.FC<InsertSongsSheetProps> = (
    {
        songs,
        playlistData
    }
) => {

    return (
        <Sheet >
            <SheetTrigger asChild>
                <div className='flex gap-x-4 items-center'>
                    <GoPlusCircle className='text-white' size={25} />
                    <span className='text-white font-semibold text-[15px]'>
                        Add to this playlist
                    </span>
                </div>
            </SheetTrigger>
            <SheetContent side="bottom"
                className="border-none h-[90vh]  bg-black absolute z-50  bottom-0  ">
                <div className='flex items-center justify-between p-2'>
                    <SheetClose asChild>
                        <FaArrowLeft size={25} className='text-white' />
        
                    </SheetClose>
                    <div className='absolute left-1/2 transform -translate-x-1/2'>
                        <p className='text-white font-semibold'>Add song to this playlist</p>
                    </div>
                </div>
                <div className='flex flex-col gap-y-4 p-5'>
                    {/* input form */}
                    <Input
                        className='p-5
                    bg-neutral-800
                   rounded-none
                    border-none
                    placeholder:text-white
                    '
                        placeholder='search songs'
                    />
                    <div className='w-full h-[60vh] bg-neutral-800 rounded-lg overflow-y-auto'>
                        {/* map songs list */}
                        <div className='flex flex-col gap-y-1.5 p-3'>
                            <div className="flex flex-col mb-3">
                                <h1 className='text-white font-semibold text-[1rem]'>Suggestion</h1>
                                <p className='text-neutral-500 text-[12px]'>based on the title you have added</p>
                            </div>
                            {
                                songs.map((song) => (
                                    <>
                                        <SongContainer song={song}
                                            playlistData ={ playlistData}
                                        />
                                    </>
                                ))
                            }
                        </div>

                    </div>
                </div>
            </SheetContent>
        </Sheet>

    )
}

export default InsertSongsSheet
