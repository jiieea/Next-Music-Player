import React from 'react'
import getUserData from '@/action/getUserData';
import getSongById from '@/action/getSongsById';
import Account from './components/Account';
import getPlaylistByUserId from '@/action/getPlaylistByUserId';


const AccountPage = async () => {
  const user = await getUserData();
  const userSongs = await getSongById();
  const playlists = await getPlaylistByUserId()
  return (
    <Account user={user} userSongs={userSongs} playlists = { playlists }/>
  )
}

export default AccountPage
