"use client"

import useProfileModal from "@/hook/useProfileModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import uniqid from 'uniqid'
import Modal from "./Modal";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUsers } from "@/hook/useUser";
import Image from "next/image";



const ProfileModal: React.FC = (

) => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useSupabaseClient();
  const router = useRouter()
  const profileModal = useProfileModal()
  const { user, userDetails } = useUsers();
  const {
    reset,
    handleSubmit,
    register
  } = useForm<FieldValues>({
    defaultValues: {
      fullName: userDetails?.full_name,
      image: userDetails?.avatar_url,
    }
  })

  // function to show modal 
  const handleShowModal = (open: boolean) => {
    if (!open) {
      reset()
      profileModal.onClose()
    }
  }

  // function to upload profile 
  const uploadProfile: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];

      if (!imageFile) {
        toast.error('Missing Fields')
      }

      const uniqueID = uniqid();
      // upload image avatar to bucket
      const { data: avatarData, error: avatarError } = await supabase.storage
        .from('avatars').upload(`avatar-${user?.id}-${uniqueID}`, imageFile, {
          cacheControl: '3600',
          upsert: false
        })


      if (avatarError) {
        setIsLoading(false);
        console.error("Supabase Avatar Upload Error:", avatarError);
        return toast.error(`Failed to upload avatar: ${avatarError.message || 'Unknown error'}`); // Show more specific error
      }

      const { error: supabaseError } = await supabase.from('users').update({
        full_name: values.fullName,
        avatar_url: avatarData.path
      }).eq('id', user?.id)

      if (supabaseError) {
        setIsLoading(false)
        toast.error("failed update data");
      }

      router.refresh();
      setIsLoading(false)
      toast.success("Profile Has Updated Successfully")
      profileModal.onClose()
      reset();
    } catch (e: unknown) {
      if (e instanceof Error) {
        return toast.error('Update Failed')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Modal
        title="Profile Information"
        description=" You can change your avatar or username"
        isOpen={profileModal.isOpen}
        onChange={handleShowModal}
      >
        <form action="" onSubmit={handleSubmit(uploadProfile)} className="flex flex-col gap-y-2 mt-5">
          <div className="flex gap-x-4 flex-row-reverse justify-evenly mt-2">
            {/* Username Input */}
            <div className="flex flex-col "> {/* Group label and input */}
              <label htmlFor="fullName" className="text-white text-sm font-bold">Username</label>
              <Input
                disabled={isLoading}
                id="fullName"
                defaultValue={userDetails?.full_name}
                placeholder="Enter your username"
                className="
                py-3 px-4 rounded-md bg-neutral-700 border border-neutral-600 
                text-white placeholder-neutral-400 
                disabled:cursor-not-allowed disabled:opacity-50 
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
              "
                {...register('fullName', { required: false })}
              />
            </div>

            {/* Avatar Display - Spotify style */}
            <div className="flex justify-center mb-6">
              <div className="relative w-34 h-34 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center">
                {userDetails?.avatar_url ? (
                  <Image
                    src={supabase.storage.from('avatars').getPublicUrl(userDetails.avatar_url).data.publicUrl}
                    fill
                    alt="User Avatar"
                    className="  object-cover
              rounded-full
              w-full h-full
              transition-transform
              group-hover:scale-105 /* Slight zoom on hover */"
                  />
                ) : (
                  <span className="text-neutral-400 text-5xl">👤</span> // Placeholder icon
                )}
                {/* Overlay for changing avatar */}
                <label
                  htmlFor="avatar"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-white text-sm"
                >
                  Choose Photo
                </label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden" // Hide the default file input
                  disabled={isLoading}
                  {...register('image', { required: false })} // Made image optional
                />
              </div>
            </div>
          </div> 
          <div className="flex justify-end mt-[-4rem] ">
            <Button className="py-2 mt-2 bg-white text-black rounded-2xl w-3/6 hover:scale-105 transition" type="submit">Create</Button>
          </div>

        </form>
      </Modal>
    </>
  )
}

export default ProfileModal;