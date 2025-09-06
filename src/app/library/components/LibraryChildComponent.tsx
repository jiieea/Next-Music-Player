"use client"

import React, { useState } from 'react'
import LibraryContent from './LibraryContent'
import LibraryHeader from './LibraryHeader'
import { LibraryChildComponentProps} from '../../../Interfaces/types'


export const LibraryChildComponent: React.FC<LibraryChildComponentProps> = (
    {
        liked,
        userData,
        userPlaylists,
        userSongs
    }
) => {

    const [active, setActive] = useState<'songs' | 'playlists' | ' all '>(' all ');
    return (
        <>
            {/* Content wrapper with bottom padding */}
            <div className="p-5 border-b-2 border-black drop-shadow-xs ">
                <LibraryHeader user={userData}
                    active={active}
                    setActive={setActive}
                />
            </div>

            {/* library content */}
            <LibraryContent
                userSongs={active === "songs" ? userSongs : active === ' all ' ? userSongs : []}
                likedSongs={liked}
                userPlaylists={active === 'playlists' ? userPlaylists : active === ' all ' ? userPlaylists : []}
                userData={userData!}
            />
        </>
    )
}
