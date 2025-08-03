import { useUsers } from '@/hook/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Modal from "./Modal"
import usePlaylistModal from '@/hook/usePlaylistModal';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Image from 'next/image';
import { FieldValues, useForm , SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import uniqid from 'uniqid'
const PlaylistModal = () => {
  const playlistModal = usePlaylistModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { user  } = useUsers();
  const {
    reset , 
    handleSubmit,
    register
  } = useForm<FieldValues>({
    defaultValues : {
      playlistName : null,
      playlistImage : null
    }
  })


  const uploadPlaylist:SubmitHandler<FieldValues> = async(values) => {
    try {
      setIsLoading(true);
      const imageFile = values.playlistImage?.[0];  
      if(!imageFile) {
        toast.error('missing fields')
      }

      const uniqueID = uniqid()

      // fetch data from supabase table
      const { data : playlistImage , error  : playlistError } = await supabase.storage
      .from('playlist').upload(`playlist-${user?.id}-${uniqueID}` , imageFile , {
        cacheControl : '3600',
        upsert : false
      });

      if(playlistError) {
        setIsLoading(false)
        toast.error('failed upload image')
      }

      // if success store to table
const { error } = await supabase.from('playlist').insert({
  user_id : user?.id,
  playlist_name : values.playlistName,
  playlist_image : playlistImage?.path
})

      if(error) {
        setIsLoading(false)
        console.log(error)
        toast.error('failed add playlist')
      }

      router.refresh();
      setIsLoading(false)
      toast.success('New Playlist has been Created');
      playlistModal.onClose();
      reset()
    } catch (error) {
      console.error('Error uploading playlist:', error);
    } finally {
      setIsLoading(false);
    }

  }

  {/*  // Todo: create upload hook  
   // the hook provides access to isOpen (boolean indicating when the modal is open ) 
   // and onClose(a function to close modal ) */}
  const handleOpenModal = (open: boolean) => {
    if (!open) {
      reset()
      playlistModal.onClose()
    }
  }



  return (
    <Modal
      title="Add New Playlist"
      description="You can add new playlist and add songs "
      onChange={handleOpenModal}
      isOpen={playlistModal.isOpen}
    >
      <form action="" className="flex flex-col gap-y-2 mt-5" onSubmit={handleSubmit(uploadPlaylist)}>
          <div className="flex gap-x-4 flex-row-reverse justify-evenly mt-2">
            {/* Username Input */}
            <div className="flex flex-col "> {/* Group label and input */}
              <label htmlFor="fullName" className="text-white text-sm font-bold">Playlist name</label>
              <Input
                disabled={isLoading}
                id="fullName"
                // defaultValue={userDetails?.full_name}
                placeholder="Enter your username"
                className="
                py-3 px-4 rounded-md bg-neutral-700 border border-neutral-600 
                text-white placeholder-neutral-400 
                disabled:cursor-not-allowed disabled:opacity-50 
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
              "
                {...register('playlistName', { required: false })}
              />
            </div>

            {/* Avatar Display - Spotify style */}
            <div className="flex justify-center mb-6">
              <div className="relative w-34 h-34 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center">
              <Image
              // get public url
                    src=""
                    fill
                    alt="User Avatar"
                    className="  object-cover
              rounded-full
              w-full h-full
              transition-transform
              group-hover:scale-105 /* Slight zoom on hover */"
                  />
                {/* Overlay for changing avatar */}
                <label
                  htmlFor="playlistImg"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-white text-sm"
                >
                  Choose Photo
                </label>
                <Input
                  id="playlistImg"
                  type="file"
                  accept="image/*"
                  className="hidden" // Hide the default file input
                  disabled={isLoading}
                  {...register('playlistImage', { required: false })} // Made image optional
                />
              </div>
            </div>
          </div> 
          <div className="flex justify-end mt-[-4rem] ">
            <Button className="py-2 mt-2 bg-white text-black rounded-2xl w-3/6 hover:scale-105 transition" type="submit">Create</Button>
          </div>

        </form>
    </Modal>
  )
}

export default PlaylistModal
