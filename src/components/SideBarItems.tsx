import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'


interface SideBarItemsProps {
    icon: IconType,
    label: string,
    active?: boolean,
    href: string
}
const SideBarItems: React.FC<SideBarItemsProps> = ({
    icon: Icon,
    label,
    active,
    href
}) => {
    return (
        <Link href={href} className={twMerge(`
    flex flex-row px-5 gap-y-2 items-center w-full
    py-2  cursor-pointer text-md transition  h-auto gap-x-4
     hover:text-white text-neutral-600  font-medium`
            , active && "text-white")}>
            <Icon size={26}></Icon>
            <p className='truncate w-full '>{label}</p>
        </Link>
    )
}

export default SideBarItems
