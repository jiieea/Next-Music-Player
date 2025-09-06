"use client"

import useDebounce from '@/hook/useDebounce';
import React, { useEffect, useState } from 'react'
import qs from 'query-string';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
export const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const debounceValue = useDebounce<string>(value, 500);
    

    useEffect(() => {
        const query = {
            title: debounceValue,
        }

        const url = qs.stringifyUrl({
            url: '/search',
            query: query
        });

        router.push(url);

    }, [debounceValue, router])
    return (
        <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-4 py-5 px-4  rounded-md bg-white border-transparent
    disable:cursor-not-allowed disabled:opacity-50 focus:outline-none "
            placeholder='search songs or playlist' />
    )
}
