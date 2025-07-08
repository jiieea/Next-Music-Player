'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'
import Btn from "./Button";
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { Button } from "@/components/ui/button"

interface HeaderProps {
    className?: string
}
const Header: React.FC<HeaderProps> = ({
    className
}) => {
    const router = useRouter();
    return (
        <div className={twMerge(`
                bg-gradient-to-b from-emerald-800 h-fit p-6
            ` ,
            className
        )}>
            <div className="flex mb-4 items-center justify-between w-full">
                <div className='hidden gap-x-2 md:flex items-center'>
                    <Button className='rounded-full  hover:opacity-75 transition  bg-black p-2' onClick={() => router.back()}>
                        <RxCaretLeft size={20} className='' />
                    </Button>
                    <Button className='rounded-full  hover:opacity-75 transition   bg-black p-2' onClick={() => router.forward()}>
                        <RxCaretRight size={20} className='' />
                    </Button>
                </div>
                <div className='justify-between items-center gap-x-4 md:hidden flex '>
                    <Button className='bg-white rounded-full p-2 hover:opacity-80'>
                        <HiHome className='text-black' size={20} />
                    </Button>
                    <Button className='bg-white rounded-full p-2 hover:opacity-80'>
                        <BiSearch size={20} className='text-black' />
                    </Button>
                </div>
                <div className='flex justify-between items-center gap-x-2'>
                    <>
                        <div className='flex gap-x-0.5'>
                            <Btn className=' bg-transparent text-neutral-400 font-medium'>
                                SignUp
                            </Btn>
                            <Btn className=' bg-transparent text-neutral-400 font-medium'>
                                SignUp
                            </Btn>
                        </div>
                    </>
                </div>
            </div>
        </div >
    )
}

export default Header