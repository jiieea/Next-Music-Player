"use client"

import useLoadImage from "@/hook/useLoadImage"
import { Song } from "../../types"
import Image from "next/image"
import PlayButton from "./PlayButton"
interface SongListItemProps {
    data: Song,
    onClick: (id: string) => void
}

const SongListItem: React.FC<SongListItemProps> = ({
    data,
    onClick
}) => {
    const imagePath = useLoadImage(data);
    return (
        <>
            <div onClick={() => onClick(data.id)}
                className="hidden
    relative 
    group md:flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 
    bg-neutral-400/5 hover:bg-neutral-400/10
    cursor-pointer transition p-3">
                <div className="relative aspect-square w-full h-full rounded-md">
                    <Image src={imagePath || "/images/liked.png"} alt="song cover" className="object-cover"
                        fill />
                </div>
                <div className="flex flex-col  items-start w-full p-3 gap-y-3
            ">
                    <p className="font-semibold truncate w-full">{data.title}</p>
                    <p className="font-semibold text-[13px] ">{data.author}</p>
                </div>
                <div className="
        absolute right-5 ">
                    <PlayButton
                    />
                </div>

            </div>

            <div
                onClick={() => onClick(data.id)}
                className="flex items-center 
            gap-x-2 p-2 bg-neutral-800 
            rounded-md overflow-hidden
            md:hidden
             hover:bg-neutral-700/50 
             transition cursor-pointer">
                {/* Image Container */}
                <div className='relative min-w-[48px] min-h-[48px]'>
                    <Image
                        src={imagePath || "/images/liked.png"}
                        alt='Playlist Image'
                        fill
                        className='object-cover rounded-md'
                    />
                </div>
                {/* Text Container */}
                <div className='flex flex-col gap-y-1 overflow-hidden'>
                    <p className="text-white font-bold  text-[10px]">
                        {/* Replace this with your actual playlist title */}
                        {
                            data.title
                        }
                    </p>
                </div>
            </div>
        </>
    )
}

export default SongListItem;
