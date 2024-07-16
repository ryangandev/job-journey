import React from 'react';
import {
  FcApproval,
  FcSurvey,
  FcCellPhone,
  FcGraduationCap,
  FcCancel,
  FcAndroidOs,
} from 'react-icons/fc';
import { IconBaseProps } from 'react-icons';
import { ChipProps } from '@nextui-org/chip';
import { ApplicationUpdateType } from '@prisma/client';

export const statusOptions = [
  'not_applied',
  'applied',
  'interviewing',
  'offered',
  'rejected',
  'not_selected',
  'ghosted',
];

export const settingOptions = ['on_site', 'remote', 'hybrid'];

export const typeOptions = ['full_time', 'part_time', 'contract', 'freelance'];

export const levelOptions = [
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
];

export const repliedOptions = ['Replied', 'No Reply'];

export const interviewAquiredOptions = ['Interview Aquired', 'No Interview'];

export const updateTypeOptions = [
  'submission',
  'note',
  'interview',
  'offer',
  'rejection',
];

export const statusColorMap: Record<string, ChipProps['color']> = {
  not_applied: 'warning',
  applied: 'primary',
  interviewing: 'secondary',
  offered: 'success',
  rejected: 'danger',
  not_selected: 'default',
  ghosted: 'default',
};

export const repliedColorMap: Record<string, ChipProps['color']> = {
  Replied: 'secondary',
  'No Reply': 'danger',
};

export const interviewColorMap: Record<string, ChipProps['color']> = {
  'Interview Aquired': 'success',
  'No Interview': 'warning',
};

export const updateTypeIconMap: Record<
  ApplicationUpdateType,
  React.FunctionComponentElement<IconBaseProps>
> = {
  submission: React.createElement(FcApproval),
  note: React.createElement(FcSurvey),
  interview: React.createElement(FcCellPhone),
  offer: React.createElement(FcGraduationCap),
  rejection: React.createElement(FcCancel),
  auto_generated: React.createElement(FcAndroidOs),
};

export const jobStatusMap: Record<string, string> = {
  not_applied: 'Not Applied',
  applied: 'Applied',
  interviewing: 'Interviewing',
  offered: 'Offered',
  rejected: 'Rejected',
  not_selected: 'Not Selected',
  ghosted: 'Ghosted',
};

export const jobSettingMap: Record<string, string> = {
  on_site: 'On-site',
  remote: 'Remote',
  hybrid: 'Hybrid',
};

export const jobTypeMap: Record<string, string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  contract: 'Contract',
  freelance: 'Freelance',
};

export const jobLevelMap: Record<string, string> = {
  intern: 'Intern',
  entry: 'Entry Level',
  junior: 'Junior',
  associate: 'Associate',
  mid: 'Mid Level',
  mid_senior: 'Mid-Senior Level',
  senior: 'Senior Level',
  lead: 'Lead',
  manager: 'Manager',
  director: 'Director',
  executive: 'Executive',
};

export const jobUpdateTypeMap: Record<ApplicationUpdateType, string> = {
  submission: 'Submission',
  note: 'Note',
  interview: 'Interview',
  offer: 'Offer',
  rejection: 'Rejection',
  auto_generated: 'Auto-generated',
};
