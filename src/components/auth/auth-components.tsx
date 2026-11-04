import { GrGlobe } from 'react-icons/gr';

import { cn } from '@/lib/utils';

/** Centered column with the logo: the frame shared by the auth pages, 404 and error pages. */
function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto my-auto flex h-[400px] w-[336px] flex-col items-center select-none">
      <GrGlobe size={48} className="mb-8 shrink-0" aria-hidden="true" />
      {children}
    </div>
  );
}

/**
 * Page heading for an auth step. `tabIndex={-1}` lets AuthStepTransition move focus here
 * after a step switch, so keyboard and screen reader users land at the top of the new step.
 */
function AuthHero({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      tabIndex={-1}
      className={cn(
        'mb-6 text-center text-2xl font-medium outline-none',
        className,
      )}
    >
      {children}
    </h1>
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

/** Underlined text link style used in auth footers (apply to a next-view-transitions `Link`). */
const authLinkClassName =
  'rounded-sm text-accent-foreground underline-offset-2 hover:underline focus-visible:underline focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none';

/** A text-styled `<button>` for in-page actions such as "Back to login". */
function AuthTextButton({
  className,
  type = 'button',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        'cursor-pointer rounded-sm transition-colors hover:text-accent-foreground focus-visible:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Inline error text. `role="alert"` makes screen readers announce it as soon as it appears.
 * The `--destructive` token is a background colour and is too dark to read as text on the
 * dark background, so dark mode uses a lighter red.
 */
function AuthErrorMessage({
  id,
  message,
  className,
}: {
  id?: string;
  message?: string;
  className?: string;
}) {
  if (!message) return null;

  return (
    <span
      id={id}
      role="alert"
      className={cn('mt-2 inline-block text-xs text-error', className)}
    >
      {message}
    </span>
  );
}

export {
  AuthContent,
  AuthErrorMessage,
  AuthFooter,
  AuthHero,
  AuthShell,
  AuthTextButton,
  authLinkClassName,
};
