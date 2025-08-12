import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { GoPlusCircle } from 'react-icons/go';
import useAuthModal from '@/hook/useAuthModal';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';
import { Playlist } from '../../types';


interface PlaylistButtonProps {
    songId: string;
    userPlaylists: Playlist[]; // Correctly receives data as a prop.
}

const PlaylistButton: React.FC<PlaylistButtonProps> = ({ songId, userPlaylists }) => {
    // State to control dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Client-side hooks
    const { supabaseClient } = useSessionContext();
    const router = useRouter();
    const authModal = useAuthModal();
    const { session } = useSessionContext();
    const user = session?.user;


    // function to open dropdown
    const handleAddSongClick = () => {
        if (!user) {
            return authModal.onOpen();
        }
        // console.log(userPlaylists.length)
        setIsDropdownOpen(!isDropdownOpen);
    };

    // function to add song to the spesific playlist
    const handleAddToSpecificPlaylist = async (playlistId: string) => {
    setIsDropdownOpen(false); // Close dropdown immediately

    if (!user) {
        toast.error("User not authenticated.");
        return;
    }

    const { data: existingEntry, error: fetchError } = await supabaseClient
        .from('playlist_songs')
        .select('playlist_id')
        .eq('playlist_id', playlistId)
        .eq('song_id', songId)
        .maybeSingle();

    if (fetchError) {
        toast.error(fetchError.message);
        return;
    }

    if (existingEntry) {
        toast.info('This song is already in this playlist.');
        return;
    }

    // This is the line that needs to change
    const { error: insertError } = await supabaseClient
        .from('playlist_songs')
        .insert({
            // Remove user_id from this object
            song_id: songId,
            playlist_id: playlistId
        });

    if (insertError) {
        console.error(insertError.message);
        toast.error("Error adding song to playlist.");
    } else {
        toast.success('Added to playlist');
        router.refresh();
    }
};
    return (
        <div className="relative mt-1">
            <button
                type='button'
                title='add to playlist'
                onClick={handleAddSongClick}
                className='cursor-pointer opacity-75 transition'>
                <GoPlusCircle
                    className='hover:scale-110'
                    color="white"
                    size={25}
                />
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-48 bg-neutral-800 rounded-md shadow-lg z-10">
                    <div className="py-1">
                        {userPlaylists && userPlaylists.length > 0 ? (
                            userPlaylists.map((playlist) => (
                                <button
                                    title='add to playlist'
                                    key={playlist.id}
                                    onClick={() => handleAddToSpecificPlaylist(playlist.id)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-neutral-700"
                                >
                                    {playlist.playlist_name}
                                </button>
                            ))
                        ) : (
                            <span className="block px-4 py-2 text-sm text-gray-400">
                                No playlists found.
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlaylistButton;