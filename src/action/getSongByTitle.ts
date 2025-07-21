import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../types";
import { cookies } from "next/headers";
import getSong from "./getSong";


const getSongByTitle = async (title: string): Promise<Song[]> => {
    const supabase = await createServerComponentClient({
        cookies: cookies
    });

    // if theres isn't title
    if (!title) {
        const songs = await getSong();
        return songs;
    }


    const { data: songs, error: dataError } = await supabase.from("songs").select("*").ilike('title', `%${title}%`)
        .order('created_at', { ascending: false });

    if (dataError) {
        console.log(dataError);
    }

    return (songs as Song[]) || [];
}



export default getSongByTitle;