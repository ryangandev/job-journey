import { z } from "zod";

import { trimmedStringSchema } from "../libs/string-utils";

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
    "not_selected",
    "ghosted",
]);

const ApplicationUpdateTypeSchema = z.enum([
    "submission",
    "note",
    "interview",
    "offer",
    "rejection",
    "no_response_auto",
]);

const NewApplicationFormSchema = z.object({
    userId: z.string(),
    title: trimmedStringSchema(1, 100),
    company: trimmedStringSchema(1, 100),
    location: trimmedStringSchema(1, 100),
    setting: JobSettingSchema,
    type: JobTypeSchema,
    level: JobLevelSchema,
    salary: trimmedStringSchema(0, 100),
    jobPostingLink: trimmedStringSchema(0, 4000),
    isFavorite: z.boolean(),
});

export { NewApplicationFormSchema };
