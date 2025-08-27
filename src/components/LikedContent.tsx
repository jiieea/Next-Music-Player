"use client"

import React, { useEffect } from "react"
import { Song } from "../../types"
import { useRouter } from "next/navigation";
import { useUsers } from "@/hook/useUser";
import MediaItem from "./MediaItem";
import LikedButton from "./LikedButton";
import useOnplay from "@/hook/useOnPlay";
interface LikedContentProps {
    songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({
    songs,
}) => {
    const router = useRouter();
    const { isLoading, user } = useUsers();
    const onPlay = useOnplay(songs);

    useEffect(() => {
        // only authenticated users can like songs
        if (!user && !isLoading) {
            router.push('/');
        }
    }, [user, isLoading, router]);

    if (songs.length === 0) {
        return (
            <div className="text-white text-lg font-semibold p-4">No Liked Song</div>
        )
    }
    return (
        <div className="flex flex-col gap-x-4 w-full px-6 mb-[80px] md:mb-0">
            {
                songs.map((song, index) => (
                    <div className="flex items-center hover:bg-neutral-700 transition px-5 rounded-md" key={song.id}>
                        <div className="flex-1">
                            <div className="flex items-center gap-x-1">
                                <p className="text-white font-semibold">{index + 1}</p>
                                <MediaItem data={song}
                                    onClick={(id: string) => onPlay(id)}
                                />
                                <LikedButton songId={song.id} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default LikedContent;