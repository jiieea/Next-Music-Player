'use client'

import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import Box from './Box';
import SideBarItems from './SideBarItems';
import Library from './Library';
import { Playlist, Song, UserDetails } from "../../types"
import { twMerge } from 'tailwind-merge';
import usePlayerSong from '@/hook/usePlayerSong';


interface SidebarProps {
    children: React.ReactNode;
    songs : Song[]
    playlist : Playlist[]
    userDetail : UserDetails
}

export const Sidebar: React.FC<SidebarProps> = ({
    children,
    songs,
    playlist,
    userDetail
}) => {
    const player = usePlayerSong()
    const pathname = usePathname();
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: "Home",
            active: pathname !== '/search',
            href: "/"
        }, {
            icon: BiSearch,
            label: "Search",
            active: pathname === "/search",
            href: "/search"
        }
    ], [pathname])
    return (
        <div className={twMerge(`flex h-full` , player.activeId && "h-[calc(100%-80px)]")}>
            <div className="
        hidden
        md:flex
        flex-col
        h-full
        gap-y-2
        bg-black
        w-[300px]
        p-2
        ">
                <Box>
                    {
                        routes.map((item) => (
                            <SideBarItems key={item.label} {...item} />
                        ))
                    }
                </Box>
                <Box className='overflow-y-auto h-full'>
                    <Library  songs={ songs } playlist={playlist} userDetail={ userDetail }/>
                </Box>
            </div>
            <main className='p-2 flex-1 h-full overflow-y-auto '>{children}</main>
        </div>
    )
}
