// app/playlist/[playlistId]/page.tsx

import getPlaylistSongs from '@/action/getPlaylistSongs';
import PlaylistPage from './components/PlaylistPage';
import getUserData from '@/action/getUserData';
import { notFound } from 'next/navigation';
import getPlaylistById from '@/action/getPlaylistById';
import getPlaylistByUserId from '@/action/getPlaylistByUserId';

interface PageProps {
  params: Promise<{id : string}>
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const playlist = await getPlaylistById(id);

  // If the playlist doesn't exist, Next.js will show a 404 page
  if (!playlist) {
    notFound();
  }

  const songs = await getPlaylistSongs(id);
  const userData = await getUserData();
  const userPlaylists = await getPlaylistByUserId()

  return (
 
      <PlaylistPage
      userData={userData ?? undefined}
      songs={songs}
      playlistData={playlist}
      userPlaylists={ userPlaylists ?? undefined}
    />
    
  );
};

export default Page;