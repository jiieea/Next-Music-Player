import React from 'react'
import MediaItem from './MediaItem'
import LikedButton from './LikedButton'
import { RxDotsHorizontal } from "react-icons/rx";
import { FaTrash } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { Playlist, Song } from '../../types';
import { toast } from 'sonner';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';


interface PlaylistSongsListProps {
    data: Song,
    key: number,
    dropdown: string
    onHandleRemoveSong: (songId: string) => void
    userPlaylists: Playlist[],
    onHandleOpenPlaylistDropdown: () => void
    onHandleOpenDropdown: (id: string) => void
    playlistDropdown: boolean
    index: number,
    onHandleCloseDropdown : (id : string) => void
}
export const PlaylistSongsList: React.FC<PlaylistSongsListProps> = (
    {
        data,
        onHandleRemoveSong,
        userPlaylists,
        onHandleOpenPlaylistDropdown,
        onHandleOpenDropdown
        , dropdown,
        playlistDropdown,
        onHandleCloseDropdown,
        index
    }
) => {
    const supabase = useSupabaseClient();
    const router = useRouter()
    const songId = data.id;

    const addSongToSpesificPlaylist = async (playlistId: string, playlistName: string) => {
        try {
            // check if the song alrdy exist
            const { data: existingData, error: errorData } = await supabase
                .from('playlist_songs')
                .select('playlist_id')
                .eq('playlist_id', playlistId)
                .eq('song_id', songId)
                .maybeSingle()

            if (errorData) {
                toast.error(`failed adding song ${errorData.message}}`)
            }

            if (existingData) {
                toast.warning('the song already exist in the playlist');
                return;
            }

            // insert new data to the table
            const { error: insertError } = await supabase.from('playlist_songs')
                .insert({
                    playlist_id: playlistId,
                    song_id: songId
                })

            if (insertError) {
                toast.error('failed add new song to the selected playlist');
            } else {
                toast.success(`Succesfully added to ${playlistName} `);
                router.refresh()
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error('failed add song');
            }
        }finally {
            onHandleCloseDropdown(songId);
        }


    }
    return (
        <div className="flex items-center rounded-md
         hover:bg-neutral-800/50 px-5" key={index}>
            <div className="flex-1">
                <div className="flex items-center gap-x-1">
                    <p className="text-white font-semibold">{index + 1}</p>
                    <MediaItem data={data} />
                    <LikedButton songId={data.id} />
                    <div className="relative mt-1 pl-2">
                        <button
                            type='button'
                            title='add to playlist'
                            onClick={() => onHandleOpenDropdown(data.id)}
                            className='cursor-pointer opacity-75 transition '>
                            <RxDotsHorizontal
                                className='hover:scale-110 items-center'
                                color="white"
                                size={25}
                            />
                        </button>
                        {
                            dropdown === data.id && (
                                <div className="absolute right-0 bottom-full mb-2 w-50 md:w-70 bg-neutral-800 rounded-md shadow-lg z-10">
                                    <div className='py-1'>
                                        <button
                                            title='remove from the playlist'
                                            className="block w-full rounded-md text-left px-4 py-2 text-sm text-gray-100 hover:bg-neutral-700"
                                            onClick={() => onHandleRemoveSong(data.id)}
                                        >
                                            <div className='flex w-50 items-center gap-x-2'>
                                                <FaTrash /> <span className='text-sm'>remove song</span>
                                            </div>
                                        </button>

                                        {/* This is the key change */}
                                        <div className="relative">
                                            <button
                                                title='add to playlist'
                                                className='block w-full text-left rounded-md text-gray-100 hover:bg-neutral-700 px-4 py-2'
                                                onClick={() => onHandleOpenPlaylistDropdown()}
                                            >
                                                <div className='flex w-50 items-center gap-x-2'>
                                                    <GoPlus /><span className='text-[14px]'>Add to playlist </span>
                                                </div>
                                            </button>
                                            {
                                                playlistDropdown  && (
                                                    <div className='absolute right-full bottom-0 ml-2 bg-neutral-800 flex flex-col items-start  w-40 rounded-md shadow-lg'>
                                                        {/* map playlist user has here */}
                                                        {
                                                            userPlaylists.map((playlist, index) => (
                                                                <button className="px-4 py-2 text-sm text-gray-100 "
                                                                    key={index}
                                                                    onClick={() => addSongToSpesificPlaylist(playlist.id, playlist.playlist_name)}>{
                                                                        playlist.playlist_name
                                                                    }</button>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
