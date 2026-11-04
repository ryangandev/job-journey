// Shared, client-safe constants for job applications.
// Values mirror the ApplicationStatus / WorkMode enums in prisma/schema.prisma.

export const APPLICATION_STATUSES = [
  'WISHLIST',
  'APPLIED',
  'INTERVIEWING',
  'OFFER',
  'REJECTED',
  'WITHDRAWN',
] as const;

export type ApplicationStatusValue = (typeof APPLICATION_STATUSES)[number];

export const STATUS_LABELS: Record<ApplicationStatusValue, string> = {
  WISHLIST: 'Wishlist',
  APPLIED: 'Applied',
  INTERVIEWING: 'Interviewing',
  OFFER: 'Offer',
  REJECTED: 'Rejected',
  WITHDRAWN: 'Withdrawn',
};

export const STATUS_STYLES: Record<ApplicationStatusValue, string> = {
  WISHLIST: 'bg-slate-100 text-slate-700 ring-slate-200',
  APPLIED: 'bg-blue-50 text-blue-700 ring-blue-200',
  INTERVIEWING: 'bg-amber-50 text-amber-800 ring-amber-200',
  OFFER: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  REJECTED: 'bg-red-50 text-red-700 ring-red-200',
  WITHDRAWN: 'bg-neutral-100 text-neutral-500 ring-neutral-200',
};

export const WORK_MODES = ['ONSITE', 'HYBRID', 'REMOTE'] as const;

export type WorkModeValue = (typeof WORK_MODES)[number];

export const WORK_MODE_LABELS: Record<WorkModeValue, string> = {
  ONSITE: 'On-site',
  HYBRID: 'Hybrid',
  REMOTE: 'Remote',
};
