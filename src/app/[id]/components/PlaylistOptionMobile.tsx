import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { PlaylistOptionMobileProps } from '../../../Interfaces/types'
import Image from 'next/image'
import UpdateDialog from '@/components/UpdateDialog'
import InsertSongsSheet from '@/components/InsertSongsSheet';


const PlaylistOptionMobile: React.FC<PlaylistOptionMobileProps> = (
    {
        userName,
        playlistData,
        disabled,
        playlistImage
        , songs
    }
) => {
    const { playlist_name } = playlistData;
    return (
        <Sheet>
            <SheetTrigger asChild>
                <BiDotsVerticalRounded className="text-white md:hidden " size={20} />
            </SheetTrigger>
            <SheetContent side="bottom" className="border-none  absolute z-50">
                <div className='flex justify-center'>
                    <div className="w-[35px] bg-neutral-500 rounded-2xl h-[5px] mt-2"></div>
                </div>
                <div className='flex flex-col gap-y-2 p-2'>
                    {/* get playlist image and playllist name */}
                    <div className='flex gap-x-2.5 items-center '>
                        <div className='w-10 h-10'>
                            <Image
                                src={playlistImage!}
                                alt='playlistImg'
                                width={45}
                                height={45}
                                className='object-cover w-full h-full rounded-md'
                            />
                        </div>
                        <div className="flex flex-col">
                            <p className='text-white font-semibold'>{playlist_name}</p>
                            <p className='text-neutral-500 text-[12px]'>By {userName}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 p-3 " >
                    <UpdateDialog
                        disabled={ disabled }
                    playlistData ={ playlistData } />
                    <InsertSongsSheet
                    playlistData = { playlistData}
                    songs={ songs}
                    />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default PlaylistOptionMobile
