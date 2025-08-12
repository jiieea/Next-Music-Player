import React, {  useState } from 'react'
import { Playlist, Song } from '../../types'

import { PlaylistSongsList } from './PlaylistSongsList';

interface PlaylistContentProps {
    songs: Song[]
    onHandleRemoveSong: (songId: string) => void
    userPlaylists : Playlist[]
}

export const PlaylistContent: React.FC<PlaylistContentProps> = ({
    songs,
    onHandleRemoveSong,
    userPlaylists,
}) => {
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [playlistDropdown, setPlaylistDropdown] = useState(false);

    // handle open playlist dropdown
    const handleOpenPlaylistDropdown = () => {
        setPlaylistDropdown(!playlistDropdown);
    }

    const handleOpenDropdown = (id: string) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };
    


    return (
        <div className="flex flex-col gap-x-4 w-full px-6 ">
            {
                songs.map((song, index) => (
                    <PlaylistSongsList  key={index} 
                        data={ song }
                        onHandleRemoveSong={() => onHandleRemoveSong(song.id) }
                        onHandleOpenPlaylistDropdown={ handleOpenPlaylistDropdown}
                        onHandleOpenDropdown={ (id : string) => handleOpenDropdown(id)}
                        userPlaylists={ userPlaylists }
                        dropdown ={ openDropdownId!}
                        playlistDropdown={ playlistDropdown}
                        index={ index }
                    />
                ))
            }
        </div>
    )
}