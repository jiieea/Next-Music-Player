'use client'
import useAuthModal from '@/hook/useAuthModal'
import useUploadModal from '@/hook/useUploadModal'
import { useUsers } from '@/hook/useUser'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'
import { Playlist, Song } from '../../types'
import MediaItem from './MediaItem'
import useOnplay from '@/hook/useOnPlay'
import { TbMusicPlus } from "react-icons/tb";
import { RxFilePlus } from "react-icons/rx";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import usePlaylistModal from '@/hook/usePlaylistModal'
import PlaylistItem from './PlaylistItem'
interface LibraryProps {
  songs: Song[],
  playlist : Playlist[]
}

interface DropdownMenuProps {
  onHandleCreatePlaylist : () => void
  onHandleAddSong : () => void
}


export const DropdownMenuDemo:React.FC<DropdownMenuProps> = ({
  onHandleAddSong , 
  onHandleCreatePlaylist
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <AiOutlinePlus className='cursor-pointer text-neutral-500 
                 hover:text-white transition'
          size={20} />
      </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-neutral-900 text-white border-none shadow-lg" align="start">
          <DropdownMenuGroup>
          <DropdownMenuItem onClick={onHandleCreatePlaylist} className='h-[50px] '>
             {/* // TODO : Open add playlist modal when it clicked */}
            <TbMusicPlus /> Playlist 
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onHandleAddSong} className='h-[50px]'>
            {/* TODO : Open Add song modal when it click */}
            <RxFilePlus /> Add Song
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const Library: React.FC<LibraryProps> = ({
  songs,
  playlist
}) => {
  const { user  } = useUsers();
  const onPlay = useOnplay(songs);
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const playlistModal = usePlaylistModal();

  const handleAddSong = () => {
      if (!user) {
          return authModal.onOpen();
      } else {
          return uploadModal.onOpen();
      }
  }

  const handleCreatePlaylist = () => {
    if(!user) {
      return authModal.onOpen() // open authmodal if user's not authenticated
    }else {
      return playlistModal.onOpen()
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex
        items-center justify-between
        px-5 pt-4">
        <div className='inline-flex gap-x-2 '>
          <TbPlaylist size={26} className='text-neutral-400' />
          <p className='text-neutral-400 font-medium text-md'>Your Library</p>
        </div>
        <DropdownMenuDemo onHandleCreatePlaylist={handleCreatePlaylist} onHandleAddSong={ handleAddSong }/>,
      </div>
      <div className='flex flex-col gap-y-2 mt-3'>
        {
          songs.map((item) => (
            <MediaItem key={item.id} data={item} onClick={(id: string) => onPlay(id)} />
          ))
        }
      </div>
      {/* render playlist by user */}
      <div className='flex flex-col gap-y-2 mt-3'>
   {
    playlist.map((item) => (
   <PlaylistItem key={item.id} playlist={item} onClick={() => {}}/>
    ))
   }
      </div>
    </div>
  )
}

export default Library
