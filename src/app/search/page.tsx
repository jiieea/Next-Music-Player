
export const revalidate = 0;
import getPlaylistByUserId from '@/action/getPlaylistByUserId';
import getPlaylists from '@/action/getPlaylists';
import getSongByTitle from '@/action/getSongByTitle';
import getUserData from '@/action/getUserData';
import Header from '@/components/Header';
import { MobileNavbar } from '@/components/MobileNavbar';
import SearchContent from '@/components/SearchContent';
import { SearchInput } from '@/components/SearchInput';

interface SearchProps {
  searchParams: Promise<{ title: string }>
}

const Search = async ({ searchParams }: SearchProps) => {
  const { title } = await searchParams;
  const songs = await getSongByTitle(title);
  const user = await getUserData();
  const allPlayllists = await getPlaylists();
  const playlists = await getPlaylistByUserId()

  return (
    <div className="bg-neutral-900 overflow-hidden overflow-y-auto h-full w-full mb-[8.5em] md:mb-0">
      {
        user && (
          <Header className="" userData={user}>
            <div className="mb-2 flex flex-col gap-y-6">
              <h1 className="font-semibold text-2xl text-white">Search</h1>
              <SearchInput />
            </div>
          </Header>
        )
      }
      <SearchContent songs={songs} playlists={ playlists }  playlistData={ allPlayllists }/>
      <div className="fixed bottom-0 w-full px-0">
      <MobileNavbar />
      </div>
    </div>
  );
};

export default Search;
