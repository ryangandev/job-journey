import { prisma } from '@/libs/db';

export const getSocialProfilesByUserId = async (userId: string) => {
  try {
    const profileLinks = await prisma.socialProfile.findMany({
      where: {
        userId: userId,
      },
    });

    return profileLinks;
  } catch (error) {
    console.log('Error:', error);
    return {
      error: 'There was an error fetching the profile links.',
    };
  }
};
