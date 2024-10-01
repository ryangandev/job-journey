import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getNavbarSectionPath = (path: string): string => {
  const trimmedPath = path.startsWith('/') ? path.slice(1) : path;
  const segments = trimmedPath.split('/');

  // If the path is "/", return it as is
  // Otherwise, return the first segment of the path
  return segments.length > 0 && segments[0] !== '' ? '/' + segments[0] : '/';
};
