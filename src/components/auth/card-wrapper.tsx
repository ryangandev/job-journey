import { Card, cn } from '@nextui-org/react';

type CardWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export default function CardWrapper({ children, className }: CardWrapperProps) {
  return (
    <Card
      className={cn(
        'w-full max-w-md p-6 shadow-none md:shadow-medium',
        className,
      )}
    >
      {children}
    </Card>
  );
}
