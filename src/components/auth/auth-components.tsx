import { cn } from '@/lib/utils';

function AuthHero({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn('mb-6 text-center text-2xl font-medium', className)}>
      {children}
    </h2>
  );
}

function AuthContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col space-y-[14px] pt-[14px]', className)}>
      {children}
    </div>
  );
}

function AuthFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mt-9 space-y-6 text-center text-[13px] text-muted-foreground',
        className,
      )}
    >
      {children}
    </div>
  );
}

function AuthErrorMessage({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <>
      {message && (
        <span
          className={cn(
            'mt-2 inline-block text-xs text-destructive',
            className,
          )}
        >
          {message}
        </span>
      )}
    </>
  );
}

export { AuthContent, AuthErrorMessage, AuthFooter, AuthHero };
