import React from 'react'

import Header from '@/components/Header';
import { AccountContent } from './components/AccountContent';
import getUserData from '@/action/getUserData';
import getSongById from '@/action/getSongsById';
import UserSongs from '@/components/UserSongs';


const AccountPage = async () => {
  const user = await getUserData();
  const userSongs = await getSongById();
  return (
    <div className='bg-neutral-900 rounded-md w-full h-full'>
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
            {/* // TODO : render user songs */}
            <UserSongs songs={userSongs} />
          </>
        )
      }
    </div>
  )
}

export default AccountPage
