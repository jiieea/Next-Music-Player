import { Song } from "../../types";
import useAuthModal from "./useAuthModal";
import usePlayerSong from "./usePlayerSong";
import { useUsers } from "./useUser";


const useOnplay = (songs : Song[])  => {
    const player = usePlayerSong();
    const authModal = useAuthModal();
    const { user } = useUsers();

    const onPlay = (id : string ) => {
        if(!user) {
            return authModal.onOpen();
        }

        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    }
    return onPlay;
}


export default useOnplay;