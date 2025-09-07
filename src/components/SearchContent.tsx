"use client"
import React from 'react'
import { Playlist, Song } from '../../types'
import MediaItem from './MediaItem'
import LikedButton from './LikedButton'
import useOnplay from '@/hook/useOnPlay'
import PlaylistButton from './PlaylistButton'
import SearchPlaylistContent from './SearchPlaylistContent'
interface SearchContentProps {
    songs: Song[]
    playlists: Playlist[]
    playlistData: Playlist[]
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs,
    playlists,
    playlistData
}) => {
    const onPlay = useOnplay(songs);
    if (songs.length === 0 && playlistData.length === 0) {
        return (
            <div className='text-neutral-700 font-semibold p-4'>
                No Song or Playlist Found With Specific Title</div>
        )
    }
    return (
        <>
            <div className="flex flex-col gap-y-4 w-full px-6 mb-10">
                {
                    songs.map((song, index) => (
                        <div className="flex items-center  hover:bg-neutral-800/50  " key={song.id}>
                            <div className="flex-1">
                                <div className="flex items-center gap-x-1">
                                    <p className="text-white font-semibold">{index + 1}</p>
                                    <MediaItem data={song}
                                        onClick={(id: string) => onPlay(id)}
                                    />
                                    <LikedButton songId={song.id} />
                                    <PlaylistButton songId={song.id} userPlaylists={playlists} />
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    playlistData.length !== 0 && (
                        <>
                            <div className='text-white font-black text-2xl'>{
                                playlistData.length === 0 ? " " : "Playlists"
}</div>
                            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-3 gap-x-5'>
                                {
                                    playlistData.map((playlist) => (
                                        <SearchPlaylistContent
                                            data={playlist}
                                            key={playlist.id}
                                            href = {`/${playlist.id}`}
                                        />
                                    ))
                                }
                            </div>
                        </>

                    )
                }
            </div>
        </>

    )
}

export default SearchContent