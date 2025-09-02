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
import { useLoadAvatar } from "@/hook/useLoadAvatar";

const ProfileModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useSupabaseClient();
  const router = useRouter();
  const profileModal = useProfileModal();
  const { user, userDetails } = useUsers();
  const avatarUrl = useLoadAvatar(userDetails!);

  const {
    reset,
    handleSubmit,
    register,
  } = useForm<FieldValues>({
    defaultValues: {
      fullName: userDetails?.full_name || '',
      image: null,
    }
  });

  const handleShowModal = (open: boolean) => {
    if (!open) {
      reset();
      profileModal.onClose();
    }
  };

  const uploadProfile: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0]

      let avatarPath = userDetails?.avatar_url;

      if (imageFile) {
        const uniqueID = uniqid();
        const { data: avatarData, error: avatarError } = await supabase.storage
          .from('avatars').upload(`avatar-${user?.id}-${uniqueID}`, imageFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (avatarError) {
          setIsLoading(false);
          console.error("Supabase Avatar Upload Error:", avatarError);
          return toast.error(`Failed to upload avatar: ${avatarError.message || 'Unknown error'}`);
        }
        avatarPath = avatarData.path;
      }

      const { error: supabaseError } = await supabase.from('users').update({
        full_name: values.fullName,
        avatar_url: avatarPath
      }).eq('id', user?.id);

      if (supabaseError) {
        setIsLoading(false);
        toast.error("Failed to update data");
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Profile Has Updated Successfully");
      profileModal.onClose();
      reset();
    } catch (e: unknown) {
      if (e instanceof Error) {
        return toast.error(`Update Failed: ${e.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Profile Information"
        description="You can change your avatar or username"
        isOpen={profileModal.isOpen}
        onChange={handleShowModal}
      >
        <form onSubmit={handleSubmit(uploadProfile)} className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-6">
            {/* Avatar Section */}
            <div className="relative w-44 h-44 rounded-full overflow-hidden bg-neutral-700 flex-shrink-0">
              <Image
                src={avatarUrl || '/images/user.png'}
                fill
                alt="User Avatar"
                className="object-cover"
              />
              {/* Overlay for changing avatar */}
              <label
                htmlFor="image"
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-white text-sm font-semibold"
              >
                Choose Photo
              </label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                disabled={isLoading}
                {...register('image', { required: false })}
              />
            </div>

            {/* Username and Button Section */}
            <div className="flex flex-col flex-grow">
              <label htmlFor="fullName" className="text-white text-xs font-semibold mb-1">
                Username
              </label>
              <Input
                disabled={isLoading}
                id="fullName"
                defaultValue={userDetails?.full_name || ''}
                placeholder="Enter your username"
                className="
                                    bg-[#282828]
                                    border-neutral-700
                                    text-white
                                    placeholder-neutral-400
                                    focus:ring-white
                                    focus:border-white
                                    p-3 rounded-md
                                "
                {...register('fullName', { required: false })}
              />
              <div className="flex justify-end">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="
                                    bg-white
                                    text-black
                                    rounded-full
                                    w-2/4                     
                                    mt-4
                                    py-2
                                    font-bold
                                    hover:bg-neutral-200
                                    transition
                                "
                >
                  Update Profile
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ProfileModal;