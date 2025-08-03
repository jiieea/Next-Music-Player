import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Playlist, UserDetails } from '../../types'


// load user's avatar 
const useLoadAvatar = (userData: UserDetails) => {
    const supabase = useSupabaseClient();

    if (!userData) {
        return ""
    }

    // get avatar public url
    if (!userData.avatar_url) {
        return "";
    }
    // get user's avatar public url  
    const { data: avatarData } = supabase.storage.from('avatars').getPublicUrl(userData.avatar_url);

    return avatarData.publicUrl;

}

//  get the playlist image and extract the publiUrl
const useLoadPlaylistImage = (playlistData: Playlist) => {
    const supabase = useSupabaseClient();

    // if playlistData  ain't exist throw the empty string
    if (!playlistData) return "";

    try {
        const { data: playlistImage  } =
            supabase
                .storage
                .from('playlist')
                .getPublicUrl(playlistData.playlist_image);

        return playlistImage.publicUrl;
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log("error fetching image url ", e)
        }
    }
}

export {
    useLoadAvatar,
    useLoadPlaylistImage
};