"use server";

import { prisma } from "../libs/db";
import { revalidatePath } from "next/cache";
import { ApplicationDetailSchema } from "../constants/schema";

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

async function getSpecificApplicationDetailByIdAction(id: string) {
    const applicationDetail = await prisma.application.findUnique({
        where: {
            id: id,
        },
    });

    if (!applicationDetail) {
        console.log(`Application with id ${id} not found.`);
        return undefined;
    }

    // Parse the application detail to ensure it matches the schema
    // Using zod's safeParse to validate to avoid throwing an error
    const parsedApplicationDetail =
        ApplicationDetailSchema.safeParse(applicationDetail);

    // If the application detail does not match the schema, log the error
    if (!parsedApplicationDetail.success) {
        console.log(
            `Application with id ${id} does not match the schema.`,
            parsedApplicationDetail.error,
        );
        return undefined;
    }
    return parsedApplicationDetail.data;
}

export { getApplicationsListAction, getSpecificApplicationDetailByIdAction };
