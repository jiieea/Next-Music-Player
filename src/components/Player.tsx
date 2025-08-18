"use client"
import useGetSongById from '@/hook/useGetSongById';
import useLoadSongUrl from '@/hook/useLoadSongUrl';
import usePlayerSong from '@/hook/usePlayerSong';
import React from 'react';
import { PlayerContent } from './PlayerContent';
import { Playlist } from '../../types';

interface PlayerProps {
  userPlaylist: Playlist[];
}
export const Player: React.FC<PlayerProps> = ({
  userPlaylist
}) => {
  const player = usePlayerSong();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);
  if (!songUrl || !song || !player.activeId) {
    return null;
  }
  return (
    <div className='bottom-17 md:bottom-0 md:h-[80px] px-3 w-full flex flex-col 
    fixed bg-black/10 backdrop-blur-sm z-[999]'>
      <PlayerContent
        key={songUrl}
        song={song}
        songUrl={songUrl}
        userPlaylists={userPlaylist}
      />
    </div>
  );
};