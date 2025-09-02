import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React from "react";
import { RxPencil1 } from "react-icons/rx";


interface UpdatePlaylistModalProps {
    children : React.ReactNode
}
const UpdatePlaylistModal:React.FC<UpdatePlaylistModalProps> = (
    {
        children
    }
) => {
  return (
    <Dialog >
                <DialogTrigger asChild>
                    <button type='button' className="flex items-center gap-x-2 p-2 ">
                        <RxPencil1 className='text-neutral-600 ' size={15} />
                        <span>Update Playlist</span>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg bg-neutral-800">
                    <DialogHeader>
                        <DialogTitle className='text-white text-2xl'>Update Information </DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        {children}
                    </div>
                  
                </DialogContent>
            </Dialog>
  )
}

export default UpdatePlaylistModal
