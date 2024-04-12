"use server";

import { prisma } from "../libs/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
    ApplicationDetailSchema,
    ApplicationFormSchema,
} from "../constants/schema";

async function getApplicationsListAction() {
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

async function addNewApplicationAction(newApplicationForm: unknown) {
    // 1. Server-side validation
    const result = ApplicationFormSchema.safeParse(newApplicationForm);
    if (!result.success) {
        let errorMessages = "";

        result.error.issues.forEach((issue) => {
            errorMessages += issue.path[0] + ": " + issue.message + ".\n";
        });

        return {
            error: errorMessages,
        };
    }

    // 2. Add the new application to the database if the form data is valid
    const validatedFormData = result.data;
    try {
        await prisma.application.create({
            data: {
                title: validatedFormData.title,
                company: validatedFormData.company,
                location: validatedFormData.location,
                setting: validatedFormData.setting,
                type: validatedFormData.type,
                level: validatedFormData.level,
                isFavorite: validatedFormData.isFavorite,
                salary: validatedFormData.salary,
                link: validatedFormData.link,
                updates: [
                    { content: validatedFormData.updates, date: new Date() },
                ],
            },
        });
    } catch (dbError) {
        console.log("Database operation failed:", dbError);
        return {
            error: "Failed to add new application.",
        };
    }

    // 3. Redirect to dashboard
    redirect("/");
}

export {
    getApplicationsListAction,
    getSpecificApplicationDetailByIdAction,
    addNewApplicationAction,
};
