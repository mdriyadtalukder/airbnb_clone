import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmpltyState from "../EmpltyState";
import ReservationClient from "./ReservationClient";

const ReservationsPage = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmpltyState title="Unauthorized" subtitle="Please login!">

            </EmpltyState>
        )
    }
    const reservations = await getReservations({
        userId: currentUser.id
    })
    if (reservations.length === 0) {
        return (
            <EmpltyState title="No reservations" subtitle="Lools like you have no reservations on your properties">

            </EmpltyState>
        )
    }
    return (
        <ReservationClient reservations={reservations} currentUser={currentUser}>

        </ReservationClient>
    );
};

export default ReservationsPage;