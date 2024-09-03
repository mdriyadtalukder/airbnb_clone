import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IUseFavorit {
    listingId: string;
    currentUser?: SafeUser | null;
};
const useFavorite = ({ listingId, currentUser }: IUseFavorit) => {
    const route = useRouter();
    const loginModal = useLoginModal();

    const hasFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId)
    }, [currentUser?.favoriteIds, listingId])
    const togglefavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!currentUser) {
            return loginModal.onOpen();
        };
        try {
            let request;
            if (hasFavorite) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            }
            else {
                request = () => axios.post(`/api/favorites/${listingId}`)

            }
            await request();
            route.refresh();
            toast.success("Success")


        } catch (error) {
            toast.error("Something went wrong!")

        }
    }, [currentUser, hasFavorite, listingId, loginModal, route]);
    return { hasFavorite, togglefavorite }
}
export default useFavorite;