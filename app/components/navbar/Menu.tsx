"use client";
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useRentModal from '@/app/hooks/useRentModal';
import { SafeUser } from '@/app/types';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
type menuProps = {
    currentUser?: SafeUser | null
}
const Menu = ({ currentUser }: menuProps) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const onresnt = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        rentModal.onOpen();



    }, [currentUser, loginModal, rentModal])

    return (
        <div className="relative">
            <div className="flex flow-row items-center gap-3">
                <div onClick={onresnt} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Airbob your home
                </div>
                <div onClick={() => { setIsOpen(!isOpen) }} className="p-4 md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu></AiOutlineMenu>
                    <div className="hidden md:block">
                        <Image src={currentUser?.image || '/images/placeholder.jpg'} alt='Avatar' className='rounded-full border border-rose-500' height={30} width={30}>
                        </Image>
                    </div>
                </div>
            </div>
            {
                isOpen && (
                    <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                        <div className="flex flex-col cursor-pointer">
                            {
                                currentUser ? (<>
                                    <div onClick={() => { router.push("/trips") }} className='px-4 py-3 hover:bg-neutral-100 font-semibold transition'>
                                        My trips
                                    </div>
                                    <div onClick={() => { router.push('/favorites') }} className='px-4 py-3 hover:bg-neutral-100 font-semibold transition'>
                                        My favorites
                                    </div>
                                    <div onClick={() => { router.push("/reservations") }} className='px-4 py-3 hover:bg-neutral-100 font-semibold transition'>
                                        My reservations
                                    </div>
                                    <div onClick={() => { router.push('/properties')}} className='px-4 py-3 hover:bg-neutral-100 font-semibold transition'>
                                        My proprrties
                                    </div>
                                    <div onClick={onresnt} className='px-4 py-3 hover:bg-neutral-100 font-semibold transition'>
                                        Airbnb my homo
                                    </div>
                                    <div onClick={() => { signOut() }} className='px-4 py-3 hover:bg-neutral-100 font-semibold transition'>
                                        Logout
                                    </div>


                                </>) : (<>

                                    <div onClick={loginModal.onOpen} className='px-4 py-3 hover:bg-neutral-100 font-semibold transition'>
                                        Login
                                    </div>
                                    <div onClick={registerModal.onOpen} className='px-4 py-3 hover:bg-neutral-100 font-semibold transition'>
                                        Sign Up
                                    </div></>)
                            }

                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Menu;