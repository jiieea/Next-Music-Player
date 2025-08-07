// This is a Server Component, so it can be async.
// It fetches data and passes it down.
import PlaylistButton from '@/components/PlaylistButton';
// import getPlaylistById from './getPlaylistById';
import { Playlist } from '../../types';

// We import the client component here.

interface PlaylistButtonWrapperProps {
    songId: string;
    userPlaylists : Playlist[]
}

const PlaylistButtonWrapper = async ({ songId , userPlaylists }: PlaylistButtonWrapperProps) => {
    // This is the correct way to handle async data fetching in a Server Component.
    // const playlists = await getPlaylistById();

    // Now, we pass the fetched data to our Client Component.
    // The Client Component itself is not async and can use hooks.
    return (
        <PlaylistButton songId={songId} userPlaylists={userPlaylists}  />
    );
};

export default PlaylistButtonWrapper;