'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';
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
  onDeleted,
}: {
  application: JobApplication | null;
  onOpenChange: (open: boolean) => void;
  /** Called once the dialog has closed after a successful delete, in place of restoring focus. */
  onDeleted?: () => void;
}) {
  const router = useRouter();
  const [isDeleting, startDelete] = useTransition();
  const deletedRef = useRef(false);

  // Keep showing the last application while the dialog animates out
  const [shown, setShown] = useState(application);
  if (application && application !== shown) setShown(application);

  const handleOpenChange = (open: boolean) => {
    if (!open && isDeleting) return;
    onOpenChange(open);
  };

  const handleDelete = () => {
    if (!application) return;

    startDelete(async () => {
      let res: Awaited<ReturnType<typeof deleteJobApplicationAction>>;
      try {
        res = await deleteJobApplicationAction(application.id);
      } catch {
        toast.error("Couldn't delete it. Check your connection and try again.");
        return;
      }

      if ('error' in res) {
        toast.error(res.error);
        router.refresh();
        return;
      }

      toast.success('Application deleted');
      deletedRef.current = true;
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={!!application} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        onOpenAutoFocus={() => {
          deletedRef.current = false;
        }}
        onCloseAutoFocus={(event) => {
          if (!deletedRef.current) return;
          event.preventDefault();
          onDeleted?.();
        }}
      >
        <DialogHeader>
          <DialogTitle>Delete application?</DialogTitle>
          <DialogDescription>
            {shown
              ? `${shown.position} at ${shown.company} will be permanently deleted. This can't be undone.`
              : null}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
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
