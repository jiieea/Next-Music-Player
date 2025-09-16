import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { UpdatePlaylistForm } from '@/app/[id]/components/UpdatePlaylistForm'
import { RxPencil1 } from 'react-icons/rx'
import { UpdateDialogProps } from '../Interfaces/types'
import { twMerge } from 'tailwind-merge'

const UpdateDialog: React.FC<UpdateDialogProps> =
    ({
        playlistData,
        disabled
    }

    ) => {
        return (
            <Dialog >
                <DialogTrigger asChild>
                    <button type='button' disabled={disabled} className="flex items-center gap-x-4   ">
                        <RxPencil1 className={twMerge(`text-white`, disabled && "text-neutral-600")} size={25} />
                        <span className={twMerge(`text-white font-semibold`, disabled && "text-neutral-600")}>Update Playlist</span>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg bg-neutral-800 p-2">
                    <DialogHeader>
                        <DialogTitle className='text-white text-2xl'>Update Information </DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    {/* todo : create update playlist form , 
                                we can use form that we've created bfr */}
                    <UpdatePlaylistForm
                        playlistData={playlistData}
                    />

                </DialogContent>
            </Dialog>
        )
    }

export default UpdateDialog
