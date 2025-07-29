'use client'

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FaPlay } from "react-icons/fa";
import { useUsers } from "@/hook/useUser";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";

interface ListItemProps {
    name: string,
    href: string,
    image: string,
}
export const ListItem: React.FC<ListItemProps> = ({ name, href, image }) => {
    const router = useRouter();
    const {user} = useUsers()
    const onClick = () => {
        if (!user) {
            toast.error('Please login first to see your like songs')
            return;
        }

        router.push(href)
    }
    return (
        <>
            <button className="relative 
                group flex items-center rounded-md overflow-hidden gap-x-4 hover:bg-neutral-100/20 bg-neutral-100/10 transition pr-4
            "
                onClick={onClick}
            >
                <div className="
                relative min-h-[64px] min-w-[64px]">
                    <Image src={image} className="object-cover" fill alt="Image" />
                </div>
                <p className="font-semibold 
            truncate py-5 ">{name}</p>
                <div className="absolute right-5 bg-green-500 rounded-full p-4  group-hover:opacity-100
                transition drop-shadow-md hover:scale-110 opacity-0">
                    <FaPlay className=" text-black" />
                </div>
            </button>
            <Toaster richColors position="top-center"/>
        </>
    )
}
