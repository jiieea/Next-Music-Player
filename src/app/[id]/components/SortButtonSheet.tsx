import { Button } from '@/components/ui/button'
import React from 'react'
import { TiArrowUnsorted } from 'react-icons/ti'
import { FaCheck } from "react-icons/fa6";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import { twMerge } from 'tailwind-merge';
import { SortButtonSheetProps } from '../../../Interfaces/types'


const SortButtonSheet: React.FC<SortButtonSheetProps> = (
    {
        onHandleSort,
        onHandleSortByArtist,
        sort,
        onHandleSortByDate
    }
) => {

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="secondary" className='rounded-2xl py-1  bg-neutral-800'>
                    <TiArrowUnsorted className='text-white' size={10} />
                    <p className='text-white font-semibold text-[10px]'> Sort  </p>
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="border-none rounded-2xl absolute z-50 bg-neutral-800 ">
                <div className="w-full flex justify-center">
                    <div className="w-[35px] bg-neutral-500 rounded-2xl h-[5px] mt-2"></div>
                </div>
                <div className='flex flex-col gap-y-6 p-3'>
                    <p className='text-white font-bold'>Sort By</p>
                    <SheetClose asChild>
                        <div className='flex justify-between items-center'>
                            <p className='text-white font-semibold text-[15px]' onClick={onHandleSort}>Sort By Title</p>
                            <FaCheck size={25} className={twMerge(
                                `text-green-500 hidden`, sort === 'byTitle' && "block"
                            )} />
                        </div>
                    </SheetClose>
                    <SheetClose asChild>
                        <div className="flex justify-between">
                            <p className='text-white font-semibold text-[15px]' onClick={onHandleSortByArtist}>Sort By Artist</p>
                            <FaCheck size={25} className={twMerge(
                                `text-green-500 hidden`, sort === 'byAuthor' && "block"
                            )} />
                        </div>
                    </SheetClose>
                    <SheetClose asChild>
                        <div className='flex justify-between items-center'>
                            <p className='text-white font-semibold text-[15px]' onClick={onHandleSortByDate}>Recently Add</p>
                            <FaCheck size={25} className={twMerge(
                                `bg-green-500 hidden`, sort === 'recentlyAdd' && "block"
                            )} />
                        </div>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default SortButtonSheet
