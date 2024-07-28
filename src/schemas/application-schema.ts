import { z } from 'zod';

import { trimmedStringSchema } from '@/libs/string-utils';

const JobSettingSchema = z.enum(['on_site', 'remote', 'hybrid']);

const JobTypeSchema = z.enum([
  'full_time',
  'part_time',
  'contract',
  'freelance',
]);

const JobLevelSchema = z.enum([
  'intern',
  'entry',
  'junior',
  'associate',
  'mid',
  'mid_senior',
  'senior',
  'lead',
  'manager',
  'director',
  'executive',
]);

const JobStatusSchema = z.enum([
  'not_applied',
  'applied',
  'interviewing',
  'offered',
  'rejected',
  'not_selected',
  'ghosted',
]);

const ApplicationUpdateTypeSchema = z.enum([
  'submission',
  'note',
  'interview',
  'offer',
  'rejection',
  'auto_generated',
]);

const NewApplicationFormSchema = z.object({
  userId: z.string(),
  title: trimmedStringSchema(1, 100),
  company: trimmedStringSchema(1, 100),
  jobPostingLink: trimmedStringSchema(0, 4000),
  submittedThrough: z.string().optional(),
});

const ApplicationSchema = z.object({
  title: trimmedStringSchema(1, 100),
  company: trimmedStringSchema(1, 100),
  location: trimmedStringSchema(1, 100),
  setting: JobSettingSchema,
  type: JobTypeSchema,
  level: JobLevelSchema,
  status: JobStatusSchema,
  isFavorite: z.boolean(),
  replied: z.boolean(),
  interviewAquired: z.boolean(),
  salary: trimmedStringSchema(0, 100),
  jobPostingLink: trimmedStringSchema(0, 4000),
  statusTrackingLinks: z.array(z.string()),
});

const PartialApplicationSchema = ApplicationSchema.partial();

const ApplicationUpdateSchema = z.object({
  applicationId: z.string(),
  type: ApplicationUpdateTypeSchema,
  content: trimmedStringSchema(1, 4000),
});

export {
  NewApplicationFormSchema,
  ApplicationSchema,
  PartialApplicationSchema,
  ApplicationUpdateSchema,
};
