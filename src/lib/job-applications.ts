// Shared, client-safe constants and helpers for job applications.
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
  WISHLIST:
    'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-400/10 dark:text-slate-300 dark:ring-slate-400/25',
  APPLIED:
    'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-400/30',
  INTERVIEWING:
    'bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/30',
  OFFER:
    'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/30',
  REJECTED:
    'bg-red-50 text-red-700 ring-red-200 dark:bg-red-400/10 dark:text-red-300 dark:ring-red-400/30',
  WITHDRAWN:
    'bg-neutral-100 text-neutral-500 ring-neutral-200 dark:bg-neutral-400/10 dark:text-neutral-400 dark:ring-neutral-400/25',
};

/** Applications still in progress: sent, and not resolved one way or the other yet. */
export const ACTIVE_STATUSES: readonly ApplicationStatusValue[] = [
  'APPLIED',
  'INTERVIEWING',
];

export const WORK_MODES = ['ONSITE', 'HYBRID', 'REMOTE'] as const;

export type WorkModeValue = (typeof WORK_MODES)[number];

export const WORK_MODE_LABELS: Record<WorkModeValue, string> = {
  ONSITE: 'On-site',
  HYBRID: 'Hybrid',
  REMOTE: 'Remote',
};

// --- Dashboard filters, kept in the URL query string ---

export const SORT_OPTIONS = [
  { value: 'updated', label: 'Last updated' },
  { value: 'applied', label: 'Date applied' },
  { value: 'company', label: 'Company A–Z' },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]['value'];

export const SORT_LABELS = Object.fromEntries(
  SORT_OPTIONS.map(({ value, label }) => [value, label]),
) as Record<SortValue, string>;

export type StatusFilter = 'ALL' | ApplicationStatusValue;

export type DashboardFilters = {
  status: StatusFilter;
  q: string;
  sort: SortValue;
};

export const DEFAULT_FILTERS: DashboardFilters = {
  status: 'ALL',
  q: '',
  sort: 'updated',
};

export const MAX_SEARCH_LENGTH = 100;

const isStatus = (value: string): value is ApplicationStatusValue =>
  (APPLICATION_STATUSES as readonly string[]).includes(value);

const isSort = (value: string): value is SortValue => value in SORT_LABELS;

/** Reads the filters from a query string. Missing or invalid values fall back to the defaults. */
export function parseDashboardFilters(params: {
  get: (name: string) => string | null;
}): DashboardFilters {
  const status = params.get('status')?.trim().toUpperCase() ?? '';
  const sort = params.get('sort')?.trim().toLowerCase() ?? '';
  const q = (params.get('q') ?? '').trim().slice(0, MAX_SEARCH_LENGTH);

  return {
    status: isStatus(status) ? status : DEFAULT_FILTERS.status,
    q,
    sort: isSort(sort) ? sort : DEFAULT_FILTERS.sort,
  };
}

/** The query string for a set of filters. Defaults are left out to keep URLs short. */
export function toDashboardSearch(filters: DashboardFilters) {
  const params = new URLSearchParams();
  if (filters.status !== DEFAULT_FILTERS.status) {
    params.set('status', filters.status);
  }
  const q = filters.q.trim();
  if (q) params.set('q', q);
  if (filters.sort !== DEFAULT_FILTERS.sort) params.set('sort', filters.sort);

  const search = params.toString();
  return search ? `?${search}` : '';
}

type Sortable = {
  company: string;
  position: string;
  appliedAt: Date | null;
  updatedAt: Date;
};

// A fixed locale keeps the order identical on the server and the client
const collator = new Intl.Collator('en', {
  sensitivity: 'base',
  numeric: true,
});

const byUpdatedDesc = (a: Sortable, b: Sortable) =>
  b.updatedAt.getTime() - a.updatedAt.getTime();

const COMPARATORS: Record<SortValue, (a: Sortable, b: Sortable) => number> = {
  updated: byUpdatedDesc,
  // Newest first; applications without a date (e.g. on the wishlist) go last
  applied: (a, b) => {
    if (a.appliedAt && b.appliedAt) {
      return (
        b.appliedAt.getTime() - a.appliedAt.getTime() || byUpdatedDesc(a, b)
      );
    }
    if (a.appliedAt) return -1;
    if (b.appliedAt) return 1;
    return byUpdatedDesc(a, b);
  },
  // Case-insensitive, so "acme" and "Acme" sort together
  company: (a, b) =>
    collator.compare(a.company, b.company) ||
    collator.compare(a.position, b.position),
};

export function sortApplications<T extends Sortable>(
  applications: readonly T[],
  sort: SortValue,
) {
  return [...applications].sort(COMPARATORS[sort]);
}
