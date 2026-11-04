import { cn } from '@/lib/utils';

/** Heading block shared by the landing subpages. */
export default function PageIntro({
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn('flex flex-col items-start gap-4', className)}>
      {eyebrow && (
        <p className="text-sm font-semibold text-muted-foreground">{eyebrow}</p>
      )}
      <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
