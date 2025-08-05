/**
 * @fileoverview A React component for adding or removing a song from a user's playlist.
 * @author Jiéyra De Châtillon 
 * @version 1.0.0
 */

interface PlaylistButtonProps {
    songId : string
}

import { useUsers } from '@/hook/useUser';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GoPlusCircle } from "react-icons/go";
import { BsFillPlusCircleFill } from "react-icons/bs";
import useAuthModal from '@/hook/useAuthModal';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';

/**
 * Renders a button that allows a user to add or remove a song from their playlist.
 * The button's icon and color change dynamically based on whether the song is already in the playlist.
 *
 * @component
 * @returns {JSX.Element} A button component for playlist management.
 */
const PlaylistButton: React.FC<PlaylistButtonProps> = ({
    songId
}) => {
    // State to track whether the song is already added to the playlist.
    const [isAdded, setIsAdded] = useState(false);

    // Supabase client and Next.js router hooks.
    const { supabaseClient } = useSessionContext();
    const router = useRouter();

    // Custom hooks for user data and authentication modal.
    const { user, playlist } = useUsers();
    const authModal = useAuthModal();

    /**
     * useEffect hook to check if the song is in the user's playlist on component mount.
     * It queries the `playlist_songs` table in Supabase.
     */
    useEffect(() => {
        const getData = async () => {
            // Do not proceed if user is not logged in.
            if (!user?.id) {
                return;
            }

            // Query the playlist_songs table to find a matching entry.
            const { data, error } = await supabaseClient
                .from('playlist_songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id' , songId)
                .eq('playlist_id', playlist?.id)
                .single();

            // Handle potential errors during the data fetch.
            if (!data && error) {
                console.error('Error fetching playlist songs:', error);
                return;
            }

            // If data is found, set the isAdded state to true.
            if (data) {
                setIsAdded(true);
            }
        };

        getData();
    }, [user?.id, supabaseClient, playlist?.id , songId]); // Dependencies for the effect to re-run.

    // Select the appropriate icon based on the `isAdded` state.
    // NOTE: The icon logic might be inverted. `GoPlusCircle` is typically "add" and `BsFillPlusCircleFill` is typically "remove".
    const Icon = isAdded ? BsFillPlusCircleFill : GoPlusCircle;

    /**
     * Handles the click event for adding or removing a song from the playlist.
     * This function performs an `INSERT` or `DELETE` operation in Supabase.
     */
    const handleAddSong = async () => {
        // If the user is not authenticated, open the authentication modal.
        if (!user) {
            return authModal.onOpen();
        }

        if (isAdded) {
            // If the song is already in the playlist, remove it.
            const { error } = await supabaseClient
                .from('playlist_songs')
                .delete()
                .eq('user_id', user.id)
                .eq('song_id' , songId)
                .eq('playlist_id', playlist?.id);

            // Show a toast notification based on the result.
            if (error) {
                toast.error(error.message);
            } else {
                setIsAdded(false);
                toast.success('Removed from the playlist');
            }
        } else {
            // If the song is not in the playlist, add it.
            const { error } = await supabaseClient
                .from('playlist_songs')
                .insert({
                    user_id: user.id,
                    song_id : songId,
                    playlist_id: playlist?.id
                });

            // Show a toast notification based on the result.
            if (error) {
                toast.error(error.message);
            } else {
                setIsAdded(true);
                toast.success('Added to playlist');
            }
        }

        // Refresh the router to update the UI and reflect the changes.
        router.refresh();
    };

    return (
        <button
            type='submit'
            title='add to playlist'
            onClick={handleAddSong}
            className='cursor-pointer opacity-75 transition'>
            <Icon
                className='hover:scale-110'
                // Dynamic icon color based on the `isAdded` state.
                color={isAdded ? '#22c55e' : "white"}
                size={25}
            />
        </button>
    );
};

export default PlaylistButton;