'use client'

import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
interface SidebarProps {
    children: React.ReactNode;
}

export const Sidebar : React.FC<SidebarProps> = ({
    children
}) => {
    const pathname = usePathname();
    const routes = useMemo(() => [
        {
            icon : HiHome,
            label : "Home",
            active : pathname !== '/search',
            href : "/"
        }, {
            icon : BiSearch,
            label : "Search",
            active : pathname === "/search"
        }
    ] , [pathname])
  return (
    <div className='flex flex-col  h-screen m-5 font-bold text-green-500 text-2xl'>
        { children }
    </div>
  )
}
