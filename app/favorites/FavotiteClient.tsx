'use client';

import Heading from "../components/Heading";
import ListingCard from "../components/listing/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavotiteClientProps {
    listings: SafeListing[],
    currentUser: SafeUser | null;
}
const FavotiteClient: React.FC<FavotiteClientProps> = ({ listings, currentUser }) => {
    return (
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <Heading title="Favorites" subtitle="List of places you have favorited!">

            </Heading>
            <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {
                    listings.map((listing) => (
                        <ListingCard currentUser={currentUser} key={listing.id} data={listing}></ListingCard>
                    ))
                }
            </div>
        </div>
    );
};

export default FavotiteClient;