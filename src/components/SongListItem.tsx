"use client"

import useLoadImage from "@/hook/useLoadImage"
import { Song } from "../../types"
import Image from "next/image"

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
        <div onClick={() => onClick(data.id)}
            className="
    relative 
    group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 
    bg-neutral-400/5 hover:bg-neutral-400/10
    cursor-pointer transition p-3">
            <div className="relative aspect-square w-full h-full rounded-md">
                <Image src={imagePath || "/images/liked.png"} alt="" className="object-cover"
                    fill />
            </div>
            <div className="flex flex-col  items-start w-full p-3 gap-y-3
            ">
                <p className="font-semibold truncate w-full">{ data.title }</p>
                <p className="font-semibold text-[1rem] ">{ data.author }</p>
            </div>
        </div>
    )
}

export default SongListItem;
