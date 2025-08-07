import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../types";
import { cookies } from "next/headers";

const getPlaylistSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    // 👇️ Change starts here
    const {
        data: { user },
    } = await supabase.auth.getUser(); // Use getUser()\

    // get all id's of the playlists
    const { data : playlistData , error } = await supabase.from('playlist')
    .select('id')
    .eq('user_id' , user?.id);

    if(error) {
        return[]
    }


    const playlistIds = playlistData.map(playlist => playlist.id);

  if (playlistIds.length === 0) {
        return [];
    }

    const {
        data: playlistSongs,
        error: errorPlaylist
    } = await supabase.from('playlist_songs')
        .select("* , songs(*)")
        .in('playlist_id ' , playlistIds)
        .order('created_at', { ascending: false })


        if(errorPlaylist) {
            console.error(errorPlaylist);
            return[]
        }

        if(!playlistSongs) {
            return[];
        }


        return playlistSongs.map((song) => ({
            ...song.songs,
        }))
} 

export default getPlaylistSongs