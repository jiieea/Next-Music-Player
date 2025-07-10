"use client";

import { MyUserContextProvider } from "@/hook/useUser";


interface UserProvideProps {
    children: React.ReactNode;
}


 const UserProvider: React.FC<UserProvideProps> = ({
    children
}) => {
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    )
}

export default UserProvider;