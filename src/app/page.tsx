export const revalidate = 0;
import getSong from "@/action/getSong";
import getUserData from "@/action/getUserData";
import Header from "@/components/Header";
import HeaderAuth from "@/components/HeaderAuth";
import { ListItem } from "@/components/ListItem";
import MySong from "@/components/MySong";


export default async function Home() {
  const songs = await getSong();
  const user = await getUserData();
  const userName = user?.full_name ? user.full_name : " ";

  return (
    <div className="bg-neutral-900 
    w-full h-full rounded-lg overflow-y-auto text-white overflow-hidden">
      {
        user ? (
          <Header userData={user} className=" bg-gradient-to-b from-emerald-800">
            <div className="mb-5 ">
              <h1 className="text-white font-semibold text-3xl ">Welcome Back { userName }</h1>
              <div className="
          grid grid-cols-1 ]
          sm:grid-cols-2 
          xl:grid-cols-3 
          2xl:grid-cols-4 
          mt-4 gap-3 ">
                <ListItem
                  image="/images/liked.png"
                  name="Liked Songs"
                  href="/liked"
                />
              </div>
            </div>
          </Header>
        ) : (
          <HeaderAuth >
            <div className="mb-2 ">
              <h1 className="text-white font-semibold text-3xl">Welcome Back</h1>
              <div className="
          grid grid-cols-1 ]
          sm:grid-cols-2 
          xl:grid-cols-3 
          2xl:grid-cols-4 
          mt-4 gap-3">
                <ListItem
                  image="/images/liked.png"
                  name="Liked Songs"
                  href="/liked"
                />
              </div>
            </div>
          </HeaderAuth>
        )
      }
      <div className="mt-2 mb-7 px-6">
        <h1 className="text-white text-2xl font-semibold">Newest Song</h1>
        <div className="">
          <MySong songs={songs} />
        </div>
      </div>
    </div>
  );
}
