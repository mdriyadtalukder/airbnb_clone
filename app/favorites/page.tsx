import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import EmpltyState from "../EmpltyState";
import FavotiteClient from "./FavotiteClient";

const FavoritePage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();
    if (listings.length === 0) {
        return (
            <EmpltyState title="No favorites found" subtitle="Looks like you have no favorite listings">

            </EmpltyState>
        )
    }
    return (
        <FavotiteClient listings={listings} currentUser={currentUser}>

        </FavotiteClient>

    );
};

export default FavoritePage;