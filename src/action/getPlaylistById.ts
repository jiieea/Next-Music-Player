import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import {Playlist} from '../../types'
import { cookies } from 'next/headers'

const getPlaylistById = async():Promise<Playlist[]>  => {
    const supabase = createServerComponentClient({
        cookies : cookies
    });

    const { data , error } = await supabase.auth.getUser();

    if(error) {
        console.log(error.message);
        return []
    }

    // fetch data from table
    const { data : playlistUser , error : playlistError } = await supabase.from('playlist')
    .select('*').eq('user_id' , data.user?.id);

    if(playlistError) {
        console.log(playlistError.message);
    }


    return ( playlistUser as Playlist[]) || [];

}

export default getPlaylistById;