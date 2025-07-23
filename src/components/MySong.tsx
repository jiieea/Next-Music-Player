"use client"
import useOnplay from '@/hook/useOnPlay'
import { Song } from '../../types'
import SongListItem from './SongListItem'
interface MySongProps {
    songs: Song[],
}


const MySong: React.FC<MySongProps> = ({
    songs
}) => {
    const onPlay = useOnplay(songs);
    if (songs.length == 0) {
        return (
            <div className='mt-4 text-neutral-400'>
                No Songs Available
            </div>
        )
    }

    return (
        <div className='
        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
        2xl:grid-cols-8 gap-4 mt-4'>
            {
                songs.map((song) => (
                    <SongListItem key={song.id} data={song} onClick={(id : string) => onPlay(id)} />
                ))
            }
        </div>
    )
}



export default MySong;