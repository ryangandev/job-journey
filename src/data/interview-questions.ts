import { InterviewQuestion, InterviewQuestionType } from "@prisma/client";
import { ChipProps } from "@nextui-org/react";

import { prisma } from "../libs/db";

const getInterviewQuestionsByType = async (
    userId: string,
    type: InterviewQuestionType,
): Promise<InterviewQuestion[]> => {
    const interviewQuestions = await prisma.interviewQuestion.findMany({
        where: {
            userId: userId,
            type: type,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return interviewQuestions;
};

const searchInterviewQuestions = async (
    userId: string,
    query: string,
    type: InterviewQuestionType | "all",
): Promise<InterviewQuestion[]> => {
    // Create the base where clause
    const whereClause: any = {
        userId: userId,
        OR: [
            {
                question: {
                    contains: query,
                    mode: "insensitive",
                },
            },
            {
                answer: {
                    contains: query,
                    mode: "insensitive",
                },
            },
        ],
    };

    // Add type condition if type is not "all" and not empty
    if (type && type !== "all") {
        whereClause.type = type;
    }

    const interviewQuestions = await prisma.interviewQuestion.findMany({
        where: whereClause,
        orderBy: {
            createdAt: "desc",
        },
    });

    return interviewQuestions;
};

const interviewQuestionTypeOptions = ["behavioral", "technical", "company"];

const interviewQuestionTypeMap: Record<InterviewQuestionType, string> = {
    behavioral: "Behavioral",
    technical: "Technical",
    company: "Company",
};

const interviewQuestionTypeColorMap: Record<string, ChipProps["color"]> = {
    behavioral: "primary",
    technical: "secondary",
    company: "success",
};

export {
    getInterviewQuestionsByType,
    searchInterviewQuestions,
    interviewQuestionTypeOptions,
    interviewQuestionTypeMap,
    interviewQuestionTypeColorMap,
};
