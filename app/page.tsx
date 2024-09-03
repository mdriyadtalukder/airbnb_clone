import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import ListingCard from "./components/listing/ListingCard";
import EmpltyState from "./EmpltyState";
interface HomeProps {
  searchParams: IListingsParams
}
const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    return (<EmpltyState showReset></EmpltyState>);
  }
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {
          listings.map((listing: any) => {
            return (
              <ListingCard key={listing?._id} data={listing} currentUser={currentUser}>

              </ListingCard>
            )
          })
        }
      </div>
    </div>

  );
}
export default Home;
