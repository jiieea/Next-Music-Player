/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Playlist, Song } from "../../types";
import { cookies } from "next/headers";
import getSong from "./getSong";
import getPlaylists from "./getPlaylists";


const getSongByTitle = async (title: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    // if theres isn't title
    if (!title) {
        const songs = await getSong();
        return songs;
    }


    const { data: songs, error: dataError } = 
    await supabase.from("songs").select("*").ilike('title', `%${title}%`)
        .order('created_at', { ascending: false });

    if (dataError) {
        console.log(dataError);
    }

    return (songs as any) || [];
}


//  get playlist by title 

const getPlaylistsByTitle = async (title: string): Promise<Playlist[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    if (!title) {
        const playlists = await getPlaylists();
        return playlists
    }

    const {
        data: playlist,
        error: playlistError
    } = await supabase.from('playlist')
        .select('*').ilike('playlist_name', `%${title}%`)
        .order('created_at', { ascending: false })

    if (playlistError) {
        console.log(playlistError.message)
    }

    return playlist as any || [];
}



export {
    getPlaylistsByTitle
    , getSongByTitle
}