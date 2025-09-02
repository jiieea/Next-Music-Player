"use client"
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { Playlist, Song, UserDetails } from '../../../../types';
import { useLoadAvatar, useLoadPlaylistImage } from '@/hook/useLoadAvatar';
import { PlaylistContent } from '@/components/PlaylistContent';
import { useDominantColor } from '@/hook/useDominantColour';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { MobileNavbar } from '@/components/MobileNavbar';
import { PlaylistHeader } from './PlaylistHeader';
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

      if (playlist) {
        toast.success('playlist removed')
      }

      router.push('/')
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error('removing failed' + e.message)
      }
    }
  }
  const handleAccountPush = () => {
    router.push('/account')
  }
  return (
    <div className='w-full h-full bg-neutral-900 rounded-md mb-15 md:mb-0 overflow-y-auto'>
      <Header
        className="bg-gradient-to-b from-[var(--playlist-color)] to-neutral-900 transition-colors duration-500"
        userData={userData}
        style={{ '--playlist-color': dominantColor } as React.CSSProperties}
      >
     <PlaylistHeader
      onHandleAccountPush={ handleAccountPush }
      playlistImage={ playlistImage! }
      imageUrl={ imageUrl }
      userName = { full_name! }
      onHandleRemovePlaylist={ handleRemovePlaylist }
      playlistData = { playlistData}
      playlistSongs={ playlistSongs}
     />
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