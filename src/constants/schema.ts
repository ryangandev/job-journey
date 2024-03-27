import { z } from "zod";

const JobTypeSchema = z.enum(["on_site", "remote"]);
const JobStatusSchema = z.enum([
    "applied",
    "interviewing",
    "offered",
    "rejected",
    "ghosted",
]);

const QASchema = z.object({
    question: z.string(),
    answer: z.string(),
});

const ApplicationDetailSchema = z.object({
    id: z.string(),
    company: z.string(),
    title: z.string(),
    location: z.string(),
    type: JobTypeSchema,
    status: JobStatusSchema,
    isFavorite: z.boolean(),
    replied: z.boolean(),
    interviewAquired: z.boolean(),
    appliedAt: z.date(),
    updatedAt: z.date(),
    link: z.string(),
    applicationQA: z.array(QASchema),
    updates: z.array(z.string()),
});

export { ApplicationDetailSchema, QASchema };
