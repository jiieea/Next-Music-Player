"use client"

import Header from '@/components/Header'
import React from 'react'
import LocalLikedContent from '@/components/LocalLikedContent'
import { Playlist, Song, UserDetails } from '../../../../types'
import { AccountContent } from './AccountContent'
import { useDominantColor } from '@/hook/useDominantColour'
import { useLoadAvatar } from '@/hook/useLoadAvatar'
import { UserPlaylist } from '@/components/UserPlaylist'

interface AccountProps {
    user: UserDetails | null,
    userSongs: Song[],
    playlists: Playlist[]
}
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
    overflow-hidden rounded-lg'>
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
                                    <AccountContent user={user} songs={userSongs}  playlists={ playlists}/>
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
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 mt-3 gap-x-5 gap-3'>
                    {
                        playlists.map((playlist) => (
                          <UserPlaylist playlist={playlist} key={playlist.id}  user={ user! } 
                            href={`/${playlist.id}`}
                          />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Account