import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmpltyState from "@/app/EmpltyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";
interface IParams {
    listingId: string
}
const page = async ({ params }: { param: IParams }) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    const reservations = await getReservations(params);
    if (!listing) {
        return (
            <EmpltyState></EmpltyState>
        )
    }
    return (
        <ListingClient listing={listing} reservations={reservations} currentUser={currentUser}>

        </ListingClient>
    );
};

export default page;