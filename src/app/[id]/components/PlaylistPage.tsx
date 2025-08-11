"use client"
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { Playlist, Song, UserDetails } from '../../../../types';
import Image from 'next/image';
import { useLoadPlaylistImage } from '@/hook/useLoadAvatar';
import { PlaylistContent } from '@/components/PlaylistContent';
import { useDominantColor } from '@/hook/useDominantColour';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface PlaylistPageProps {
  userData?: UserDetails;
  playlistData: Playlist;
  songs: Song[];
}

const PlaylistPage: React.FC<PlaylistPageProps> = ({
  userData,
  playlistData,
  songs
}) => {
  const playlistImage = useLoadPlaylistImage(playlistData);
  const dominantColor = useDominantColor(playlistImage);
  const [playlistSongs, setPlaylistSongs] = useState<Song[]>(songs);
  const supabase = useSupabaseClient()
  const router = useRouter();
  useEffect(() => {
    setPlaylistSongs(songs);
  }, [songs]);

  const handleRemoveSong = async (songId: string) => {
    const { error } = await supabase.from('playlist_songs')
      .delete()
      .eq('song_id', songId)
      .eq('playlist_id', playlistData.id)


    if (error) {
      toast.error(`${error.message} failed to remove `)
    }

    setPlaylistSongs(prevSong => prevSong.filter(song => song.id === songId));
    router.refresh();
  }

  return (
    <div className='w-full h-full bg-neutral-900 rounded-md'>
      <Header
        className="bg-gradient-to-b from-[var(--playlist-color)] to-neutral-900 transition-colors duration-500"
        userData={userData}
        style={{ '--playlist-color': dominantColor } as React.CSSProperties}
      >
        <div className='mt-8 pt-4 flex items-center gap-x-4'>
          <Image
            src={playlistImage || '/images/liked.png'}
            alt='playlist image'
            width={200}
            height={200}
            className='relative object-cover rounded-md mb-4 w-24 lg:w-50'
          />
          <div className='flex flex-col'>
            <p className='text-[1rem] ps-0 md:ps-2 font-semibold text-white'>Playlist</p>
            <p className='text-4xl font-semibold text-white lg:text-8xl'>{playlistData?.playlist_name}</p>
            <p className='ps-0 md:ps-2 font-semibold text-white'>
              {playlistSongs.length} {playlistSongs.length === 1 ? 'song' : 'songs'}
            </p>
          </div>
        </div>
      </Header>
      <PlaylistContent songs={playlistSongs} onHandleRemoveSong={handleRemoveSong} />
    </div>
  );
};

export default PlaylistPage;