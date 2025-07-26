import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { UserDetails } from '../../types'

const useLoadAvatar = (userData : UserDetails) => {
    const supabase = useSupabaseClient();

    if(!userData) {
        return ""
    }

    // get avatar public url
    if (!userData.avatar_url) {
        return "";
    }
    const { data: avatarData } = supabase.storage.from('avatars').getPublicUrl(userData.avatar_url);

    // avatarData.publicUrl is a string, not a function
    return avatarData.publicUrl  ;

}


export default useLoadAvatar;