// actions/getPlaylistById.ts

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Playlist } from '../../types';
import { cookies } from "next/headers";

const getPlaylistById = async (playlistId: string): Promise<Playlist | null> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if (!playlistId) {
        return null;
    }

    const { data: playlistData, error: playlistError } = await supabase
        .from('playlist')
        .select('*')
        .eq('id', playlistId) // Filter by the single playlist ID
        .single(); // Use .single() to get a single object instead of an array

    if (playlistError) {
        console.error("Error fetching playlist:", playlistError.message);
        return null;
    }

    return (playlistData as Playlist) || null;
};

export default getPlaylistById;