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

const ProfileModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useSupabaseClient();
  const router = useRouter()
  const profileModal = useProfileModal()
  const { user } = useUsers()

  const {
    reset,
    handleSubmit,
    register
  } = useForm<FieldValues>({
    defaultValues: {
      fullName: "",
      image: null,
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
        <form action="" onSubmit={handleSubmit(uploadProfile)} className="flex flex-col gap-y-4">
          <Input
            disabled={isLoading}
            id="userName"
            placeholder="Enter The UserName"
            className="mt-4 py-3 px-4  rounded-md bg-neutral-700 border-transparent
                        disable:cursor-not-allowed disabled:opacity-50 focus:outline-none"
            {...register('fullName', { required: true })}
          />
          <Input
            id="avatar"
            type="file"
            accept="images/*"
            placeholder="upload the avatar"
            className="mt-4 py-3 px-4  rounded-md bg-neutral-700 border-transparent
                        disable:cursor-not-allowed disabled:opacity-50 focus:outline-none"
            disabled={isLoading}
            {...register('image', { required: true })}
          />
          <Button className="py-2 mt-2 " type="submit">Create</Button>
        </form>
      </Modal>
    </>
  )
}

export default ProfileModal;