import { z } from 'zod';

import { APPLICATION_STATUSES, WORK_MODES } from '@/lib/job-applications';

// Optional text inputs arrive as '' from the form; store them as null
const optionalText = (max: number, label: string) =>
  z
    .string()
    .trim()
    .max(max, { error: `${label} must be within ${max} characters` })
    .transform((value) => value || null);

export const ApplicationStatusSchema = z.enum(APPLICATION_STATUSES);

export const JobApplicationSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, { error: 'Company is required' })
    .max(100, { error: 'Company must be within 100 characters' }),
  position: z
    .string()
    .trim()
    .min(1, { error: 'Position is required' })
    .max(100, { error: 'Position must be within 100 characters' }),
  status: ApplicationStatusSchema,
  location: optionalText(100, 'Location'),
  workMode: z
    .union([z.enum(WORK_MODES), z.literal('')])
    .transform((value) => value || null),
  jobUrl: z
    .union([
      z.literal(''),
      // Only http(s): the link is rendered as an <a href>, so javascript: etc. must be rejected
      z
        .url({
          protocol: /^https?$/,
          error: 'Please enter a valid http(s) link',
        })
        .max(2048, { error: 'Link is too long' }),
    ])
    .transform((value) => value || null),
  salary: optionalText(100, 'Salary'),
  appliedAt: z
    .union([z.literal(''), z.iso.date({ error: 'Please enter a valid date' })])
    .transform((value) => value || null),
  notes: optionalText(5000, 'Notes'),
});

export type JobApplicationFormInput = z.input<typeof JobApplicationSchema>;
export type JobApplicationFormOutput = z.output<typeof JobApplicationSchema>;
