import { authOpions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";

export async function getSession() {
    return await getServerSession(authOpions);

}
export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });
        if (!currentUser) {
            return null;
        }
        return {
            ...currentUser,
            createAt: currentUser.createAt.toISOString(),
            updateAt: currentUser.updateAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        };
    } catch (error: any) {
        return null;

    }

}