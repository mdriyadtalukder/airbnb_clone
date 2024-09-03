'use client';
import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listing/ListingCard";

interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}
const PropertiesClient = ({ listings, currentUser }: PropertiesClientProps) => {
    const route = useRouter();
    const [deleteingId, setDeletingId] = useState('');

    const oncancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success('Listings deleted');
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
                title="listings"
                subtitle="List of ur properties"
            >

            </Heading>
            <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {

                    listings.map((listing) => (
                        <ListingCard key={listing.id} data={listing} actionId={listing.id} onAction={oncancel} disabled={deleteingId === listing.id} actionLabel="Delete property" currentUser={currentUser}>

                        </ListingCard>

                    ))
                }
            </div>
        </div>
    );
};

export default PropertiesClient;