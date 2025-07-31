import React from 'react';
import { Song } from '../../../../types';
import useLoadImage from '@/hook/useLoadImage';
import { FaPlay } from 'react-icons/fa';
import usePlayerSong from '@/hook/usePlayerSong';
import Image from 'next/image';
import useLoadSongUrl from '@/hook/useLoadSongUrl';
import useGetSongDuration from '@/hook/useGetSongDuration';

interface LocalSongsProps {
  song: Song;
  onClick?: (id: string) => void;
}

const LocalSongs: React.FC<LocalSongsProps> = ({
  song,
  onClick
}) => {
  const imagePath = useLoadImage(song);
  const player = usePlayerSong();
  const songUrl = useLoadSongUrl(song);
  const songDuration = useGetSongDuration(songUrl);

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id);
    }
    return player.setId(song.id);
  };

  return (
    <div
      className="
        flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-3 rounded-md
      "
      onClick={handleClick}
    >
      <div className="relative min-h-[49px] min-w-[49px] overflow-hidden rounded-md">
        <Image
          alt="song image"
          src={imagePath || "/images/liked.png"}
          fill
          className="object-cover hover:brightness-30 transition ease-in-out"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition">
          <FaPlay className="text-white" />
        </div>
      </div>
      <div className="flex flex-col flex-grow justify-center gap-y-1">
        <p className="text-white font-semibold text-base truncate">{song.title}</p>
        <p className="text-neutral-400 text-sm truncate">{song.author}</p>
      </div>
      {songDuration && (
        <p className="text-neutral-400 text-sm ml-auto">{songDuration}</p>
      )}
    </div>
  );
};

export default LocalSongs;