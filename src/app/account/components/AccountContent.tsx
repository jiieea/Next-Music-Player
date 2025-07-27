'use client'

import useProfileModal from "@/hook/useProfileModal";
import { RxPencil1 } from "react-icons/rx";
import { UserDetails } from "../../../../types";
import Image from "next/image";
import useLoadAvatar from "@/hook/useLoadAvatar";

interface AccountContentProps {
  user: UserDetails
}

export const AccountContent: React.FC<AccountContentProps> = ({
  user
}) => {
  const { full_name } = user;
  const avatar = useLoadAvatar(user)
  const profileModal = useProfileModal()
  const updateProfile = () => {
    return profileModal.onOpen()
  }

  return (
    <div className='mt-3 p-4'> {/* Added padding for overall spacing */}
      <h1 className='text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-6'> {/* Added text-white and mb-6 */}
        Account Settings
      </h1>
      <div className="flex flex-col md:flex-row gap-x-4 items-center md:items-center"> {/* Changed md:items-start to md:items-center */}
        {/* Image and Overlay Container */}
        <div
          onClick={updateProfile}
          className='
            relative
            group
            cursor-pointer
            rounded-full
            w-[150px] h-[150px]
            md:w-[200px] md:h-[200px]
            lg:w-[220px] lg:h-[220px]
            overflow-hidden
            flex-shrink-0 /* Prevent shrinking on smaller screens */
          '
        >
          {/* Avatar Image */}
          <Image
            alt="avatar"
            src={avatar || "/images/user.png"}
            width={220} /* Set a max width for Image component */
            height={220} /* Set a max height for Image component */
            className="
              object-cover
              rounded-full
              w-full h-full
              transition-transform
              group-hover:scale-105 /* Slight zoom on hover */
            "
          />
          {/* Overlay for Hover Effect */}
          <div
            className="
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
              bg-black/50 /* Semi-transparent black overlay */
              rounded-full
              transition-opacity
              duration-300
              opacity-0
              group-hover:opacity-100
            "
          >
            <RxPencil1 className='text-white mb-2' size={40} /> {/* Adjusted size and added margin-bottom */}
            <p className='
              font-semibold
              text-lg
              md:text-xl
              lg:text-2xl
              text-white
              text-center
              px-2 /* Added horizontal padding */
            '>
              Select Picture
            </p>
          </div>
        </div>

        {/* User Name Section */}
        <div className="flex flex-col gap-y-1.5 justify-center mt-4 md:mt-0 md:ml-4"> {/* Added margin-top for mobile, margin-left for desktop */}
          <p className='text-neutral-400 font-semibold text-base md:text-lg'>Profile</p> {/* Changed to neutral-400 for contrast */}
          <p className='text-white font-bold text-3xl md:text-4xl lg:text-5xl'>{full_name || "User Name"}</p>
        </div>
      </div>
    </div>
  );
}
