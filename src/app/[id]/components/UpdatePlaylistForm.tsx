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

    const previewPlaylistImg = watch('playlistImage')

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
            setIsLoading(true);
            const playlistName = values.name;
            const playlistImg = values.playlistImage?.[0];

            if (playlistImg) {
                const uniqueID = uniqid();

                const {
                    data: uploadedImageData,
                    error: uploadError
                } = await supabase.storage
                    .from('playlist').upload(`playlist-${user?.id}-${uniqueID}`, playlistImg, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) {
                    setIsLoading(false);
                    toast.error(uploadError.message);
                    return;
                }

                const { error: updateError } = await supabase.from('playlist')
                    .update({
                        playlist_name: playlistName,
                        playlist_image: uploadedImageData?.path
                    })
                    .eq('id', playlistData.id);

                if (updateError) {
                    setIsLoading(false);
                    toast.error(updateError.message);
                    return;
                }
            } else if (playlistName !== playlistData.playlist_name || values.description !== playlistData.description) {
                const { error: updateError } = await supabase.from('playlist')
                    .update({
                        playlist_name: playlistName,
                        description: values.description
                    })
                    .eq('id', playlistData.id);

                if (updateError) {
                    setIsLoading(false);
                    toast.error(updateError.message);
                    return;
                }
            }
            router.refresh();
            setIsLoading(false);
            toast.success('Playlist Updated');
            reset();
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error("Failed to update playlist: " + e.message);
            } else {
                toast.error("An unknown error occurred during playlist update.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(updatePlaylistInfo)}>
            <div className='
                flex
                flex-col
                md:flex-row
                gap-y-4
                md:gap-x-4
                mt-4
            '>
                {/* Image and Overlay Container */}
                <div className="
                    relative
                    w-full
                    h-[200px]
                    md:w-[200px]
                    md:h-[200px]
                    group
                ">
                    {
                        previewImg ? (
                            <Image
                                src={previewImg}
                                alt='playlistImg'
                                fill
                                className='object-cover rounded-md'
                            />
                        ) : (
                            <Image
                                src={playlistImgUrl || '/images/liked.png'}
                                alt='playlistImg'
                                fill
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
                <div className="flex-1 space-y-4">
                    {/* Playlist Name Input */}
                    <div>
                        <Input
                            type="text"
                            disabled={isLoading}
                            {...register('name', { required: false })}
                            defaultValue={playlistData.playlist_name}
                            id="playlist-name"
                            className="
                                bg-neutral-700
                                rounded-md
                                border
                                border-transparent
                                p-3
                                text-white
                                placeholder-gray-500
                                focus:border-neutral-400
                                focus:outline-none
                                w-full
                                py-5
                            "
                            placeholder="My Playlist"
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <textarea
                            id="description"
                            rows={5}
                            className="
                                rounded-sm
                                w-full
                                border
                                border-transparent
                                bg-neutral-700
                                p-3
                                text-white
                                placeholder-gray-500
                                focus:border-neutral-400
                                focus:outline-none
                            "
                            placeholder="Give your playlist a description"
                            {...register('description', { required: false })}
                        />
                    </div>

                    {/* Submit Button Container */}
                    <div className="flex justify-end mt-4">
                        <DialogClose asChild>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="
                                    bg-white
                                    text-black
                                    rounded-full
                                    w-full
                                    md:w-2/4
                                    py-2
                                    font-bold
                                    hover:bg-neutral-200
                                    transition
                                "
                            >
                                {isLoading ? 'Updating...' : 'Update Playlist'}
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </div>
        </form>
    )
}