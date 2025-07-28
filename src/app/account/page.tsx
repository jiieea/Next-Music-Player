import React from 'react'

import Header from '@/components/Header';
import { AccountContent } from './components/AccountContent';
import getUserData from '@/action/getUserData';


const AccountPage = async () => {
  const user = await getUserData()
  return (
    <div className='bg-neutral-900 rounded-md w-full h-full'>
      {
        user && (
          <Header className='from-bg-neutral-900' userData={user}>
          <div className='flex flex-col mb-2 gap-y-6'>
            <div className='text-white font-semibold text-3xl'>
              <AccountContent user={user} />
            </div>
          </div>
        </Header>
        )
      }
    </div>
  )
}

export default AccountPage
