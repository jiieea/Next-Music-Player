'use client'

import useProfileModal from "@/hook/useProfileModal";
import { FaRegCircleUser } from "react-icons/fa6";
import { RxPencil1 } from "react-icons/rx";
import { UserDetails } from "../../../../types";
import Image from "next/image";
import useLoadAvatar from "@/hook/useLoadAvatar";
interface AccountContentProps {
  user : UserDetails
}

export  const AccountContent : React.FC<AccountContentProps> = ({
  user
}) => {
  const { full_name } = user;
  const avatar = useLoadAvatar(user)
  const profileModal = useProfileModal()
  const updateProfile = () => {
    return profileModal.onOpen()
  }
  return (
    <div className='mt-3 '>
      <h1 className='text-2xl md:text-3xl lg:text-4xl'>
        Account Settings
      </h1>
      <div className="flex gap-x-2 " >
        <div className='flex gap-x-2 items-center hover:brightness-40 cursor-pointer ' onClick={updateProfile}>
          <div className='p-3 m-7 bg-neutral-700 rounded-full relative w-[150px] h-[150px] md:w-[200px] md:h-[200px]'>
          {
            avatar ? (
              <Image alt="avatar" src={avatar ||  "/images/liked.png"}    className="object-cover
              rounded-full" fill/>
            )  : (
              <FaRegCircleUser  size={95}/>
            )
          }
            <div className="flex flex-col md:gap-y-1 absolute transition items-center top-7 left-8 justify-center p-5 hover:opacity-100 opacity-0" >
              <RxPencil1 className='text-white w-[30]  lg:w-[50] ' size={50} />
              <p className='font-semibold text-lg text-white'>Select Picture</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-1.5 justify-center">
          <p className='text-white font-semibold text-[1rem] md:text-lg'>Profile</p>
          <p className='text-white font-semibold text-[3rem] md:text-3xl lg:text-5xl'>{ full_name }</p>
        </div>
      </div>
    </div>
  );
}


