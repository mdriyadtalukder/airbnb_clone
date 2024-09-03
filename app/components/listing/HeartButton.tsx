'use client';
import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
interface HeartButtonProps {
    listingId: string,
    currentUser: SafeUser | null;
}
const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
    const { hasFavorite, togglefavorite } = useFavorite({
        listingId,
        currentUser
    })
    return (
        <div className="absolute top-3 right-3">
            <div onClick={togglefavorite} className="relative hover:opacity-80 transition cursor-pointer">
                <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[-2px]"></AiOutlineHeart>
                <AiFillHeart size={24} className={` ${hasFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'} `}></AiFillHeart>
            </div>
        </div>
    );
};

export default HeartButton;