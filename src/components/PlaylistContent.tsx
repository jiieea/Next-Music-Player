import React, {  useState } from 'react'
import { PlaylistSongsList } from './PlaylistSongsList';
import useOnplay from '@/hook/useOnPlay';
import { PlaylistContentProps } from '../Interfaces/types'

export const PlaylistContent: React.FC<PlaylistContentProps> = ({
    songs,
    onHandleRemoveSong,
    userPlaylists,
}) => {
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [playlistDropdown, setPlaylistDropdown] = useState(false);
    const onPlay = useOnplay(songs);
    // console.log(totalDuration[])

    // handle open playlist dropdown
    const handleOpenPlaylistDropdown = () => {
        setPlaylistDropdown(!playlistDropdown);
    }

    const handleOpenDropdown = (id: string) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const handleCloseDropdown = (id : string ) => {
        setOpenDropdownId(openDropdownId !== id ?null : id);
    }
    

    return (

        <div className="flex flex-col gap-x-4 w-full  md:px-6  ">
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
                        onHandleOnPlay={(id  : string) => onPlay(id)}
                        onHandleCloseDropdown ={ (id : string) => handleCloseDropdown(id)}
                    />
                ))
            }
        </div>
    )
}