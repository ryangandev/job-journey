"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { prisma } from "../libs/db";
import {
    NewApplicationFormSchema,
    PartialApplicationSchema,
    ApplicationUpdateSchema,
} from "../schemas/application-schema";

async function addNewApplicationAction(
    newApplicationForm: z.infer<typeof NewApplicationFormSchema>,
) {
    // 1. Server-side validation
    const result = NewApplicationFormSchema.safeParse(newApplicationForm);
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
    const parsedFormData = result.data;
    try {
        await prisma.application.create({
            data: {
                userId: parsedFormData.userId,
                title: parsedFormData.title,
                company: parsedFormData.company,
                location: parsedFormData.location,
                setting: parsedFormData.setting,
                type: parsedFormData.type,
                level: parsedFormData.level,
                salary: parsedFormData.salary,
                jobPostingLink: parsedFormData.jobPostingLink,
                isFavorite: parsedFormData.isFavorite,
                updates: {
                    create: [
                        {
                            type: "auto_generated",
                            content:
                                "You just created a new application! Submit it soon! 🚀",
                        },
                    ],
                },
            },
        });
    } catch (dbError) {
        console.log("Database operation failed:", dbError);
        return {
            error: "Failed to add new application.",
        };
    }

    // 3. Redirect to dashboard
    redirect("/dashboard");
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

    revalidatePath("/dashboard");
    return { message: "Application deleted successfully." };
}

async function patchApplicationDetailAction(
    id: string,
    update: z.infer<typeof PartialApplicationSchema>,
) {
    // 1. Server-side validation
    // 1.1 Validate the update using zod schema to ensure the update is on a valid field
    const result = PartialApplicationSchema.safeParse(update);
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

    revalidatePath(`/dashboard/application-detail/${id}`);
    return { message: `[${updateKeys[0]}] is updated!` };
}

async function addApplicationUpdateAction(
    applicationUpdateForm: z.infer<typeof ApplicationUpdateSchema>,
) {
    // 1. Server-side validation
    const result = ApplicationUpdateSchema.safeParse(applicationUpdateForm);
    if (!result.success) {
        let errorMessages = "";

        result.error.issues.forEach((issue) => {
            errorMessages += issue.path[0] + ": " + issue.message + ".\n";
        });

        return {
            error: errorMessages,
        };
    }

    // 2. Add the new update to the database if the form data is valid
    const parsedFormData = result.data;
    try {
        await prisma.applicationUpdate.create({
            data: {
                applicationId: parsedFormData.applicationId,
                type: parsedFormData.type,
                content: parsedFormData.content,
            },
        });
    } catch (dbError) {
        console.log("Database operation failed:", dbError);
        return {
            error: "Failed to add new update.",
        };
    }

    revalidatePath(
        `/dashboard/application-detail/${parsedFormData.applicationId}`,
    );
    return { message: "Update added successfully." };
}

async function deleteApplicationUpdateByIdAction(id: string) {
    try {
        await prisma.applicationUpdate.delete({ where: { id } });
    } catch (error) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            console.log(`Update with id ${id} not found.`);
            return {
                error: `Update not found.`,
            };
        }

        console.log("Error:", error);
        return {
            error: "There was an error deleting the update.",
        };
    }

    revalidatePath("/dashboard");
    return { message: "Update deleted successfully." };
}

export {
    addNewApplicationAction,
    deleteApplicationByIdAction,
    patchApplicationDetailAction,
    addApplicationUpdateAction,
    deleteApplicationUpdateByIdAction,
};
