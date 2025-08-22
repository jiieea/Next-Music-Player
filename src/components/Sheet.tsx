import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AiOutlinePlus } from 'react-icons/ai'
import { SlCloudUpload } from "react-icons/sl";
import { TbMusicPlus } from "react-icons/tb";

function SheetLibrary() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AiOutlinePlus className="text-white " size={25} />
      </SheetTrigger>
      <SheetContent side="bottom" className="border-none rounded-2xl absolute z-50">
        {/*
          Use 'flex justify-center items-center' on the parent div
          to center the child div horizontally.
        */}
        <div className="w-full flex justify-center"> 
          <div className="w-[35px] bg-neutral-500 rounded-2xl h-[5px] mt-2"></div>
        </div>
        <div className="flex flex-col gap-y-5 mt-2 p-3 mb-2">
          {/* add songs */}
          <div className="flex gap-x-3 items-center ">
            {/* song icon */}
            <SlCloudUpload size={30} className="text-neutral-400 "/>
            <div className="flex flex-col  text-neutral-500">
              <h1 className="font-semibold text-white"> Song</h1>
              <p className="text-[15px]">You can add  songs from your local device</p>
            </div>
          </div>
          <div className="flex gap-x-3 items-center ">
            {/* song icon */}
            <TbMusicPlus size={30} className="text-neutral-400 "/>
            <div className="flex flex-col  text-neutral-500">
              <h1 className="font-semibold text-white"> Playlist</h1>
              <p className="text-[15px]">You can create a playlist</p>
            </div>
          </div>
          {/* add playlist */}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SheetLibrary;