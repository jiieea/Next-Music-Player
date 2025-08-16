"use client"

import React from 'react'
import { Song } from '../../../../../types';
import useLoadImage from '@/hook/useLoadImage';
import {  TableCell , TableRow} from '@/components/ui/table';
import Image from 'next/image';
import useGetSongDuration from '@/hook/useGetSongDuration';
import useLoadSongUrl from '@/hook/useLoadSongUrl';
interface TableSongsProps {
    song : Song
    index : number
}
const TableSongs:React.FC<TableSongsProps>= ({
    song , 
    index
}) => {
    const songImage = useLoadImage(song);
    const songUrl = useLoadSongUrl(song)
    const songCreate = new Date(song.created_at);
    const songDuration = useGetSongDuration(songUrl)
    return (
        <>
         <TableRow className="hover:bg-neutral-700 transition border-b-0 rounded-md" key={song.id}>
                                <TableCell className="flex gap-x-3 items-center">
                                    <p className="text-white font-semibold pr-4">{index + 1}</p>
                                    <Image src={songImage || "/images/liked.png"} alt="song" width={220} height={220} className="w-[45px] h-[45px] rounded-md object-cover" />
                                    <div className="flex flex-col ">
                                        <p className="font-semibold text-white">{ song.title }</p>
                                        <p className="font-semibold text-neutral-500 hover:text-neutral-600 transition hover:underline">{ song.author }</p>
                                    </div>
                                </TableCell>
                                <TableCell className="text-neutral-600 font-semibold hover:text-neutral-300 transition text-center">{ songCreate.toLocaleDateString() }</TableCell>
                                <TableCell className="text-neutral-600 font-semibold hover:text-neutral-300 transition">{ songDuration }</TableCell>
                            </TableRow>
        </>
    )
}

export default TableSongs


