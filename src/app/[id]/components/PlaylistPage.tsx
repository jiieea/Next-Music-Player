"use client"
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { Playlist, Song, UserDetails } from '../../../../types';
import Image from 'next/image';
import { useLoadAvatar, useLoadPlaylistImage } from '@/hook/useLoadAvatar';
import { PlaylistContent } from '@/components/PlaylistContent';
import { useDominantColor } from '@/hook/useDominantColour';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { MobileNavbar } from '@/components/MobileNavbar';
import PlaylistOption from './PlaylistOption';
interface PlaylistPageProps {
  userData?: UserDetails;
  songs: Song[];
  userPlaylists: Playlist[]
  playlistData: Playlist
}

const PlaylistPage: React.FC<PlaylistPageProps> = ({
  userData,
  songs,
  userPlaylists,
  playlistData
}) => {
  const playlistImage = useLoadPlaylistImage(playlistData);
  const imageUrl = useLoadAvatar(userData!);
  const { full_name } = userData!
  const dominantColor = useDominantColor(playlistImage);
  const [playlistSongs, setPlaylistSongs] = useState<Song[]>(songs);
  const supabase = useSupabaseClient()
  const router = useRouter();
  const playlistId = playlistData.id;
  

  useEffect(() => {
    setPlaylistSongs(songs);
  }, [songs]);

  const handleRemoveSong = async (songId: string) => {
    const { error } = await supabase.from('playlist_songs')
      .delete()
      .eq('song_id', songId)
      .eq('playlist_id', playlistId)


    if (error) {
      toast.error(`${error.message} failed to remove `)
    }

    setPlaylistSongs(prevSong => prevSong.filter(song => song.id === songId));
    router.refresh();
  }


  // Todo : handle remove playlist
  const handleRemovePlaylist = async (playlistId: string) => {
    try {
      const { data: playlist, error: removeError } = await supabase.from('playlist')
      .delete()
      .eq('id', playlistId)

    if (removeError) {
      toast.error('failed remove playlist' + removeError.message)
    }

    if(playlist) {
      toast.success('playlist removed')
    }

    router.push('/')
    }catch(e : unknown) {
      if(e instanceof Error) {
        toast.error('removing failed' + e.message)
      }
    }
  }
  return (
    <div className='w-full h-full bg-neutral-900 rounded-md mb-15 md:mb-0 overflow-y-auto'>
      <Header
        className="bg-gradient-to-b from-[var(--playlist-color)] to-neutral-900 transition-colors duration-500"
        userData={userData}
        style={{ '--playlist-color': dominantColor } as React.CSSProperties}
      >
    <div className='mt-8 pt-4 flex items-center gap-x-4 flex-col md:flex-row md:items-start md:text-start justify-center text-center md:justify-start p-3'>
  <Image
    src={playlistImage || '/images/liked.png'}
    alt='playlist image'
    width={250}
    height={250}
    className='relative object-cover rounded-md mb-4 w-45 md:w-50 h-45 md:h-50'
  />
  <div className='flex flex-col justify-start space-y-2.5 w-full md:w-2/3'>
    <p className='text-[1rem] ps-0 md:ps-2 font-semibold text-white md:block hidden'>Playlist</p>
    <p className='text-2xl font-semibold text-white md:text-4xl lg:text-8xl w-full'>{playlistData?.playlist_name}</p>
    {/* This div is shown only on mobile */}
    <div className='flex gap-x-2 items-center md:hidden'>
      <Image src={imageUrl || '/images/liked.png'} alt='User avatar' height={25} width={25} className='rounded-full object-cover' />
      <p className='text-white font-semibold text-sm'>{full_name}</p>
    </div>
    {/* This div is shown on all screens but with responsive padding */}
    <div className='flex gap-x-3 md:gap-x-4 items-center'>
      <p className='ps-0 md:ps-2 font-semibold text-white'>
        {playlistSongs.length} {playlistSongs.length === 1 ? 'song' : 'songs'}
      </p>
      {/* <RemovePlaylistBtn playlistData={playlistData} onHandleRemovePlaylist={handleRemovePlaylist}/> */}
      <PlaylistOption
      playlistData={ playlistData}
      onHandleRemovePlaylist={ handleRemovePlaylist}/>
    </div>
  </div>
</div>
      </Header>
      <PlaylistContent
        songs={playlistSongs}
        userPlaylists={userPlaylists}
        onHandleRemoveSong={handleRemoveSong} />
      <div className="fixed bottom-0 w-full px-0 md:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default PlaylistPage;