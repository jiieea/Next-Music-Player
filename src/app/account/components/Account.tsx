"use client"

import Header from '@/components/Header'
import React from 'react'
import LocalLikedContent from '@/components/LocalLikedContent'
import { AccountContent } from './AccountContent'
import { useDominantColor } from '@/hook/useDominantColour'
import { useLoadAvatar } from '@/hook/useLoadAvatar'
import { UserPlaylist } from '@/components/UserPlaylist'
import { MobileNavbar } from '@/components/MobileNavbar'
import { AccountProps } from '../../../Interfaces/types'

const Account: React.FC<AccountProps> = (
    {
        user,
        userSongs,
        playlists
    }
) => {
    const userImage = useLoadAvatar(user!);
    const dominantColor = useDominantColor(userImage);
    return (
        <div className='bg-neutral-900
    w-full h-full overflow-y-auto
    overflow-hidden rounded-lg mb-[10em] md:mb-0'>
            {
                user && (
                    <>
                        <Header
                            userData={user}
                            className="bg-gradient-to-b from-[var(--playlist-color)] to-neutral-900 transition-colors duration-500"
                            style={{ '--playlist-color': dominantColor } as React.CSSProperties}
                        >
                            <div className='flex flex-col mb-2 gap-y-6'>
                                <div className='text-white font-semibold text-3xl'>
                                    <AccountContent user={user} songs={userSongs} playlists={playlists} />
                                </div>
                            </div>
                        </Header>
                    </>
                )
            }
            <LocalLikedContent songs={userSongs} />
            {/* TODO : map the Playlist user has  */}
            <div className='p-5'>
                <h1 className='text-white font-semibold text-2xl'>Playlists</h1>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-3 gap-x-5'>
                    {
                        playlists.map((playlist) => (
                            <UserPlaylist playlist={playlist} key={playlist.id} user={user!}
                                href={`/${playlist.id}`}
                            />
                        ))
                    }
                </div>
            </div>
            <div className="fixed bottom-0 w-full px-0 md:hidden">
                <MobileNavbar />
            </div>
        </div>
    )
}

export default Account