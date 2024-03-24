import { z } from "zod";

const QuestionAndAnswerSchema = z.object({
    question: z.string(),
    answer: z.string(),
});

const ApplicationDetailSchema = z.object({
    id: z.string(),
    company: z.string(),
    title: z.string(),
    location: z.string(),
    type: z.enum(["on_site", "remote"]),
    status: z.enum([
        "applied",
        "interviewing",
        "offered",
        "rejected",
        "ghosted",
    ]),
    isFavorite: z.boolean(),
    replied: z.boolean(),
    interviewAquired: z.boolean(),
    appliedAt: z.date(),
    updatedAt: z.date(),
    link: z.string(),
    applicationQA: z.array(QuestionAndAnswerSchema),
    updates: z.array(z.string()),
});

export { ApplicationDetailSchema, QuestionAndAnswerSchema };
