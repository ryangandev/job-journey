'use client';

import {
  ArrowDownUp,
  Briefcase,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  StickyNote,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from 'react';
import { toast } from 'sonner';

import { updateJobApplicationStatusAction } from '@/actions/job-application-actions';
import DeleteJobApplicationDialog from '@/components/job-applications/delete-job-application-dialog';
import { formatDate } from '@/components/job-applications/format';
import JobApplicationFormDialog from '@/components/job-applications/job-application-form-dialog';
import StatusBadge from '@/components/job-applications/status-badge';
import SummaryStats from '@/components/job-applications/summary-stats';
import useDashboardFilters from '@/components/job-applications/use-dashboard-filters';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { JobApplication } from '@/generated/prisma/client';
import {
  APPLICATION_STATUSES,
  MAX_SEARCH_LENGTH,
  SORT_LABELS,
  SORT_OPTIONS,
  STATUS_LABELS,
  WORK_MODE_LABELS,
  sortApplications,
  type ApplicationStatusValue,
  type SortValue,
} from '@/lib/job-applications';
import { cn } from '@/lib/utils';

const NEW_APPLICATION_SHORTCUT = 'N';
const NOTES_PREVIEW_LENGTH = 160;

const isTypingTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

/** Pressing "N" runs `onPress`, unless a modifier is held, the user is typing, or a dialog / menu is open. */
function useNewApplicationShortcut(onPress: () => void) {
  const handlePress = useEffectEvent(onPress);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== NEW_APPLICATION_SHORTCUT.toLowerCase()) {
        return;
      }
      if (event.repeat || event.defaultPrevented || event.isComposing) return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
        return;
      }
      if (isTypingTarget(event.target)) return;
      // The form and delete dialogs, the mobile sidebar (a sheet) and any open dropdown menu
      if (document.querySelector('[role="dialog"], [role="menu"]')) return;

      event.preventDefault();
      handlePress();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}

function StatusFilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-hidden',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'bg-background text-muted-foreground hover:bg-accent hover:text-foreground',
      )}
    >
      {label}
      <span className={cn('tabular-nums', !active && 'text-foreground/60')}>
        {count}
      </span>
    </button>
  );
}

