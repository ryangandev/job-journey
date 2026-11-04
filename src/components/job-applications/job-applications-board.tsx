'use client';

import {
  Briefcase,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { useMemo, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { updateJobApplicationStatusAction } from '@/actions/job-application-actions';
import DeleteJobApplicationDialog from '@/components/job-applications/delete-job-application-dialog';
import { formatDate } from '@/components/job-applications/format';
import JobApplicationFormDialog from '@/components/job-applications/job-application-form-dialog';
import StatusBadge from '@/components/job-applications/status-badge';
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
import type { JobApplication } from '@/generated/prisma/client';
import {
  APPLICATION_STATUSES,
  STATUS_LABELS,
  WORK_MODE_LABELS,
  type ApplicationStatusValue,
} from '@/lib/job-applications';
import { cn } from '@/lib/utils';

type StatusFilter = 'ALL' | ApplicationStatusValue;

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
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'bg-background text-muted-foreground hover:text-foreground',
      )}
    >
      {label}
      <span className={cn('tabular-nums', !active && 'text-foreground/60')}>
        {count}
      </span>
    </button>
  );
}

function StatusSelect({ application }: { application: JobApplication }) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (status: string) => {
    if (status === application.status) return;

    startTransition(async () => {
      const res = await updateJobApplicationStatusAction(
        application.id,
        status,
      );
      if ('error' in res) toast.error(res.error);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isPending}
        aria-label={`Status: ${STATUS_LABELS[application.status]}. Change status`}
        className="rounded-md focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:opacity-50"
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

function ApplicationRow({
  application,
  onEdit,
  onDelete,
}: {
  application: JobApplication;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const meta = [
    application.location,
    application.workMode && WORK_MODE_LABELS[application.workMode],
    application.salary,
  ].filter(Boolean);

  return (
    <li className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50">
      <button
        type="button"
        onClick={onEdit}
        className="flex min-w-0 flex-1 flex-col items-start text-left focus-visible:outline-hidden"
      >
        <span className="truncate text-sm font-semibold">
          {application.company}
        </span>
        <span className="truncate text-sm text-muted-foreground">
          {application.position}
        </span>
        {meta.length > 0 && (
          <span className="mt-0.5 truncate text-xs text-muted-foreground">
            {meta.join(' · ')}
          </span>
        )}
      </button>

      <span className="hidden w-28 shrink-0 text-right text-xs text-muted-foreground sm:block">
        {application.appliedAt
          ? `Applied ${formatDate(application.appliedAt)}`
          : 'Not applied yet'}
      </span>

      <div className="shrink-0">
        <StatusSelect application={application} />
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
            className="gap-2 text-destructive focus:text-destructive"
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

export default function JobApplicationsBoard({
  applications,
}: {
  applications: JobApplication[];
}) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [query, setQuery] = useState('');
  const [formState, setFormState] = useState<{
    open: boolean;
    application: JobApplication | null;
  }>({ open: false, application: null });
  const [deleteTarget, setDeleteTarget] = useState<JobApplication | null>(null);

  const counts = useMemo(() => {
    const byStatus = Object.fromEntries(
      APPLICATION_STATUSES.map((status) => [status, 0]),
    ) as Record<ApplicationStatusValue, number>;
    for (const application of applications) byStatus[application.status] += 1;
    return byStatus;
  }, [applications]);

  const filteredApplications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return applications.filter((application) => {
      if (statusFilter !== 'ALL' && application.status !== statusFilter) {
        return false;
      }
      if (!normalizedQuery) return true;

      return [application.company, application.position, application.location]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedQuery));
    });
  }, [applications, statusFilter, query]);

  const openCreateForm = () => setFormState({ open: true, application: null });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Applications</h1>
          <p className="text-sm text-muted-foreground">
            {applications.length === 1
              ? '1 application tracked'
              : `${applications.length} applications tracked`}
          </p>
        </div>
        <Button onClick={openCreateForm} className="gap-1.5">
          <Plus className="size-4" />
          Add application
        </Button>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed px-6 py-16 text-center">
          <Briefcase className="size-8 text-muted-foreground" />
          <div>
            <p className="font-medium">No applications yet</p>
            <p className="text-sm text-muted-foreground">
              Add the first job you applied to, or one you&apos;re eyeing.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={openCreateForm}
            className="gap-1.5"
          >
            <Plus className="size-4" />
            Add application
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter by status"
            >
              <StatusFilterChip
                label="All"
                count={applications.length}
                active={statusFilter === 'ALL'}
                onClick={() => setStatusFilter('ALL')}
              />
              {APPLICATION_STATUSES.map((status) => (
                <StatusFilterChip
                  key={status}
                  label={STATUS_LABELS[status]}
                  count={counts[status]}
                  active={statusFilter === status}
                  onClick={() => setStatusFilter(status)}
                />
              ))}
            </div>
            <div className="relative max-w-sm">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search company, position or location..."
                aria-label="Search applications"
                className="pl-9"
              />
            </div>
          </div>

          {filteredApplications.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed px-6 py-10 text-center">
              <p className="text-sm text-muted-foreground">
                No applications match your filters.
              </p>
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  setStatusFilter('ALL');
                  setQuery('');
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <ul className="divide-y rounded-lg border bg-background">
              {filteredApplications.map((application) => (
                <ApplicationRow
                  key={application.id}
                  application={application}
                  onEdit={() => setFormState({ open: true, application })}
                  onDelete={() => setDeleteTarget(application)}
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
      />
    </div>
  );
}
