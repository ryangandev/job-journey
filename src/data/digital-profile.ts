import { prisma } from "../libs/db";

const getProfileLinksByUserId = async (userId: string) => {
    try {
        const profileLinks = await prisma.socialProfile.findMany({
            where: {
                userId: userId,
            },
        });

        return profileLinks;
    } catch (error) {
        console.log("Error:", error);
        return {
            error: "There was an error fetching the profile links.",
        };
    }
};

export { getProfileLinksByUserId };
