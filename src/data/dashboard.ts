import { ApplicationUpdateType } from '@prisma/client';

import { Column, SearchFilterOption } from '@/models/dashboard';

export const columns: Column[] = [
  {
    name: 'Fav',
    uid: 'isFavorite',
    width: 50,
    sortable: true,
  },
  {
    name: 'TITLE',
    uid: 'title',
    width: 300,
    sortable: true,
  },
  {
    name: 'COMPANY',
    uid: 'company',
    width: 175,
    sortable: true,
  },
  {
    name: 'STATUS',
    uid: 'status',
    width: 150,
    sortable: true,
  },
  {
    name: 'REPLIED',
    uid: 'replied',
    width: 100,
    sortable: true,
  },
  {
    name: 'INTERVIEW',
    uid: 'interviewAquired',
    width: 100,
    sortable: true,
  },
  {
    name: 'APPLIED',
    uid: 'appliedAt',
    width: 100,
    sortable: true,
  },
  {
    name: 'UPDATED',
    uid: 'updatedAt',
    width: 100,
    sortable: true,
  },
  {
    name: 'ACTIONS',
    uid: 'actions',
    width: 80,
  },
] as const; // const assertion to infer the type as readonly

export const searchFilterOptions: SearchFilterOption[] = [
  'title',
  'company',
  'location',
  // "appliedAt",
  // "updatedAt",
];

export const searchFilterOptionsMap: Record<string, string> = {
  title: 'Title',
  company: 'Company',
  location: 'Location',
  appliedAt: 'Applied At',
  updatedAt: 'Updated At',
};

export const submissionSites = [
  'LinkedIn',
  'Indeed',
  'Glassdoor',
  'WellFound',
  'Company website',
  'Company website (Workday)',
];

const noteUpdateTemplates = ['Application viewed by the hiring team'];

const rejectionUpdateTemplates = [
  'This job is no longer accepting applications',
  'Failed the OA (Online Assessment)',
];

const updateTemplates = (type: ApplicationUpdateType) => {
  switch (type) {
    case 'note':
      return noteUpdateTemplates;
    case 'rejection':
      return rejectionUpdateTemplates;
    default:
      return [];
  }
};