function SortMenu({
  sort,
  onChange,
}: {
  sort: SortValue;
  onChange: (sort: SortValue) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="shrink-0 gap-1.5"
          aria-label={`Sort by: ${SORT_LABELS[sort]}`}
        >
          <ArrowDownUp className="size-4" />
          <span className="text-muted-foreground">Sort:</span>
          {SORT_LABELS[sort]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={sort}
          onValueChange={(value) => onChange(value as SortValue)}
        >
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function StatusSelect({
  application,
  onChange,
}: {
  application: JobApplication;
  onChange: (status: ApplicationStatusValue) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    const status = value as ApplicationStatusValue;
    if (isPending || status === application.status) return;

    // The badge switches right away (useOptimistic in the board) and rolls back if the save fails
    startTransition(() => onChange(status));
  };

  return (
    <DropdownMenu>
      {/* Not `disabled` while saving: that would drop keyboard focus */}
      <DropdownMenuTrigger
        aria-label={`Status: ${STATUS_LABELS[application.status]}. Change status`}
        aria-busy={isPending || undefined}
        data-pending={isPending || undefined}
        className="rounded-md transition-opacity focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden data-pending:opacity-70"
      >
        <StatusBadge status={application.status} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Change status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={application.status}
          onValueChange={handleChange}
        >
          {APPLICATION_STATUSES.map((status) => (
            <DropdownMenuRadioItem key={status} value={status}>
              {STATUS_LABELS[status]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotesIndicator({ notes }: { notes: string }) {
  const preview =
    notes.length > NOTES_PREVIEW_LENGTH
      ? `${notes.slice(0, NOTES_PREVIEW_LENGTH).trimEnd()}…`
      : notes;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          role="img"
          aria-label="Has notes"
          className="inline-flex shrink-0 text-muted-foreground"
        >
          <StickyNote className="size-3.5" aria-hidden />
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-64 whitespace-pre-line">
        {preview}
      </TooltipContent>
    </Tooltip>
  );
}

/** Location, work mode and salary, skipping repeats like "Remote · Remote". */
const getMeta = (application: JobApplication) => {
  const values = [
    application.location,
    application.workMode && WORK_MODE_LABELS[application.workMode],
    application.salary,
  ].filter((value): value is string => !!value);

  return values.filter(
    (value, index) =>
      values.findIndex((v) => v.toLowerCase() === value.toLowerCase()) ===
      index,
  );
};

function ApplicationRow({
  application,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  application: JobApplication;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: ApplicationStatusValue) => Promise<void>;
}) {
  const meta = getMeta(application);
  const appliedLabel = application.appliedAt
    ? `Applied ${formatDate(application.appliedAt)}`
    : 'Not applied yet';

  return (
    <li className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50">
      <button
        type="button"
        onClick={onEdit}
        className="flex min-w-0 flex-1 flex-col items-stretch rounded-sm text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:outline-hidden"
      >
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="truncate text-sm font-semibold">
            {application.company}
          </span>
          {application.notes && <NotesIndicator notes={application.notes} />}
        </span>
        <span className="truncate text-sm text-muted-foreground">
          {application.position}
        </span>
        {/* Below `sm` the applied date has no column of its own, so it leads the metadata line */}
        <span className="mt-0.5 truncate text-xs text-muted-foreground sm:hidden">
          {[appliedLabel, ...meta].join(' · ')}
        </span>
        {meta.length > 0 && (
          <span className="mt-0.5 hidden truncate text-xs text-muted-foreground sm:block">
            {meta.join(' · ')}
          </span>
        )}
      </button>

      <span className="hidden shrink-0 text-right text-xs whitespace-nowrap text-muted-foreground tabular-nums sm:block">
        {application.appliedAt ? (
          <>
            Applied{' '}
            <time dateTime={application.appliedAt.toISOString().slice(0, 10)}>
              {formatDate(application.appliedAt)}
            </time>
          </>
        ) : (
          'Not applied yet'
        )}
      </span>

      <div className="shrink-0">
        <StatusSelect application={application} onChange={onStatusChange} />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            aria-label={`Actions for ${application.position} at ${application.company}`}
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="gap-2" onSelect={onEdit}>
            <Pencil className="size-4" />
            Edit
          </DropdownMenuItem>
          {application.jobUrl && (
            <DropdownMenuItem asChild className="gap-2">
              <a
                href={application.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-4" />
                Open job posting
              </a>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-2 text-error focus:text-error"
            onSelect={onDelete}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}

function ShortcutHint() {
  return (
    <kbd
      aria-hidden
      className="ml-1 hidden rounded-md bg-primary-foreground/20 px-1.5 font-sans text-[12px] font-bold sm:inline-block"
    >
      {NEW_APPLICATION_SHORTCUT}
    </kbd>
  );
}

const describeNoMatches = (
  status: ApplicationStatusValue | 'ALL',
  q: string,
) => {
  const query = q.trim();
  if (status !== 'ALL' && query) {
    return `No ${STATUS_LABELS[status].toLowerCase()} applications match “${query}”.`;
  }
  if (query) return `No applications match “${query}”.`;
  if (status !== 'ALL') {
    return `You have no applications marked ${STATUS_LABELS[status]}.`;
  }
  return 'No applications match your filters.';
};

export default function JobApplicationsBoard({
  applications,
}: {
  applications: JobApplication[];
}) {
  const router = useRouter();
  const {
    status,
    sort,
    searchInput,
    setSearch,
    setStatus,
    setSort,
    clearFilters,
  } = useDashboardFilters();

  // Status changes show immediately; once the transition ends this falls back to
  // `applications`, i.e. the fresh server data on success or the old status on failure
  const [optimisticApplications, setOptimisticStatus] = useOptimistic(
    applications,
    (
      current,
      change: { id: string; status: ApplicationStatusValue },
    ): JobApplication[] =>
      current.map((application) =>
        application.id === change.id
          ? { ...application, status: change.status }
          : application,
      ),
  );

  const [formState, setFormState] = useState<{
    open: boolean;
    application: JobApplication | null;
  }>({ open: false, application: null });
  const [deleteTarget, setDeleteTarget] = useState<JobApplication | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const counts = useMemo(() => {
    const byStatus = Object.fromEntries(
      APPLICATION_STATUSES.map((value) => [value, 0]),
    ) as Record<ApplicationStatusValue, number>;
    for (const application of optimisticApplications) {
      byStatus[application.status] += 1;
    }
    return byStatus;
  }, [optimisticApplications]);

  const visibleApplications = useMemo(() => {
    const normalizedQuery = searchInput.trim().toLowerCase();

    const filtered = optimisticApplications.filter((application) => {
      if (status !== 'ALL' && application.status !== status) return false;
      if (!normalizedQuery) return true;

      return [application.company, application.position, application.location]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedQuery));
    });

    return sortApplications(filtered, sort);
  }, [optimisticApplications, status, searchInput, sort]);

  const openCreateForm = useCallback(
    () => setFormState({ open: true, application: null }),
    [],
  );
  useNewApplicationShortcut(openCreateForm);

  // Runs inside the row's transition: the optimistic update must happen before the first await
  const changeStatus = async (
    application: JobApplication,
    nextStatus: ApplicationStatusValue,
  ) => {
    setOptimisticStatus({ id: application.id, status: nextStatus });

    let res: Awaited<ReturnType<typeof updateJobApplicationStatusAction>>;
    try {
      res = await updateJobApplicationStatusAction(application.id, nextStatus);
    } catch {
      toast.error(
        "Couldn't update the status. Check your connection and try again.",
      );
      return;
    }

    if ('error' in res) {
      toast.error(res.error);
      // e.g. the application was deleted in another tab: resync the list with the server
      router.refresh();
      return;
    }

    // Without this, a row that leaves the current filter would just vanish
    if (status !== 'ALL' && nextStatus !== status) {
      toast.success(
        `${application.company} moved to ${STATUS_LABELS[nextStatus]}`,
      );
    }
  };

  const hasFilters = status !== 'ALL' || searchInput.trim() !== '';
  const total = optimisticApplications.length;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-xl font-semibold focus:outline-hidden"
          >
            Applications
          </h1>
          <p className="text-sm text-muted-foreground">
            Every job you&apos;re tracking, from wishlist to offer.
          </p>
        </div>
        <Button
          onClick={openCreateForm}
          aria-keyshortcuts={NEW_APPLICATION_SHORTCUT}
          className="gap-1.5"
        >
          <Plus className="size-4" />
          Add application
          <ShortcutHint />
        </Button>
      </div>

      {total === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed px-6 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Briefcase className="size-6 text-muted-foreground" />
          </span>
          <div className="flex flex-col gap-1">
            <p className="font-medium">No applications yet</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Add the jobs you&apos;ve applied to, or ones you&apos;re eyeing,
              and keep their status, links and notes in one place.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={openCreateForm}
            className="gap-1.5"
          >
            <Plus className="size-4" />
            Add your first application
          </Button>
        </div>
      ) : (
        <>
          <SummaryStats total={total} counts={counts} />

          <div className="flex flex-col gap-3">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter by status"
            >
              <StatusFilterChip
                label="All"
                count={total}
                active={status === 'ALL'}
                onClick={() => setStatus('ALL')}
              />
              {APPLICATION_STATUSES.map((value) => (
                <StatusFilterChip
                  key={value}
                  label={STATUS_LABELS[value]}
                  count={counts[value]}
                  active={status === value}
                  onClick={() => setStatus(value)}
                />
              ))}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-sm">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  value={searchInput}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search company, position or location..."
                  aria-label="Search applications"
                  maxLength={MAX_SEARCH_LENGTH}
                  className="pl-9"
                />
              </div>
              <SortMenu sort={sort} onChange={setSort} />
            </div>
          </div>

          <p
            aria-live="polite"
            className={cn(
              'text-xs text-muted-foreground',
              (!hasFilters || visibleApplications.length === 0) && 'sr-only',
            )}
          >
            {`Showing ${visibleApplications.length} of ${total} ${total === 1 ? 'application' : 'applications'}`}
          </p>

          {visibleApplications.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed px-6 py-10 text-center">
              <p className="text-sm text-muted-foreground">
                {describeNoMatches(status, searchInput)}
              </p>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          ) : (
            <ul
              aria-label="Job applications"
              className="divide-y rounded-lg border bg-card text-card-foreground"
            >
              {visibleApplications.map((application) => (
                <ApplicationRow
                  key={application.id}
                  application={application}
                  onEdit={() => setFormState({ open: true, application })}
                  onDelete={() => setDeleteTarget(application)}
                  onStatusChange={(nextStatus) =>
                    changeStatus(application, nextStatus)
                  }
                />
              ))}
            </ul>
          )}
        </>
      )}

      <JobApplicationFormDialog
        open={formState.open}
        onOpenChange={(open) => setFormState((prev) => ({ ...prev, open }))}
        application={formState.application}
      />
      <DeleteJobApplicationDialog
        application={deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        // The row (and the menu that opened the dialog) is gone: move focus somewhere sensible
        onDeleted={() => headingRef.current?.focus()}
      />
    </div>
  );
}
