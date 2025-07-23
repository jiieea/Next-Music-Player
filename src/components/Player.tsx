"use client"

import useGetSongById from '@/hook/useGetSongById';
import useLoadSongUrl from '@/hook/useLoadSongUrl';
import usePlayerSong from '@/hook/usePlayerSong'
import React from 'react'
import { PlayerContent } from './PlayerContent';

export const Player = () => {
  const player = usePlayerSong();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);
  if (!songUrl || !song || !player.activeId) {
    return null;
  }
  return (
    <div className='fixed bottom-0 h-[80px] px-3 bg-black text-white w-full'>
      <PlayerContent 
      key={songUrl}
      song={song}
      songUrl = { songUrl }
      />
    </div>
  )
}


