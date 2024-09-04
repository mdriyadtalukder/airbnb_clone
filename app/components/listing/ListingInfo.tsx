import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Image from "next/image";
import ListCategory from "./ListCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface ListingInfoProps {
    user: SafeUser,
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category: string;
    locationValue: string;
}
const ListingInfo: React.FC<ListingInfoProps> = ({ user, description, guestCount, roomCount, bathroomCount, category, locationValue }) => {
    const { getByValue } = useCountries();
    const cordinates = getByValue(locationValue)?.lating;
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex  flex-col gap-2">
                <div className="flex flex-row text-xl font-semibold items-center gap-2">
                    <div>Hosted by {user?.name}</div>
                    <div className="">
                        <Image src={user?.image || '/images/placeholder.jpg'} alt='Avatar' className='rounded-full border border-rose-500' height={30} width={30}>
                        </Image>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>
                        {guestCount} guests
                    </div>
                    <div>
                        {roomCount} rooms
                    </div>
                    <div>
                        {bathroomCount} bathrooms
                    </div>
                </div>
            </div>
            <hr />
            {
                category && (
                    <div className="flex flex-row text-xl font-semibold items-center gap-2">
                        <div>{category}</div>

                    </div>

                )
            }
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            {
                cordinates && <Map center={cordinates}></Map>
            }
        </div>
    );
};

export default ListingInfo;