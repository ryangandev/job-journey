import prisma from '@/lib/db';

/** All of a user's job applications, most recently updated first. Returns null on a database error. */
export const getJobApplicationsByUserId = async (userId: string) => {
  try {
    return await prisma.jobApplication.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
