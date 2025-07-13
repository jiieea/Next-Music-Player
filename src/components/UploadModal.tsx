"use client"

import useUploadModal from "@/hook/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { useState } from "react";
import Button from "./Button";
import { toast } from "sonner";
import { useUsers } from "@/hook/useUser";
import uniqid from 'uniqid'
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
/**
 * UploadModal component for handling song uploads.
 * This component utilizes a custom hook `useUploadModal` to manage its open/close state.
 * It renders a `Modal` component, providing it with a title, description, and
 * a callback function for when the modal's open state changes.
 */

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const supabaseClient = useSupabaseClient()
    const { user } = useUsers();
    //     * Initializes the upload modal state manager from the `useUploadModal` hook.
    //    * This hook provides access to `isOpen` (boolean indicating if the modal is open)
    //    * and `onClose` (function to close the modal).
    const uploadModal = useUploadModal();
    const {
        reset,
        handleSubmit,
        register
    } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            tittle: "",
            song: null,
            image: null
        }
    })

    //     **
    //    * Handles the change event of the Modal component.
    //    * This function is called when the Modal's open state changes (e.g., when the user clicks outside or presses escape).
    //    * If the modal is being closed (`open` is false), it triggers the `onClose` action from the `useUploadModal` hook
    //    * to update the global state.
    //    *
    const showUploadModal = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    //function to upload songs to supabase
    const handleUploadSong: SubmitHandler<FieldValues> = async (values) => {
        // upload to supbase
        try {
            setIsLoading(true);
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile || !user) {
                toast.error("Missing FIelds")
            }

            const uniqueID = uniqid();

            // get data from supabase's bucket
            // upload song
            const { data: songData,
                error: songError
            } = await supabaseClient.storage.from('songs').upload(`song-${values.tittle}-${uniqueID}`, songFile, {
                cacheControl: '3600',
                upsert: false
            });

            // upload images song
            const {
                data: imagesData,
                error: imagesError
            } = await supabaseClient.storage.from('images').upload(`image-${imageFile.name}-${uniqueID}`, imageFile, {
                cacheControl: '3600',
                upsert: false
            })

            // check if there's an error while uploading song or image
            if (imagesError) {
                setIsLoading(false);
                return toast.error('failed image upload')
            }

            if (songError) {
                setIsLoading(false);
                return toast.error("failed song upload")
            }

            const { error : supabaseError } = await supabaseClient.from('songs').insert({
                user_id: user?.id,
                tittle: values.tittle,
                author: values.author,
                image_path: imagesData.path,
                song_path: songData.path
            })

            if(supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message)
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Song Created")
            uploadModal.onClose();
            reset();
        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : 'Something went wrong')
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <Modal
                title="Add a song "
                description="Upload an mp3 file"
                isOpen={uploadModal.isOpen}
                onChange={showUploadModal}
            >
                <form action="" onSubmit={handleSubmit(handleUploadSong)} className="flex flex-col gap-y-3">
                    <Input
                        id="tittle"
                        type="text"
                        disabled={isLoading}
                        placeholder="Enter the tittle"
                        className="mt-4 py-3 px-4  rounded-md bg-neutral-700 border-transparent
                        disable:cursor-not-allowed disabled:opacity-50 focus:outline-none"
                        {...register('tittle', { required: true })}
                    />

                    <Input
                        id="author"
                        type="text"
                        disabled={isLoading}
                        placeholder="Song author"
                        className="mt-4 py-3 px-4  rounded-md bg-neutral-700 border-transparent
                        disable:cursor-not-allowed disabled:opacity-50 focus:outline-none"
                        {...register('author', { required: true })}
                    />

                    <div className="gap-y-2 flex flex-col">
                        <div className="mb-2">
                            Select song file

                        </div>
                        <Input
                            id="song"
                            type="file"
                            disabled={isLoading}
                            accept=".mp3"
                            {...register('song', { required: true })}
                        />

                        <div className="mb-2">
                            Select Image Song

                        </div>
                        <Input
                            id="image"
                            type="file"
                            disabled={isLoading}
                            accept="images/*"
                            {...register('image', { required: true })}
                        />
                        <Button className="py-2 mt-2 " type="submit">Create</Button>
                    </div>
                </form>
            </Modal>
        </>
    )

}


export default UploadModal;