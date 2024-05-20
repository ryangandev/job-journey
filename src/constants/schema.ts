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
    "not_applied",
    "applied",
    "interviewing",
    "offered",
    "rejected",
    "not_selected",
    "ghosted",
]);

const UpdateSchemaForDatabaseValidation = z.object({
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

const UpdateSchemaForFormValidation = z.object({
    date: z.date(),
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
    updates: z.array(UpdateSchemaForDatabaseValidation),
    userId: z.string(),
});

const PartialApplicationDetailSchema = ApplicationDetailSchema.omit({
    id: true,
    appliedAt: true,
    updatedAt: true,
})
    .extend({
        updates: z.array(UpdateSchemaForFormValidation),
    })
    .partial();

export {
    UpdateSchemaForDatabaseValidation,
    ApplicationDetailSchema,
    PartialApplicationDetailSchema,
};
