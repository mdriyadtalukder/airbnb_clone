'use client'
import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listing/ListingCard";

interface ReservationClientProps {
    reservations: SafeReservation[];
    currentUser: SafeUser | null;
}
const ReservationClient: React.FC<ReservationClientProps> = ({ reservations, currentUser }) => {
    const route = useRouter();
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reservation Cancelled");
                route.refresh();
            })
            .catch(() => {
                toast.error("Something went wrong!");

            })
            .finally(() => {
                setDeletingId('')
            })
    }, [route])
    return (
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <Heading title="Reservations" subtitle="Bookings on your properties"></Heading>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {

                    reservations.map((reservation) => (
                        <ListingCard key={reservation.id} data={reservation.listing} reservation={reservation} actionId={reservation.id} onAction={onCancel} disabled={deletingId === reservation.id} actionLabel="Cancel reservation" currentUser={currentUser}>

                        </ListingCard>

                    ))
                }
            </div>
        </div>
    );
};

export default ReservationClient;