'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { deleteJobApplicationAction } from '@/actions/job-application-actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { JobApplication } from '@/generated/prisma/client';

export default function DeleteJobApplicationDialog({
  application,
  onOpenChange,
}: {
  application: JobApplication | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [isDeleting, startDelete] = useTransition();

  const handleDelete = () => {
    if (!application) return;

    startDelete(async () => {
      const res = await deleteJobApplicationAction(application.id);

      if ('error' in res) {
        toast.error(res.error);
        return;
      }

      toast.success('Application deleted');
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={!!application} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete application?</DialogTitle>
          <DialogDescription>
            {application
              ? `${application.position} at ${application.company} will be permanently deleted.`
              : null}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
