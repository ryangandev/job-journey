'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  createJobApplicationAction,
  updateJobApplicationAction,
} from '@/actions/job-application-actions';
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

const errorTextClassName = 'text-xs text-error';
const invalidClassName =
  'aria-invalid:border-destructive dark:aria-invalid:border-red-400';
const selectClassName = cn(
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background',
  invalidClassName,
);

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

type FieldName = keyof JobApplicationFormInput;

function Field({
  label,
  name,
  error,
  className,
  children,
}: {
  label: string;
  name: FieldName;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className={errorTextClassName}>
          {error}
        </p>
      )}
    </div>
  );
}

type DirtyCheck = () => boolean;

function JobApplicationForm({
  application,
  onSaved,
  onCancel,
  onSubmittingChange,
  registerDirtyCheck,
}: {
  application?: JobApplication | null;
  onSaved: () => void;
  onCancel: () => void;
  onSubmittingChange: (isSubmitting: boolean) => void;
  registerDirtyCheck: (check: DirtyCheck | null) => void;
}) {
  const [errorMsg, setErrorMsg] = useState<string>();
  const [defaultValues] = useState(() => toFormValues(application));
  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<JobApplicationFormInput, unknown, JobApplicationFormInput>({
    resolver: zodResolver(JobApplicationSchema, undefined, { raw: true }),
    defaultValues,
  });

  // The dialog asks at close time whether anything changed. Reading the live values (rather than
  // a reported `isDirty`) means an Escape pressed right after typing can't slip past the guard.
  useEffect(() => {
    registerDirtyCheck(() => {
      const values = getValues();
      return (Object.keys(defaultValues) as FieldName[]).some(
        (name) => values[name] !== defaultValues[name],
      );
    });
    return () => registerDirtyCheck(null);
  }, [defaultValues, getValues, registerDirtyCheck]);

  // ...and closing is blocked while saving
  useEffect(() => {
    onSubmittingChange(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);
  useEffect(() => () => onSubmittingChange(false), [onSubmittingChange]);

  const fieldProps = (name: FieldName) => ({
    id: name,
    ...register(name),
    disabled: isSubmitting,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  // Submit the raw form values: the server action parses them again with the same schema
  const onSubmit = async (values: JobApplicationFormInput) => {
    setErrorMsg(undefined);

    let res: Awaited<ReturnType<typeof createJobApplicationAction>>;
    try {
      res = application
        ? await updateJobApplicationAction(application.id, values)
        : await createJobApplicationAction(values);
    } catch {
      setErrorMsg("Couldn't save. Check your connection and try again.");
      return;
    }

    if ('error' in res) {
      setErrorMsg(res.error);
      return;
    }

    toast.success(application ? 'Application updated' : 'Application added');
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company" name="company" error={errors.company?.message}>
          <Input
            {...fieldProps('company')}
            placeholder="Acme Inc."
            autoComplete="organization"
            className={invalidClassName}
          />
        </Field>
        <Field
          label="Position"
          name="position"
          error={errors.position?.message}
        >
          <Input
            {...fieldProps('position')}
            placeholder="Frontend Engineer"
            autoComplete="organization-title"
            className={invalidClassName}
          />
        </Field>
        <Field label="Status" name="status" error={errors.status?.message}>
          <select {...fieldProps('status')} className={selectClassName}>
            {APPLICATION_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Date applied"
          name="appliedAt"
          error={errors.appliedAt?.message}
        >
          <Input
            {...fieldProps('appliedAt')}
            type="date"
            className={invalidClassName}
          />
        </Field>
        <Field
          label="Location"
          name="location"
          error={errors.location?.message}
        >
          <Input
            {...fieldProps('location')}
            placeholder="San Francisco, CA"
            className={invalidClassName}
          />
        </Field>
        <Field
          label="Work mode"
          name="workMode"
          error={errors.workMode?.message}
        >
          <select {...fieldProps('workMode')} className={selectClassName}>
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
          name="jobUrl"
          error={errors.jobUrl?.message}
        >
          <Input
            {...fieldProps('jobUrl')}
            type="url"
            inputMode="url"
            placeholder="https://..."
            className={invalidClassName}
          />
        </Field>
        <Field label="Salary" name="salary" error={errors.salary?.message}>
          <Input
            {...fieldProps('salary')}
            placeholder="$120k - $140k"
            className={invalidClassName}
          />
        </Field>
      </div>

      <Field label="Notes" name="notes" error={errors.notes?.message}>
        <Textarea
          {...fieldProps('notes')}
          placeholder="Recruiter name, interview dates, anything worth remembering..."
          rows={4}
          className={invalidClassName}
        />
      </Field>

      {errorMsg && (
        <p role="alert" className={errorTextClassName}>
          {errorMsg}
        </p>
      )}

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
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

function DiscardChangesDialog({
  open,
  onKeepEditing,
  onDiscard,
}: {
  open: boolean;
  onKeepEditing: () => void;
  onDiscard: () => void;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onKeepEditing();
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Discard changes?</DialogTitle>
          <DialogDescription>
            You have unsaved changes. If you close the form now, they&apos;ll be
            lost.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onKeepEditing}>
            Keep editing
          </Button>
          <Button variant="destructive" onClick={onDiscard}>
            Discard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dirtyCheckRef = useRef<DirtyCheck | null>(null);
  const registerDirtyCheck = useCallback((check: DirtyCheck | null) => {
    dirtyCheckRef.current = check;
  }, []);

  // Escape, a click outside, the close button and Cancel all come through here
  const requestClose = () => {
    if (isSubmitting) return;
    if (dirtyCheckRef.current?.()) {
      setConfirmOpen(true);
      return;
    }
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => (next ? onOpenChange(true) : requestClose())}
    >
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
          onSaved={() => onOpenChange(false)}
          onCancel={requestClose}
          onSubmittingChange={setIsSubmitting}
          registerDirtyCheck={registerDirtyCheck}
        />
        <DiscardChangesDialog
          open={confirmOpen}
          onKeepEditing={() => setConfirmOpen(false)}
          onDiscard={() => {
            setConfirmOpen(false);
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
