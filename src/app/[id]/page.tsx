
import React from 'react'
import PlaylistPage from './components/PlaylistPage';
import getUserData from '@/action/getUserData';
import getPlaylistSongs from '@/action/getPlaylistSongs';

const Page = async() => {
    const userData = await getUserData();
    const getSongs = await getPlaylistSongs();
    return (
        <PlaylistPage userData={userData ?? undefined}  songs={getSongs}/>
    );
}

export default Page;
