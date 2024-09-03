import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { listingId, startDate, endDate, totalPrice } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }

    // Create the reservation directly, storing the userId and listingId
    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate, endDate, totalPrice
                }
            }
        },
    });

    // // Optionally return the updated listing with all reservations, if needed
    // const updatedListing = await prisma.listing.findUnique({
    //     where: { id: listingId },
    //     data: {
    //         reservations: {
    //             connect: { id: reservation.id },
    //         },
    //     },
    // });

    return NextResponse.json(listingAndReservation);
}
