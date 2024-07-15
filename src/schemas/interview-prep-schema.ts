import { z } from "zod";

const InterviewQuestionTypes = ["behavioral", "technical", "company"] as const;

const InterviewQuestionTypeSchema = z.enum(InterviewQuestionTypes);

const InterviewQuestionSchema = z.object({
    type: InterviewQuestionTypeSchema,
    question: z.string().min(1, { message: "Question is required" }),
    answer: z.string(),
});

const InterviewQuestionUpdateSchema = z.object({
    questionId: z.string(),
    type: InterviewQuestionTypeSchema,
    question: z.string().min(1, { message: "Question is required" }),
    answer: z.string(),
});

const InterviewQuestionTagSchema = z.object({
    name: z.string(),
});

export {
    InterviewQuestionSchema,
    InterviewQuestionUpdateSchema,
    InterviewQuestionTagSchema,
};
