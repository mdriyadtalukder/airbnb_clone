"use client";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import Menu from "./Menu";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";
interface NavbarProps {
    currentUser?: SafeUser | null
}
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    //console.log({ currentUser })
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const { getByValue } = useCountries();

    const locationValue = params?.get('locationValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const guestCount = params?.get('guestCount');
    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getByValue(locationValue as string)?.label;
        }
        return 'Anywhere';
    }, [getByValue, locationValue]);

    const durationlabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            let diff = differenceInDays(end, start);
            if (diff === 0) {
                diff = 1;
            }
            return `${diff} Days`
        }
        return "Any Week"
    }, [endDate, startDate]);

    const guestLabel = useMemo(() => {
        if (guestCount) {
            return `${guestCount} Guests`
        }
        return 'Add Guests'
    }, [guestCount])
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Link href='/'><Image src='/images/logo.png' alt="logo" height={100} width={100} className=" md:block cursor-pointer"></Image></Link>
                        <div onClick={searchModal.onOpen} className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
                            <div className="flex flex-row items-center justify-center">
                                <div className="px-6 text-sm font-semibold">
                                    {locationLabel}
                                </div>
                                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                                    {durationlabel}                                </div>
                                <div className="flex text-sm pl-8 pr-2 text-gray-600 flex-row items-center gap-3">
                                    <div className="hidden sm:block">
                                        {guestLabel}                                    </div>
                                    <div className="p-2 bg-rose-500 text-white">
                                        <BiSearch size={18}></BiSearch>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Menu currentUser={currentUser}></Menu>
                    </div>

                </div>
            </div>
            <Categories></Categories>
        </div>
    );
};

export default Navbar;