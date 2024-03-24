"use server";

import { prisma } from "../libs/db";
import { revalidatePath } from "next/cache";

async function getAppliedJobsListAction() {
    const appliedJobs = await prisma.appliedJob.findMany({
        select: {
            id: true,
            company: true,
            title: true,
            location: true,
            remote: true,
            status: true,
            isFavorite: true,
            replied: true,
            interviewAquired: true,
            appliedAt: true,
            updatedAt: true,
        },
    });
    return appliedJobs;
}

export { getAppliedJobsListAction };
