import React from 'react';

export default function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="h-0.5 w-full bg-black/20 dark:bg-white/20"></div>
      <span className="text-sm text-light-200 dark:text-dark-200">{label}</span>
      <div className="h-0.5 w-full bg-black/20 dark:bg-white/20"></div>
    </div>
  );
}
