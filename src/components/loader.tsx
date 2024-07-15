import React from 'react';
import { Card, Spinner } from '@nextui-org/react';

type LoadingProps = {
  label: string;
  showWrapper?: boolean;
};

export default function Loader({ label, showWrapper = true }: LoadingProps) {
  return (
    <>
      {showWrapper ? (
        <Card
          className="flex h-48 items-center justify-center rounded"
          shadow="sm"
        >
          <Spinner label={label} />
        </Card>
      ) : (
        <div className="flex h-48 items-center justify-center">
          <Spinner label={label} />
        </div>
      )}
    </>
  );
}
