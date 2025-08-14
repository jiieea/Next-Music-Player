'use client'

import useProfileModal from "@/hook/useProfileModal";
import { RxPencil1 } from "react-icons/rx";
import { Playlist, Song, UserDetails } from "../../../../types";
import Image from "next/image";
import { useLoadAvatar } from "@/hook/useLoadAvatar";

interface AccountContentProps {
  user: UserDetails,
  songs: Song[],
  playlists: Playlist[]
}

export const AccountContent: React.FC<AccountContentProps> = ({
  user,
  songs,
  playlists
}) => {
  const { full_name } = user;
  const avatar = useLoadAvatar(user)
  const profileModal = useProfileModal()
  const updateProfile = () => {
    return profileModal.onOpen()
  }

  return (
    <div className='mt-3 p-4'>
      <h1 className='text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-6'>
        Account Settings
      </h1>
      
      <div className="flex flex-col md:flex-row gap-x-4 items-center md:items-start">
        {/* Image and Overlay Container */}
        <div
          onClick={updateProfile}
          className='
            relative
            group
            cursor-pointer
            rounded-full
            w-32 h-32 /* Reduced size for mobile */
            md:w-48 md:h-48 /* Slightly larger on medium screens */
            lg:w-56 lg:h-56 /* Larger on large screens */
            overflow-hidden
            flex-shrink-0
          '
        >
          {/* Avatar Image */}
          <Image
            alt="avatar"
            src={avatar || "/images/user.png"}
            width={224}
            height={224}
            className="
              object-cover
              rounded-full
              w-full h-full
              transition-transform
              group-hover:scale-105
            "
          />
          {/* Overlay for Hover Effect */}
          <div
            className="
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
              bg-black/50
              rounded-full
              transition-opacity
              duration-300
              opacity-0
              group-hover:opacity-100
            "
          >
            <RxPencil1 className='text-white mb-2' size={32} />
            <p className='
              font-semibold
              text-sm
              md:text-base
              lg:text-lg
              text-white
              text-center
              px-2
            '>
              Select Picture
            </p>
          </div>
        </div>

        {/* User Name Section */}
        <div className="flex flex-col justify-center mt-4 md:mt-16 md:ml-4">
          <p className='text-neutral-400 font-semibold text-sm'>Profile</p>
          <p className='text-white font-bold text-3xl md:text-5xl lg:text-6xl'>{full_name || "User Name"}</p>
          <p className="text-neutral-400 text-sm">{songs.length} {songs.length > 1 ? "Songs" : "Song"} Uploaded &bull; <span className="text-neutral-400 font-semibold text-sm">
            {
              playlists.length
            } playlists created
          </span></p>
        </div>
      </div>
    </div>
  );
}