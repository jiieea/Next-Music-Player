"use client"

import { useEffect, useMemo, useState } from "react"
import { Song } from "../../types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

const useGetSongById = (id?: string) => {
    const  [ loading , setLoading ] = useState(false);
    const [song , setSong] = useState<Song | undefined>(undefined);
    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        if(!id) {
            return;
        }

        setLoading(true);
        const fetchSongs = async() => {
            const { data , error } = 
            await supabaseClient.from('songs').select('*').eq('id' , id)
            .single()

            if(error) {
                setLoading(false);
                toast.error(error.message);
            }

            setSong(data as Song);
            setLoading(false);

        }
        fetchSongs();
    } , [id , supabaseClient])


  return useMemo(() => ({
    song,
    loading
  }) , [loading , song])
}


export default useGetSongById;