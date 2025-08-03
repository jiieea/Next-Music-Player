import React from 'react'
import * as Dialog from "@radix-ui/react-dialog"
import { IoMdClose } from 'react-icons/io'


interface ModalProps {
    children: React.ReactNode,
    title: string,
    description: string,
    isOpen: boolean,
    onChange: (open: boolean) => void
}
const Modal: React.FC<ModalProps> = ({
    children,
    title,
    isOpen,
    description,
    onChange
}) => {
    return (
        <Dialog.Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}
        >
            <Dialog.Portal>
                <Dialog.Overlay
                    className='bg-neutral-900/90 
                backdrop-blur-sm fixed inset-0
            '
                />

                <Dialog.Content
                    className='fixed 
                        drop-shadow-md
                        top-[50%]
                        border border-neutral-700
                        left-[50%]
                        max-h-[85vh] {/* Adjusted to explicitly set max height for all screen sizes */}
                        w-[90vw] {/* Changed from md:w-[90wh] to a more standard viewport width */}
                        md:max-w-[450px]
                        translate-x-[-50%]
                        translate-y-[-50%]
                        rounded-md
                        p-[25px]
                        bg-neutral-800
                        focus:outline-none
                        overflow-y-auto {/* Added for scrollability if content exceeds max-height */}
                '>
                    <Dialog.Title className='text-white mb-2 text-center font-semibold '>{title}</Dialog.Title>
                    <Dialog.Description className='text-white text-center'>
                        {description}
                    </Dialog.Description>
                    <div className='text-white'>
                        {children}
                    </div>
                    <Dialog.Close asChild>
                        <button 
                            title='munyenyo'
                        className='text-neutral-400
                        hover:text-white
                        absolute
                        top-[10px]
                        right-[10px]
                        inline-flex
                        h-[25px]
                        w-[25px]
                        appearance-none
                        rounded-full
                        items-center
                        justify-center
                        focus:outline-none
                    '>
                            <IoMdClose />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default Modal