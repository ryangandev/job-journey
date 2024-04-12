import { z } from "zod";

const JobSettingSchema = z.enum(["on_site", "remote", "hybrid"]);
const JobTypeSchema = z.enum([
    "full_time",
    "part_time",
    "contract",
    "freelance",
]);
const JobLevelSchema = z.enum([
    "intern",
    "entry",
    "junior",
    "associate",
    "mid",
    "mid_senior",
    "senior",
    "lead",
    "manager",
    "director",
    "executive",
]);
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

const UpdateSchema = z.object({
    date: z
        .string()
        .refine(
            (val) => {
                // Try to parse the string as a date
                const parsedDate = new Date(val);
                // Check if the date is valid
                return !isNaN(parsedDate.getTime());
            },
            {
                message: "Invalid date format, expected ISO 8601 string",
            },
        )
        .transform((val) => new Date(val)), // Transform the valid string into a Date object
    content: z.string(),
});

const ApplicationDetailSchema = z.object({
    id: z.string(),
    title: z.string(),
    company: z.string(),
    location: z.string(),
    setting: JobSettingSchema,
    type: JobTypeSchema,
    level: JobLevelSchema,
    salary: z.string(),
    status: JobStatusSchema,
    isFavorite: z.boolean(),
    replied: z.boolean(),
    interviewAquired: z.boolean(),
    appliedAt: z.date(),
    updatedAt: z.date(),
    link: z.string(),
    applicationQA: z.array(QASchema),
    updates: z.array(UpdateSchema),
});

const ApplicationFormSchema = z.object({
    title: z.string().trim().min(1).max(40),
    company: z.string().trim().min(1).max(40),
    location: z.string().trim().min(1).max(40),
    setting: JobSettingSchema,
    type: JobTypeSchema,
    level: JobLevelSchema,
    salary: z.string().trim().max(40),
    link: z.string().trim().min(1).max(4000),
    updates: z.string().trim().max(4000),
    isFavorite: z.boolean(),
});

export {
    QASchema,
    UpdateSchema,
    ApplicationDetailSchema,
    ApplicationFormSchema,
};
