import getSongByTitle from '@/action/getSongByTitle'
import Header from '@/components/Header'
import SearchContent from '@/components/SearchContent'
import { SearchInput } from '@/components/SearchInput'
import React from 'react'


interface SearchProps {
    searchParams: {
        title: string
    }
}

export const revalidate = 0;

const page = async ({ searchParams }: SearchProps) => {
    const getSongs = await getSongByTitle(searchParams.title); // get song by title 
    return (
        <div className='bg-neutral-900
       overflow-hidden overflow-y-auto h-full w-full'>
            <Header className='from-bg-neutral-900 '>
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className='font-semibold text-2xl text-white'>Search</h1>
                    {/* // input value */}
                    <SearchInput />
                </div>
            </Header>
            <SearchContent songs={ getSongs } />
        </div>
    )
}

export default page;