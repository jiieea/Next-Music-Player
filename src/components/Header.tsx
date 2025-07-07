'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'
import Button from "./Button";
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
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
                    <button className='rounded-full  hover:opacity-75 transition  bg-black p-2' onClick={() => router.back()}>
                        <RxCaretLeft size={20} className='' />
                    </button>
                    <button className='rounded-full  hover:opacity-75 transition   bg-black p-2' onClick={() => router.forward()}>
                        <RxCaretRight size={20} className='' />
                    </button>
                </div>
                <div className='justify-between items-center gap-x-4 md:hidden flex '>
                    <button className='bg-white rounded-full p-2'>
                        <HiHome className='text-black' size={20} />
                    </button>
                    <button className='bg-white rounded-full p-2 '>
                        <BiSearch size={20} className='text-black' />
                    </button>
                </div>
                <div className='flex justify-between items-center gap-x-2'>
                    <>
                        <div className='flex gap-x-0.5'>
                            <Button className=' bg-transparent text-neutral-400 font-medium'>
                                SignUp
                            </Button>
                            <Button className=' bg-transparent text-neutral-400 font-medium'>
                                SignUp
                            </Button>
                        </div>
                    </>
                </div>
            </div>
        </div >
    )
}

export default Header