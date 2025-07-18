import React from 'react'
import { Song } from '../../types'

interface SearchContentProps {
    songs : Song[]
}

const SearchContent : React.FC<SearchContentProps> = ( {
    songs
}) => {
    console.log(songs);

    if(songs.length === 0) {
        return (
            <div className='text-neutral-700 font-semibold'>No Song Found With Spesific Title</div>
        )
    }
  return (
    <div>Song List</div>
  )
}

export default SearchContent