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
    } = await supabase.auth.getUser(); // Use getUser()


    const {
        data: playlistSongs,
        error: errorPlaylist
    } = await supabase.from('playlist_songs')
        .select("* , songs(*)")
        .eq('user_id', user?.id)
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