import React from 'react'
import Header from '@/components/Header';
import { AccountContent } from './components/AccountContent';
import getUserData from '@/action/getUserData';
import getSongById from '@/action/getSongsById';
import LocalLikedContent from '../../components/LocalLikedContent'


const AccountPage = async () => {
  const user = await getUserData();
  const userSongs = await getSongById();
  return (
    <div className='bg-neutral-900
      w-full h-full overflow-y-auto
      overflow-hidden rounded-lg'>
      {
        user && (
          <>
            <Header userData={user} className='bg-gradient-to-b from-cyan-700'>
              <div className='flex flex-col mb-2 gap-y-6'>
                <div className='text-white font-semibold text-3xl'>
                  <AccountContent user={user} songs={userSongs} />
                </div>
              </div>
            </Header>
          </>
        )
      }
      <LocalLikedContent songs={userSongs} />
      {/* TODO : map the Playlist user has  */}
    </div>
  )
}

export default AccountPage
