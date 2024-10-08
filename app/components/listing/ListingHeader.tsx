'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "./HeartButton";

interface ListingHeaderProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser: SafeUser | null;
}
const ListingHeader: React.FC<ListingHeaderProps> = ({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser,
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue)
    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region ? location?.region : ' '}`}>

            </Heading>
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image alt="image" src={imageSrc} fill className="object-cover w-full">

                </Image>
                <div className="top-5 absolute right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}></HeartButton>
                </div>
            </div>
        </>
    );
};

export default ListingHeader;