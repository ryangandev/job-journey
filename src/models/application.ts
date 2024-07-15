import { JobSetting, JobType, JobLevel, JobStatus } from '@prisma/client';

type Application = {
  id: string;
  title: string;
  company: string;
  location: string;
  setting: JobSetting;
  type: JobType;
  level: JobLevel;
  status: JobStatus;
  isFavorite: boolean;
  replied: boolean;
  interviewAquired: boolean;
  appliedAt: Date;
  updatedAt: Date;
};

export type { Application };
