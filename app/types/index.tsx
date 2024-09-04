import { Listing, Reservation, User } from "@prisma/client";


export type SafeListing = Omit<
    Listing,
    'createAt'
> & {
    createAt: string;
}
export type SafeListings= {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    createAt: Date; // Update this if 'Date' is expected
    category: string;
    roomCount: number;
    bathroomCount: number;
    guestCount: number;
    locationValue: string;
    userId: string;
    price: number;
}

export type SafeUser = Omit<
    User,
    'createAt' | 'updateAt' | 'emailVerified'
> & {
    createAt: string;
    updateAt: string;
    emailVerified: string | null;
}

export type SafeReservation = Omit<
    Reservation,
    'createAt' | 'startDate' | 'endDate' | 'listing'
> & {
    createAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
}