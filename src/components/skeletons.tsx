import React from 'react';
import { Divider, Skeleton } from '@nextui-org/react';

export function ApplicationInfoSkeleton() {
  return (
    <div className="flex w-full max-w-[48rem] flex-col space-y-6">
      <div className="flex h-9 w-full justify-between">
        <Skeleton className="w-2/5 rounded-lg" />
        <Skeleton className="w-1/6 rounded-lg" />
      </div>
      <div className="flex h-7 w-full justify-between">
        <div className="flex h-full w-3/5 space-x-2">
          <Skeleton className="w-1/2 rounded-lg" />
          <Divider className="my-auto h-5" orientation="vertical" />
          <Skeleton className="w-1/2 rounded-lg" />
        </div>
        <Skeleton className="w-1/5 rounded-lg" />
      </div>
      <div className="flex h-6 w-full justify-between">
        <Skeleton className="w-2/5 rounded-lg" />
        <Skeleton className="w-1/4 rounded-lg" />
      </div>
      <div className="flex h-7 w-full justify-center space-x-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="w-1/8 rounded-full" />
        ))}
      </div>
      <div className="flex w-full flex-col space-y-2">
        <Skeleton className="h-6 w-1/5 rounded-lg" />
        <Skeleton className="h-6 w-4/5 rounded-lg" />
      </div>
      <div className="flex w-full flex-col space-y-2">
        <Skeleton className="h-8 w-1/5 rounded-lg" />
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-4/5 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export function NewApplicationFormSkeleton() {
  return (
    <div className="flex w-full max-w-[36rem] flex-col space-y-12">
      <div className="flex w-full flex-col space-y-4">
        <Skeleton className="h-7 w-4/5 rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
        <div className="flex flex-row items-center justify-between">
          <Skeleton className="h-10 w-24 rounded-lg" />
          <div className="flex flex-row items-center space-x-4">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col space-y-4">
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
    </div>
  );
}
