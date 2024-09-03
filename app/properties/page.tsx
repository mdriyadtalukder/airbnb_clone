import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import EmpltyState from "../EmpltyState";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmpltyState
                title="Unauthorized"
                subtitle="Please login">

            </EmpltyState>
        )
    }
    const listings = await getListings({
        userId: currentUser.id
    });
    if (listings?.length === 0) {
        return (
            <EmpltyState
                title="No properties found"
                subtitle="Looks like you have no properties">

            </EmpltyState>
        );
    }
    return (
        <PropertiesClient

            listings={listings}
            currentUser={currentUser}>

        </PropertiesClient>
    )
};

export default PropertiesPage;