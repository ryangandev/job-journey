"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { prisma } from "../libs/db";
import {
    InterviewQuestionSchema,
    InterviewQuestionSearchQuerySchema,
    InterviewQuestionUpdateSchema,
} from "../schemas/interview-prep-schema";
import { auth } from "../auth";
import { searchInterviewQuestions } from "../data/interview-questions";

const createInterviewQuestionAction = async (
    interviewQuestionData: z.infer<typeof InterviewQuestionSchema>,
) => {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
        return {
            error: "User not found",
        };
    }

    const result = InterviewQuestionSchema.safeParse(interviewQuestionData);
    if (!result.success) {
        return {
            error: result.error.issues.map((issue) => issue.message).join(", "),
        };
    }

    const { type, question, answer } = result.data;

    try {
        await prisma.interviewQuestion.create({
            data: {
                userId,
                type,
                question,
                answer,
            },
        });
    } catch (error) {
        return {
            error: "There was an error creating the interview question.",
        };
    }

    revalidatePath("/interview-prep");
    return {
        message: "Interview question created successfully.",
    };
};

const getSearchedInterviewQuestionsAction = async (
    queryData: z.infer<typeof InterviewQuestionSearchQuerySchema>,
) => {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
        return {
            error: "User not found",
        };
    }

    const result = InterviewQuestionSearchQuerySchema.safeParse(queryData);
    if (!result.success) {
        return {
            error: result.error.issues.map((issue) => issue.message).join(", "),
        };
    }

    const { query, type } = result.data;

    try {
        const interviewQuestions = await searchInterviewQuestions(
            userId,
            query,
            type,
        );
        return {
            interviewQuestions,
        };
    } catch (error) {
        return {
            error: "There was an error getting the interview questions.",
        };
    }
};

const updateInterviewQuestionAction = async (
    update: z.infer<typeof InterviewQuestionUpdateSchema>,
) => {
    const result = InterviewQuestionUpdateSchema.safeParse(update);
    if (!result.success) {
        return {
            error: result.error.issues.map((issue) => issue.message).join(", "),
        };
    }

    const { questionId, type, question, answer } = result.data;

    try {
        await prisma.interviewQuestion.update({
            where: {
                id: questionId,
            },
            data: {
                type,
                question,
                answer,
                updatedAt: new Date(),
            },
        });
    } catch (error) {
        return {
            error: "There was an error updating the interview question.",
        };
    }

    revalidatePath("/interview-prep");
    return {
        message: "Interview question updated successfully.",
    };
};

const deleteInterviewQuestionAction = async (questionId: string) => {
    try {
        await prisma.interviewQuestion.delete({
            where: {
                id: questionId,
            },
        });
    } catch (error) {
        return {
            error: "There was an error deleting the interview question.",
        };
    }

    revalidatePath("/interview-prep");
    return {
        message: "Interview question deleted successfully.",
    };
};

export {
    createInterviewQuestionAction,
    getSearchedInterviewQuestionsAction,
    updateInterviewQuestionAction,
    deleteInterviewQuestionAction,
};
