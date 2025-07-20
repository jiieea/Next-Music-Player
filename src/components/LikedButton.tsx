import { useUsers } from '@/hook/useUser';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';



interface LikedButtonProps {
    songId : string
}

/**
 * LikedButton Component
 *
 * This component is a placeholder for a button that indicates whether a song is liked.
 * It currently does not implement any functionality but can be extended to handle
 * liking/unliking songs in the future.
 */

const LikedButton : React.FC<LikedButtonProps> = ( {
    songId
}) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();
    const { user } = useUsers();

    const [ isLiked , setIsLiked] = useState(false);

    useEffect(() => {
    // get data from supabase to check if the song is liked
    const fetchData = async () => {
        if(!user?.id) {
            return;
        }

        const { data : likedSong , error : fetchError } = await supabaseClient.from('liked_songs').select('*')
        .eq('user_id' , user.id)
        .eq('song_id' , songId)
        .single();

        if(!likedSong && fetchError) {
            console.error('Error fetching liked song:', fetchError);
            return;
        }

        setIsLiked(true);
    }

    fetchData();
    } ,[songId , supabaseClient , user?.id]);


    const  Icon = isLiked ? AiFillHeart : AiOutlineHeart;
  return (
   <Button className='cursor-pointer'><Icon className='hover:scale-110' color={ isLiked ? '#22c55e' : "white"} size={25}/></Button>
  )
}

export default LikedButton
