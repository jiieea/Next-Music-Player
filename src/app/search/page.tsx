
export const revalidate = 0;
import getSongByTitle from '@/action/getSongByTitle';
import getUserData from '@/action/getUserData';
import Header from '@/components/Header';
import SearchContent from '@/components/SearchContent';
import { SearchInput } from '@/components/SearchInput';


interface SearchProps {
  searchParams: Promise<{ title: string }>
}

const Search = async ({ searchParams }: SearchProps) => {
  const { title } = await searchParams;
  const songs = await getSongByTitle(title);
  const user = await getUserData()

  return (
    <div className="bg-neutral-900 overflow-hidden overflow-y-auto h-full w-full">
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
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
