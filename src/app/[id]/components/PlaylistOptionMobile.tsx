import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { Playlist } from '../../../../types'
import { IoShareSocialOutline } from "react-icons/io5";
import Image from 'next/image'
import { MdDownloading } from "react-icons/md";
import { GoPlusCircle } from 'react-icons/go';
import { RxPencil1 } from 'react-icons/rx';


const option = [
    {
        icon : <MdDownloading  size={25} className='text-white'/> ,
        text : "Download"
    },
    {
        icon : <GoPlusCircle size={25} className='text-white'/> ,
        text : "Add To This Playlist"
    },
    {
        icon : <IoShareSocialOutline size={25} className='text-white'/> ,
        text : "Share This Playlist"
    },
    {
        icon : <RxPencil1 size={25} className='text-white'/> ,
        text : "Update This Playlist",
    }
]


interface PlaylistOptionMobileProps {
    playlistImage: string,
    playlistData: Playlist,
    userName : string
}
const PlaylistOptionMobile: React.FC<PlaylistOptionMobileProps> = (
    {
        userName,
        playlistData,
        playlistImage
    }
) => {
    const { playlist_name } = playlistData;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <BiDotsVerticalRounded className="text-white md:hidden " size={25} />
            </SheetTrigger>
            <SheetContent side="bottom" className="border-none rounded-2xl absolute z-50">
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
                            <p className='text-neutral-500 text-[12px]'>{userName}</p>
                        </div>
                    </div>
                  <div className="flex flex-col gap-y-2">
                      {
                        option.map((opt , index) => (
                            <div className='flex gap-x-2 items-center p-2' key={index}>
                        {/* icon */}
                       <div>
                        { opt.icon}
                       </div>
                        {/* text  */}
                        <h1 className='text-[15px] text-white font-semibold'>
                            { opt.text}
                        </h1>
                    </div>
                        ))
                      }
                  </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default PlaylistOptionMobile
