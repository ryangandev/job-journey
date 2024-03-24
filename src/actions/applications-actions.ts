"use server";

import { prisma } from "../libs/db";
import { revalidatePath } from "next/cache";

async function getApplicationsListAction() {
    const applications = await prisma.application.findMany({
        select: {
            id: true,
            company: true,
            title: true,
            location: true,
            type: true,
            status: true,
            isFavorite: true,
            replied: true,
            interviewAquired: true,
            appliedAt: true,
            updatedAt: true,
        },
    });
    return applications;
}

export { getApplicationsListAction };
