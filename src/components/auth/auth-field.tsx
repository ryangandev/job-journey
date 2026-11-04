'use client';

import { useId } from 'react';

import { AuthErrorMessage } from '@/components/auth/auth-components';
import { Input, type InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

/**
 * An auth form input with an accessible name and its validation error wired up.
 * The label is visually hidden because the design relies on the placeholder, but
 * placeholders alone are not a reliable accessible name.
 * Spread react-hook-form's `register()` into it; the `ref` is forwarded to the input.
 */
export default function AuthField({
  label,
  error,
  id,
  className,
  ref,
  ...props
}: InputProps & {
  label: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <Input
        ref={ref}
        id={inputId}
        className={cn('h-12 placeholder:text-[13px]', className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      <AuthErrorMessage id={errorId} message={error} />
    </div>
  );
}
