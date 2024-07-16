import { Application, ApplicationUpdate } from '@prisma/client';

import { prisma } from '@/libs/db';
import { ApplicationPreview } from '@/models/application';

export const getApplicationsDashboardByUserId = async (
  userId: string,
): Promise<ApplicationPreview[]> => {
  try {
    const applications = await prisma.application.findMany({
      select: {
        id: true,
        company: true,
        title: true,
        location: true,
        setting: true,
        type: true,
        level: true,
        status: true,
        isFavorite: true,
        replied: true,
        interviewAquired: true,
        appliedAt: true,
        updatedAt: true,
      },
      where: {
        userId: userId,
      },
    });

    return applications;
  } catch (error) {
    throw new Error('Failed to fetch the applications from the database.');
  }
};

export const getApplicationById = async (id: string): Promise<Application> => {
  try {
    const application = await prisma.application.findUnique({
      where: {
        id,
      },
    });

    if (!application) {
      console.log(`Application with id ${id} not found.`);
      throw new Error('Application not found.');
    }

    return application;
  } catch (error) {
    throw new Error('Failed to fetch the application from the database.');
  }
};

export const getApplicationUpdatesByApplicationId = async (
  id: string,
): Promise<ApplicationUpdate[]> => {
  try {
    const applicationUpdates = await prisma.applicationUpdate.findMany({
      where: {
        applicationId: id,
      },
    });

    return applicationUpdates;
  } catch (error) {
    throw new Error(
      'Failed to fetch the application updates from the database.',
    );
  }
};
