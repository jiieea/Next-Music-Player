"use client"
import React from 'react'
import { Playlist, Song } from '../../types'
import MediaItem from './MediaItem'
import LikedButton from './LikedButton'
import useOnplay from '@/hook/useOnPlay'
import PlaylistButton from './PlaylistButton'
interface SearchContentProps {
    songs: Song[]
    playlists : Playlist[]
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs,
    playlists
}) => {
    const onPlay = useOnplay(songs);
    if (songs.length === 0) {
        return (
            <div className='text-neutral-700 font-semibold p-4'>No Song Found With Specific Title</div>
        )
    }
    return (
        <>
          <div className="flex flex-col gap-y-4 w-full px-6">
            {
                songs.map((song , index) => (
                    <div className="flex items-center  hover:bg-neutral-800/50  " key={song.id}>
                        <div className="flex-1">
                            <div className="flex items-center gap-x-1">
                                <p className="text-white font-semibold">{index + 1}</p>
                                <MediaItem data ={song}  
                                onClick={(id : string) => onPlay(id)}
                            />
                            <LikedButton  songId={ song.id }/>
                            <PlaylistButton  songId={ song.id} userPlaylists={ playlists }/>
                            </div>
                        </div>
                    </div>
                ))
            }
          </div>
        </>
        
    )
}

export default SearchContent