'use client';
import ListingHeader from "@/app/components/listing/ListingHeader";
import ListingInfo from "@/app/components/listing/ListingInfo";
import ListiongReservation from "@/app/components/listing/ListiongReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}
interface ListngClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}
const ListingClient = ({
    reservations = [], listing, currentUser
}: ListngClientProps) => {
    const loginModal = useLoginModal();
    const route = useRouter();
    const disabledDate = useMemo(() => {
        let dates: Date[] = [];
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            })
            dates = [...dates, ...range]
        });
        return dates;
    }, [reservations])
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const oncreateReservation = useCallback(() => {
        console.log(dateRange.startDate, dateRange.endDate, listing.id, totalPrice);
        if (!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing.id,
        })
            .then(() => {
                toast.success('Listing reserved!');
                setDateRange(initialDateRange);
                route.push('/trips');
            })
            .catch(() => {
                toast.error("Something went wrong!")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [currentUser, dateRange?.endDate, dateRange?.startDate, listing.id, loginModal, route, totalPrice])
    useEffect(() => {
        if (dateRange?.startDate && dateRange?.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange?.endDate,
                dateRange?.startDate,
            );
            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price)
            }
            else {
                setTotalPrice(listing.price)
            }
        }
    }, [dateRange?.endDate, dateRange?.startDate, listing.price])


    const category = useMemo(() => {
        return categories.find((item) =>
            item.label === listing.category)
    }, [listing.category])
    return (
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <div className="mx-auto max-w-screen-lg">
                <div className="flex flex-col gap-4">
                    <ListingHeader
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    >

                    </ListingHeader>
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={listing.category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        ></ListingInfo>
                        <div className="md-10 order-first md:order-last md:col-span-3">
                            <ListiongReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={oncreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDate}
                            >

                            </ListiongReservation>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};

export default ListingClient;