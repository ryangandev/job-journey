'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { prisma } from '../libs/db';
import { SocialProfileSchema } from '../schemas/digital-profile-schema';

async function addProfileLinkAction(
  profileLinkData: z.infer<typeof SocialProfileSchema>,
) {
  const result = SocialProfileSchema.safeParse(profileLinkData);

  if (!result.success) {
    let errorMessages = '';

    result.error.issues.forEach((issue) => {
      errorMessages += issue.path[0] + ': ' + issue.message + '.\n';
    });

    return {
      error: errorMessages,
    };
  }

  const parsedProfileLinkData = result.data;
  try {
    await prisma.socialProfile.create({
      data: {
        userId: parsedProfileLinkData.userId,
        platform: parsedProfileLinkData.platform,
        url: parsedProfileLinkData.url,
        position: parsedProfileLinkData.position,
      },
    });
  } catch (dbError) {
    console.log('Database operation failed:', dbError);
    return {
      error: 'Database operation failed',
    };
  }

  revalidatePath('/digital-profile');
  return { success: 'Social profile added!' };
}

export { addProfileLinkAction };
