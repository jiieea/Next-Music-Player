import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserDetails } from '../../types';
import { cookies } from "next/headers";


const getUserData = async(): Promise<UserDetails | null> => { // Key change: expecting a single UserDetails or null
    const supabase = createServerComponentClient({
        cookies: cookies,
    });

    const { data: sessionData, error: sessionError } = await supabase.auth.getUser();

    if (sessionError) {
        console.log("Error getting session:", sessionError);
        return null; // No session, so no user data to fetch
    }

    // Ensure we have a user ID from the session
    if (!sessionData.user?.id) {
        console.log("No user ID found in session data.");
        return null; // No user ID, so no user data to fetch
    }

    // Fetch data from the 'users' table using the authenticated user's ID
    const { data, error } = await supabase
        .from('users')
        .select(`*`) // Select all columns
        .eq('id', sessionData.user.id); // Match by the authenticated user's ID

    if (error) {
        console.log("Error fetching user data from 'users' table:", error.message);
        return null; // Error during data fetch
    }

    // Supabase's .select() always returns an array.
    // Since we're querying by a unique ID, we expect at most one element.
    if (data && data.length > 0) {
        // Return the first element as UserDetails
        return data[0] as UserDetails;
    } else {
        // No data found for the given ID
        console.log("No user data found for ID:", sessionData.user.id);
        return null;
    }
}

export default getUserData


