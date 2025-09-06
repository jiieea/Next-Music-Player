import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { toast } from "sonner";
import { Playlist } from "../../types";

const getPlaylists = async (): Promise<Playlist[]> => {
    const supabaseClient = createServerComponentClient({
        cookies: cookies
    })
// fetch all playlist in the table
    const { data: playlists, error: fetchError } =
        await supabaseClient
            .from
            ('playlist')
            .select('*')
            .order("created_at", { ascending: false })

    if (fetchError) {
        toast.error('failed' + fetchError.message)
    }

    return (playlists as Playlist[]) || []
}


export default getPlaylists;