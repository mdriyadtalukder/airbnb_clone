'use client';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import CategoriBox from "./CategoriBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
    {
        label: "Beach",
        icon: TbBeach,
        description: "This proprerty is close to the beach"
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "This proprerty has windmills"
    },
    {
        label: "Mordern",
        icon: MdOutlineVilla,
        description: "This proprerty is modern"
    },
    {
        label: "Countryside",
        icon: TbMountain,
        description: "This proprerty is in the countryside"
    },
    {
        label: "Pools",
        icon: TbPool,
        description: "This proprerty has a pool "
    },
    {
        label: "IsLands",
        icon: GiIsland,
        description: "This proprerty is on an island"
    },
    {
        label: "Lake",
        icon: GiBoatFishing,
        description: "This proprerty is close to lake"
    },
    {
        label: "Skiing",
        icon: FaSkiing,
        description: "This proprerty has skiing activities "
    },
    {
        label: "Castles",
        icon: GiCastle,
        description: "This proprerty is in castle. "
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "This proprerty has camping activities "
    },
    {
        label: "Arctic",
        icon: BsSnow,
        description: "This proprerty is in snow "
    },
    {
        label: "Cave",
        icon: GiCaveEntrance,
        description: "This proprerty is in a cave "
    },
    {
        label: "Desert",
        icon: GiCactus,
        description: "This proprerty is in the desert "
    },
    {
        label: "Barns",
        icon: GiBarn,
        description: "This proprerty is in the barn "
    },
    {
        label: "Lux",
        icon: IoDiamond,
        description: "This proprerty is luxurious "
    },

]
const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    if (!isMainPage) {
        return null;
    }
    return (
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <div className="
            pt-4
            flex
            flex-row
            items-center
            justify-evenly
            overflow-x-auto
            ">
                {
                    categories.map((item) => <CategoriBox key={item.label} label={item.label} selected={category === item.label} icon={item.icon}></CategoriBox>)
                }

            </div>
        </div>

    );
};

export default Categories;