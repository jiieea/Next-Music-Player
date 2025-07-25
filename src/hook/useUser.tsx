import { User } from '@supabase/auth-helpers-nextjs';
import { Subscription, UserDetails } from '../../types';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useSessionContext, useUser as useSupaUser } from '@supabase/auth-helpers-react';

type UserContextType = {
    accessToken: string | null,
    user: User | null,
    userDetails: UserDetails | null,
    isLoading: boolean,
    subscription: Subscription | null
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export interface Props {
    [propName: string]: unknown;
}

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase

    } = useSessionContext();

    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const getUserDetails = useCallback(() => supabase.from('users').select('*').single(), [supabase]);
    const getSubscription = useCallback(
        () =>
            supabase
                .from('subscriptions')
                .select('*, prices(*,products(*))')
                .in('status', ['trialing', 'active'])
                .single(),
        [supabase]
    );


    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsLoadingData(true);

            Promise.allSettled([getUserDetails(), getSubscription()]).then(
                (result) => {
                    const userDetailPromise = result[0];
                    const subscriptionPromise = result[1];

                    if (userDetailPromise.status === "fulfilled") {
                        setUserDetails(userDetailPromise.value.data as UserDetails)
                    }

                    if (subscriptionPromise.status === "fulfilled") {
                        setSubscription(subscriptionPromise.value.data as Subscription);
                    }
                }
            );
        } else if (!user && !isLoadingData && isLoadingUser) {
            setSubscription(null);
            setUserDetails(null)
        }
    }, [user, isLoadingUser, isLoadingData, userDetails, subscription, supabase, getSubscription, getUserDetails]);

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription
    }


    return <UserContext.Provider value={value} {...props} />
}


export const useUsers = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a MyUserContextProvider");
    }

    return context;
}