'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  createJobApplicationAction,
  updateJobApplicationAction,
} from '@/actions/job-application-actions';
import { AuthErrorMessage } from '@/components/auth/auth-components';
import { toDateInputValue } from '@/components/job-applications/format';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { JobApplication } from '@/generated/prisma/client';
import {
  APPLICATION_STATUSES,
  STATUS_LABELS,
  WORK_MODES,
  WORK_MODE_LABELS,
} from '@/lib/job-applications';
import { cn } from '@/lib/utils';
import {
  JobApplicationSchema,
  type JobApplicationFormInput,
} from '@/schemas/job-application-schema';

const selectClassName =
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50';

const toFormValues = (
  application?: JobApplication | null,
): JobApplicationFormInput => ({
  company: application?.company ?? '',
  position: application?.position ?? '',
  status: application?.status ?? 'APPLIED',
  location: application?.location ?? '',
  workMode: application?.workMode ?? '',
  jobUrl: application?.jobUrl ?? '',
  salary: application?.salary ?? '',
  appliedAt: application
    ? toDateInputValue(application.appliedAt)
    : toDateInputValue(new Date()),
  notes: application?.notes ?? '',
});

function Field({
  label,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
      <AuthErrorMessage message={error} className="mt-0" />
    </div>
  );
}

function JobApplicationForm({
  application,
  onDone,
}: {
  application?: JobApplication | null;
  onDone: () => void;
}) {
  const [errorMsg, setErrorMsg] = useState<string>();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<JobApplicationFormInput, unknown, JobApplicationFormInput>({
    resolver: zodResolver(JobApplicationSchema, undefined, { raw: true }),
    defaultValues: toFormValues(application),
  });

  // Submit the raw form values: the server action parses them again with the same schema
  const onSubmit = async (values: JobApplicationFormInput) => {
    setErrorMsg(undefined);

    const res = application
      ? await updateJobApplicationAction(application.id, values)
      : await createJobApplicationAction(values);

    if ('error' in res) {
      setErrorMsg(res.error);
      return;
    }

    toast.success(application ? 'Application updated' : 'Application added');
    onDone();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Company"
          htmlFor="company"
          error={errors.company?.message}
        >
          <Input
            id="company"
            {...register('company')}
            placeholder="Acme Inc."
            autoFocus
            disabled={isSubmitting}
          />
        </Field>
        <Field
          label="Position"
          htmlFor="position"
          error={errors.position?.message}
        >
          <Input
            id="position"
            {...register('position')}
            placeholder="Frontend Engineer"
            disabled={isSubmitting}
          />
        </Field>
        <Field label="Status" htmlFor="status" error={errors.status?.message}>
          <select
            id="status"
            {...register('status')}
            className={selectClassName}
            disabled={isSubmitting}
          >
            {APPLICATION_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Date applied"
          htmlFor="appliedAt"
          error={errors.appliedAt?.message}
        >
          <Input
            id="appliedAt"
            type="date"
            {...register('appliedAt')}
            disabled={isSubmitting}
          />
        </Field>
        <Field
          label="Location"
          htmlFor="location"
          error={errors.location?.message}
        >
          <Input
            id="location"
            {...register('location')}
            placeholder="San Francisco, CA"
            disabled={isSubmitting}
          />
        </Field>
        <Field
          label="Work mode"
          htmlFor="workMode"
          error={errors.workMode?.message}
        >
          <select
            id="workMode"
            {...register('workMode')}
            className={selectClassName}
            disabled={isSubmitting}
          >
            <option value="">Not specified</option>
            {WORK_MODES.map((mode) => (
              <option key={mode} value={mode}>
                {WORK_MODE_LABELS[mode]}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Job posting link"
          htmlFor="jobUrl"
          error={errors.jobUrl?.message}
        >
          <Input
            id="jobUrl"
            type="url"
            {...register('jobUrl')}
            placeholder="https://..."
            disabled={isSubmitting}
          />
        </Field>
        <Field label="Salary" htmlFor="salary" error={errors.salary?.message}>
          <Input
            id="salary"
            {...register('salary')}
            placeholder="$120k - $140k"
            disabled={isSubmitting}
          />
        </Field>
      </div>

      <Field label="Notes" htmlFor="notes" error={errors.notes?.message}>
        <Textarea
          id="notes"
          {...register('notes')}
          placeholder="Recruiter name, interview dates, anything worth remembering..."
          rows={4}
          disabled={isSubmitting}
        />
      </Field>

      <AuthErrorMessage message={errorMsg} className="mt-0" />

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onDone}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {application ? 'Save changes' : 'Add application'}
        </Button>
      </DialogFooter>
    </form>
  );
}

/** Create (no `application`) or edit dialog for a job application. */
export default function JobApplicationFormDialog({
  open,
  onOpenChange,
  application,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application?: JobApplication | null;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {application ? 'Edit application' : 'Add application'}
          </DialogTitle>
          <DialogDescription>
            {application
              ? `${application.position} at ${application.company}`
              : 'Keep track of a job you applied to, or want to.'}
          </DialogDescription>
        </DialogHeader>
        {/* Keyed so the form resets whenever a different application is opened */}
        <JobApplicationForm
          key={application?.id ?? 'new'}
          application={application}
          onDone={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
