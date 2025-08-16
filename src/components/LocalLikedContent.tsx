"use client"

import React, { useEffect } from "react"
import { Song } from "../../types"
import { useRouter } from "next/navigation";
import { useUsers } from "@/hook/useUser";
import LikedButton from "@/components/LikedButton";
import LocalSongs from "../app/account/components/LocalSongs";
import useOnplay from "@/hook/useOnPlay";



interface LikedContentProps {
    songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({
    songs,
}) => {
    const router = useRouter();
    const { isLoading, user } = useUsers();
    const play = useOnplay(songs);

    useEffect(() => {
        // only authenticated users can like songs
     if(!user && !isLoading) {
            router.push('/');
        }
    }, [user, isLoading, router]);

    if (songs.length === 0) {
        return (
            <div className="text-white text-lg font-semibold p-4">No Song</div>
        )
    }

    const onClick = () => {
        router.push('/account/mysong');
    }
    return (
        <div className="flex flex-col gap-x-4 w-full px-6 ">
            <div className="flex justify-between p-2">
            <h1 className="text-white font-semibold text-lg md:text-2xl lg:text-3xl mb-3">Top Songs</h1>
            <h1 className="text-neutral-700 font-semibold text-md  mb-3 hover:underline hover:scale-110 transition cursor-pointer" onClick={onClick}>See More</h1>
            </div>
            {
                songs.slice(0,4).map((song , index) => (
                    <div className="flex items-center  hover:bg-neutral-800/50  " key={song.id}>
                        <div className="flex-1">
                            <div className="flex items-center gap-x-1">
                                <p className="text-white font-semibold">{index + 1}</p>
                                <LocalSongs song ={song}  
                                onClick={(id : string) => play(id)}
                            />
                            <LikedButton  songId={ song.id }/>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default LikedContent;