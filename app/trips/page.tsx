import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmpltyState from "../EmpltyState";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmpltyState
                title="Unauthorized"
                subtitle="Please login">

            </EmpltyState>
        )
    }
    const reservations = await getReservations({
        userId: currentUser.id
    });
    if (reservations?.length === 0) {
        return (
            <EmpltyState
                title="No trips found"
                subtitle="Looks like you have not reserved any trips">

            </EmpltyState>
        );
    }
    return (
        <TripsClient

            reservations={reservations}
            currentUser={currentUser}>

        </TripsClient>
    )
};

export default TripsPage;