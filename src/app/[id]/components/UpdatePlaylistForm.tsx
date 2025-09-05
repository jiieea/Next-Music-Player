"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Playlist } from '../../../../types'
import { useLoadPlaylistImage } from '@/hook/useLoadAvatar'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'sonner'
import uniqid from 'uniqid'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUsers } from '@/hook/useUser'
import { useRouter } from 'next/navigation'
import { DialogClose } from '@/components/ui/dialog'

interface UpdatePlaylistFormProps {
    playlistData: Playlist
}
export const UpdatePlaylistForm = ({
    playlistData
}: UpdatePlaylistFormProps) => {
    const { user } = useUsers()
    const [previewImg, setPreviewImg] = useState<string | null>(null)
    const playlistImgUrl = useLoadPlaylistImage(playlistData);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const supabase = useSupabaseClient()
    const {
        reset,
        handleSubmit,
        register,
        watch
    } = useForm<FieldValues>({
        defaultValues: {
            name: playlistData.playlist_name,
            description: playlistData.description || null
        }
    })

    const previewPlaylistImg = watch('playlistImage') // Watch the correct field name

    //  to show preview image before submit the form
    useEffect(() => {
        if (previewPlaylistImg && previewPlaylistImg.length > 0) {
            const file = previewPlaylistImg[0];
            const newPreviewUrl = URL.createObjectURL(file);
            setPreviewImg(newPreviewUrl);
            return () => URL.revokeObjectURL(newPreviewUrl);
        } else {
            setPreviewImg(null);
        }
    }, [previewPlaylistImg]);

    const updatePlaylistInfo: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true); // Set loading to true at the start
            const playlistName = values.name;
            const playlistImg = values.playlistImage?.[0]; // Access the correct field name

            if (playlistImg) {
                const uniqueID = uniqid();

                // Upload the new image
                const { data: uploadedImageData, error: uploadError } = await supabase.storage
                    .from('playlist').upload(`playlist-${user?.id}-${uniqueID}`, playlistImg, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) {
                    setIsLoading(false);
                    toast.error(uploadError.message);
                    return;
                }

                // Update the playlist record with the new image path
                const { error: updateError } = await supabase.from('playlist')
                    .update({
                        playlist_name: playlistName,
                        playlist_image: uploadedImageData?.path // Use the path from the upload
                    })
                    .eq('id', playlistData.id); // IMPORTANT: Specify which playlist to update

                if (updateError) {
                    setIsLoading(false);
                    toast.error(updateError.message);
                    return;
                }
            } else if (playlistName !== playlistData.playlist_name || values.description !== playlistData.description) {
                // If no new image, but name or description changed, update those
                const { error: updateError } = await supabase.from('playlist')
                    .update({
                        playlist_name: playlistName,
                        description: values.description // Assuming you want to update description as well
                    })
                    .eq('id', playlistData.id); // IMPORTANT: Specify which playlist to update

                if (updateError) {
                    setIsLoading(false);
                    toast.error(updateError.message);
                    return;
                }
            }
            router.refresh();
            setIsLoading(false);
            toast.success('Playlist Updated');
            reset(); // You might want to reset or re-fetch data to reflect changes
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error("Failed to update playlist: " + e.message);
            } else {
                toast.error("An unknown error occurred during playlist update.");
            }
        } finally {
            setIsLoading(false); // Ensure loading is reset even if there's an uncaught error
        }
    };


    return (
        <form onSubmit={handleSubmit(updatePlaylistInfo)}>
            <div className='flex gap-x-4 mt-4'>
                {/* Image and Overlay Container */}
                <div className="relative w-[200px] h-[200px] group"> {/* Added group for hover effect */}
                    {
                        previewImg ? (
                            <Image
                                src={previewImg}
                                alt='playlistImg'
                                fill // Use fill for better image handling within a container
                                className='object-cover rounded-md'
                            />
                        ) : (
                            <Image
                                src={playlistImgUrl || '/images/liked.png'}
                                alt='playlistImg'
                                fill // Use fill for better image handling within a container
                                className='object-cover rounded-md'
                            />
                        )
                    }
                    {/* Overlay for changing avatar */}
                    <label
                        htmlFor="playlistImg"
                        className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            bg-black/50
                            opacity-0
                            group-hover:opacity-100
                            transition-opacity
                            cursor-pointer
                            text-white
                            text-sm
                            rounded-md
                        "
                    >
                        Choose Photo
                    </label>
                    <Input
                        id="playlistImg"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isLoading}
                        {...register('playlistImage', { required: false })}
                    />
                </div>

                {/* Form Inputs */}
                <div className="flex-1"> {/* Use flex-1 to make this div take remaining space */}
                    {/* Playlist Name Input */}
                    <div className="mb-4">
                        <Input
                            type="text"
                            disabled={isLoading}
                            {...register('name', { required: false })}
                            defaultValue={playlistData.playlist_name}
                            id="playlist-name"
                            className="bg-neutral-700 rounded-md border border-transparent p-3 text-white placeholder-gray-500 focus:border-neutral-400 focus:outline-none w-full py-5"
                            placeholder="My Playlist"
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <textarea
                            id="description"
                            rows={5}
                            className="rounded-sm w-full border border-transparent bg-neutral-700 p-3 text-white placeholder-gray-500 focus:border-neutral-400 focus:outline-none"
                            placeholder="Give your playlist a description"
                            {...register('description', { required: false })}
                        />
                    </div>
                    <div className="flex justify-end">
                        <DialogClose asChild>
                            <Button
                                type="submit"
                                disabled={isLoading} // Disable button when loading
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
                                {isLoading ? 'Updating...' : 'Update Playlist'} {/* Provide feedback during loading */}
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </div>
        </form>
    )
}