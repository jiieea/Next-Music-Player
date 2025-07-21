import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../types";
import { cookies } from "next/headers";


const getSong = async (): Promise<Song[]> => {
    const supabase = await createServerComponentClient({
        cookies: cookies
    });

    const { data: songs, error: dataError } = await supabase.from("songs").select("*").order('created_at', { ascending: false });

    if(dataError) {
        console.log(dataError);
    }

    return (songs as Song[]) || [];
}



export default getSong;