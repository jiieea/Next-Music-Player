"use client"
import React from 'react'
import { Song } from '../../types'
import MediaItem from './MediaItem'
import LikedButton from './LikedButton'
interface SearchContentProps {
    songs: Song[]
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs
}) => {

    if (songs.length === 0) {
        return (
            <div className='text-neutral-700 font-semibold p-4'>No Song Found With Specific Title</div>
        )
    }
    return (
        <>
          <div className="flex flex-col gap-y-4 w-full px-6">
            {
                songs.map((song) => (
                    <div className='flex items-center ' key={song.id}>
                        <div className="flex-1">
                            <MediaItem
                            data={song}
                            onClick={() => {}}
                            />
                        </div>
                        <LikedButton  songId={song.id} />
                    </div>
                ))
            }
          </div>
        </>
    )
}

export default SearchContent