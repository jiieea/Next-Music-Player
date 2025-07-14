import Header from "@/components/Header";
import { ListItem } from "@/components/ListItem";
import MySong from "@/components/MySong";
export default function Home() {
  return (
    <div className="bg-neutral-900 w-full h-full rounded-lg overflow-y-auto text-white overflow-hidden">
      <Header >
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
      </Header>
      <div className="mt-4 mb-5 px-6">
          <p className="text-white font-semibold text-2xl">Your Song</p>
          <div className="flex flex-col justify-evenly items-center gap-y-4 md:grid md:grid-cols-3 md:gap-3 lg:grid lg:grid-cols-4 lg:gap-4 h-[250px] ">
            {/* <MySong />     */}
          </div>
      </div>
    </div>
  );
}
