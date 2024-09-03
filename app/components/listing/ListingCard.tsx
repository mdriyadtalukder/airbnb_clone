'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Button from "../Button";
import useFavorite from "@/app/hooks/useFavorite";
import HeartButton from "./HeartButton";

interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser: SafeUser | null;
}
const ListingCard = ({ data, reservation, onAction, disabled, actionLabel, actionId, currentUser }: ListingCardProps) => {
    const route = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);
    const handleCancer = () => {
        if (disabled) {
            return;
        }
        onAction?.(actionId);
    }
    const price = useMemo(() => {
        if (reservation) {
            return reservation?.totalPrice;
        };
        return data?.price;
    }, [data?.price, reservation]);
    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
        return `${format(start, 'PP')}-${format(end, 'PP')}`
    }, [reservation])
    return (
        <div onClick={() => route.push(`listings/${data.id}`)}
            className="col-span-1 cursor-pointer group:">
            <div className="flex flex-col gap-2 w-full">
                <div className="w-full aspect-square relative overflow-hidden rounded-xl">
                    <Image fill alt="Listing" src={data?.imageSrc} className="object-cover w-full h-full hover:scale-110 transition">

                    </Image>
                    <HeartButton listingId={data.id} currentUser={currentUser}>

                    </HeartButton>

                </div>

                <div className="font-semibold text-lg">
                    {location?.region},{location?.label}

                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data?.category}
                </div>
                <div className="flex flow-row gap-1 items-center">
                    <div className="font-semibold">
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light">
                            night
                        </div>
                    )}

                </div>
                {
                    onAction && actionLabel && (
                        <Button
                            disabled={disabled}
                            small
                            label={actionLabel}
                            onClick={handleCancer}
                        >

                        </Button>
                    )
                }
            </div>

        </div>
    );
};

export default ListingCard;