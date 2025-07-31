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
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-3 
        rounded-md
      "
      onClick={handleClick}
    >
      <div className="relative min-h-[49px] min-w-[49px] rounded-md overflow-hidden group"> {/* Added group class */}
        <Image
          alt="song image"
          src={imagePath || "/images/liked.png"}
          fill
          className="object-cover transition-all duration-300 group-hover:brightness-50" // Adjusted brightness and transition
        />
        <div 
          className="
            absolute 
            inset-0 
            flex 
            items-center 
            justify-center 
            opacity-0 
            group-hover:opacity-100 
            transition-opacity 
            duration-300
          " // Fade in play button on hover
        >
          <FaPlay className="text-white text-2xl" /> {/* Increased icon size */}
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