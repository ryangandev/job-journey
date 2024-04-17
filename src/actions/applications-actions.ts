"use server";

import { prisma } from "../libs/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
    ApplicationDetailSchema,
    ApplicationFormSchema,
    PartialApplicationDetailSchema,
} from "../constants/schema";

async function getApplicationsListAction() {
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
        });
        return applications;
    } catch (error) {
        console.log("Error:", error);
        return {
            error: "There was an error fetching the applications.",
        };
    }
}

async function getSpecificApplicationDetailByIdAction(id: string) {
    try {
        const applicationDetail = await prisma.application.findUnique({
            where: {
                id: id,
            },
        });

        if (!applicationDetail) {
            console.log(`Application with id ${id} not found.`);
            return {
                error: `Application not found.`,
            };
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
            return {
                error: `Application has invalid data.`,
            };
        }

        return parsedApplicationDetail.data;
    } catch (error) {
        console.log(error);
        return {
            error: "There was an error loading the application.",
        };
    }
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

async function deleteApplicationByIdAction(id: string) {
    try {
        await prisma.application.delete({ where: { id } });
    } catch (error) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            console.log(`Application with id ${id} not found.`);
            return {
                error: `Application not found.`,
            };
        }

        console.log("Error:", error);
        return {
            error: "There was an error deleting the application.",
        };
    }

    revalidatePath("/");
    return { message: "Application deleted successfully." };
}

async function patchApplicationDetailAction(id: string, update: unknown) {
    // 1. Validate the update
    // 1.1 Validate the update using zod schema to ensure the update is on a valid field
    const result = PartialApplicationDetailSchema.safeParse(update);
    if (!result.success) {
        console.log("Invalid update.", result.error);
        const issue = result.error.issues[0];
        return {
            error:
                "Invalid update. " + issue.path[0] + ": " + issue.message + ".",
        };
    }

    // 1.2 Ensure that only one field is being updated at a time
    const updateKeys = Object.keys(result.data);
    if (updateKeys.length !== 1) {
        console.log("You should update exactly one field at a time.");
        return {
            error: "You should update exactly one field at a time.",
        };
    }

    // 2. Apply the update
    try {
        await prisma.application.update({
            where: { id },
            data: result.data,
        });
    } catch (error) {
        console.log("Error:", error);
        return {
            error: "Failed to update application.",
        };
    }

    revalidatePath(`/applications/${id}`);
    return { message: `Successfully updated field [${updateKeys[0]}].` };
}

export {
    getApplicationsListAction,
    getSpecificApplicationDetailByIdAction,
    addNewApplicationAction,
    deleteApplicationByIdAction,
    patchApplicationDetailAction,
};
