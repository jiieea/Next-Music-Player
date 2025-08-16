import getSongById from "@/action/getSongsById";
import TableSongs from "./component/TableSongs";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CiClock2 } from "react-icons/ci";

const UserSongs = async() => {
    const songs = await getSongById();
    return (
        <div className="h-full w-full bg-neutral-900 rounded-md p-5">
            <div className="flex flex-col m-5 ">
                <h1 className="text-white font-semibold text-2xl lg:text-4xl mt-10 ">Your Songs</h1>
                {/* list of songs */}
               <Table className="p-5">
                <TableHeader>
                    <TableRow className="border-b border-neutral-700">
                        <TableHead className="w-2/3 text-neutral-500 font-semibold"># Title</TableHead>
                        <TableHead className=" text-neutral-500 font-semibold text-center">Created date</TableHead>
                        <TableHead className=" text-neutral-500 font-semibold"><CiClock2 size={20} className="font-bold" /></TableHead>
                    </TableRow>
                </TableHeader>
               <TableBody>
                {
                    songs.map((song , i) => (
                        <TableSongs song={ song } key={song.id} index={ i }/>
                    ))
                }
               </TableBody>
            </Table>
            </div>
        </div>
    )
}

export default UserSongs;