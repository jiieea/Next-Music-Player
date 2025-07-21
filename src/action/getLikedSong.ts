import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../types";
import { cookies } from "next/headers";

const getLikedSong = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // 👇️ Change starts here
  const {
    data: { user },
  } = await supabase.auth.getUser(); // Use getUser()

  const { data: songs, error: dataError } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", user?.id) // Access user.id directly
    .order("created_at", { ascending: false });
  // 👇️ Change ends here

  if (dataError) {
    console.log(dataError);
    return [];
  }

  if (!songs) {
    return [];
  }

  return songs.map((song) => ({
    ...song.songs,
  }));
};

export default getLikedSong;