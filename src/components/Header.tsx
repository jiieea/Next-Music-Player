'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'
import Btn from "./Button";
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { Button } from "@/components/ui/button"
import useAuthModal from '@/hook/useAuthModal'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUsers } from '@/hook/useUser'
import { toast } from 'sonner'
import { Toaster } from './ui/sonner'
import { UserDetails } from '../../types'
import {useLoadAvatar} from '@/hook/useLoadAvatar'
import Image from 'next/image'

interface HeaderProps {
  className?: string;
  userData?: UserDetails;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
const Header: React.FC<HeaderProps> = ({
    userData
    , children,
    className,
    style
}) => {
    // Initialize Next.js router for programmatic navigation.
    const router = useRouter();
    // Get the auth modal state and functions from the custom hook.
    const authModal = useAuthModal();
    // Get the Supabase client instance to interact with authentication.
    const supabaseClient = useSupabaseClient();
    // Get the current user object from your custom user hook.
    const { user } = useUsers();
    const loadAvatar = useLoadAvatar(userData!)

/**
     * handleLogout
     * Asynchronously handles the user logout process.
     * It signs the user out of Supabase and then refreshes the page
     * to reflect the logged-out state. Logs any errors to the console.
     */
    const handleLogout = async () => {
        try {
            const { error } = await supabaseClient.auth.signOut();
            router.refresh();
            if (error) {
                toast.error(error.message)
            } else {
                toast.success("Logout Successfull");
            }
        } catch (e : unknown) {
            if(e instanceof Error ) {
                toast.error(e.message)
            }
        }
    }
    return (
        <>
            <div className={twMerge(`
                bg-gradient-to-b from-emerald-800 h-fit p-6 rounded-lg
            ` ,
                className
            )} style={style} >
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
                        <Button className='bg-white rounded-full p-2 hover:opacity-80' onClick={() => router.push('/')}>
                            <HiHome className='text-black' size={20} />
                        </Button>
                        <Button className='bg-white rounded-full p-2 hover:opacity-80' onClick={() => router.push('/search')}>
                            <BiSearch size={20} className='text-black' />
                        </Button>
                    </div>
                    <div className='flex justify-between items-center gap-x-4'>
                        {
                            user ? (
                                <div className='items-center flex gap-x-3'>
                                    <Btn className='bg-white px-6 py-2' onClick={handleLogout}>
                                        Logout
                                    </Btn>
                                    <Btn className='bg-neutral-800 rounded-full p-1' onClick={() => router.push('/account')}>
                                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"> {/* New wrapper div */}
                                            <Image
                                                src={loadAvatar || "/images/user.png"}
                                                alt="avatar"
                                                width={40}
                                                height={40}
                                                className='object-cover w-full h-full cursor-pointer' // Ensure image fills and covers
                                            />
                                        </div>
                                    </Btn>
                                </div>
                            ) : (
                                <>
                                    <div className='flex gap-x-6'>
                                        <Btn className=' bg-transparent text-neutral-400 font-medium' onClick={authModal.onOpen}>
                                            SignUp
                                        </Btn>
                                        <Btn className=' bg-white text-black px-4 py-1 font-medium' onClick={authModal.onOpen}>
                                            SignIn
                                        </Btn>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
                {children}
            </div >
            <Toaster position='top-center' richColors />
        </>
    )
}

export default Header
