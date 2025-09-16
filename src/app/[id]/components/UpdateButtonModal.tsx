"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { UpdatePlaylistForm } from './UpdatePlaylistForm'
import { UpdateDialogProps } from '@/Interfaces/types'
import { twMerge } from 'tailwind-merge'

const UpdateButtonModal: React.FC<UpdateDialogProps> = (
    {
        playlistData,
        disabled
    }
) => {
    return (
        <div>
            <Dialog >
                <DialogTrigger asChild>
                    <Button disabled={ disabled }  variant="secondary" className={twMerge(
                        `rounded-2xl py-1  bg-neutral-800`
                    )}>
                        <FaPlus className='text-white' size={5} />
                        <p className='text-white font-semibold text-[10px]'> Update </p>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg bg-neutral-800">
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
        </div>
    )
}

export default UpdateButtonModal
