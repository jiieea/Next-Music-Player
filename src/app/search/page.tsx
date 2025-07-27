import getSongByTitle from '@/action/getSongByTitle'
import getUserData from '@/action/getUserData'
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
    const user = await getUserData();
    return (
        <div className='bg-neutral-900
       overflow-hidden overflow-y-auto h-full w-full'>
           {
            user ? (
                 <Header className='from-bg-neutral-900 ' userData={ user }>
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className='font-semibold text-2xl text-white'>Search</h1>
                    {/* // input value */}
                    <SearchInput />
                </div>
            </Header>
            ) : (
                <p>Please Login To see your Account </p>
            )
           }
            <SearchContent songs={ getSongs } />
        </div>
    )
}

export default page;