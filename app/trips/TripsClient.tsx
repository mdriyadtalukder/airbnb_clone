'use client';
import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listing/ListingCard";

interface TrapsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}
const TripsClient : React.FC<TrapsClientProps>= ({ reservations, currentUser }) => {
    const route = useRouter();
    const [deleteingId, setDeletingId] = useState('');

    const oncancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled');
                route.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('')
            })
    }, [route])
    return (
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <Heading
                title="Trips"
                subtitle="Where you've been and where you're going"
            >

            </Heading>
            <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {

                    reservations.map((reservation) => (
                        <ListingCard key={reservation.id} data={reservation.listing} reservation={reservation} actionId={reservation.id} onAction={oncancel} disabled={deleteingId === reservation.id} actionLabel="Cancel reservation" currentUser={currentUser || null}>

                        </ListingCard>

                    ))
                }
            </div>
        </div>
    );
};

export default TripsClient;