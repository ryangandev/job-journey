import { z } from 'zod';

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getNavbarSectionPath = (path: string): string => {
  const trimmedPath = path.startsWith('/') ? path.slice(1) : path;
  const segments = trimmedPath.split('/');

  // If the path is "/", return it as is
  // Otherwise, return the first segment of the path
  return segments.length > 0 && segments[0] !== '' ? '/' + segments[0] : '/';
};

export const trimmedStringSchema = (minLength: number, maxLength: number) => {
  return z
    .string()
    .trim()
    .min(minLength, { message: 'Must not be empty.' })
    .max(maxLength);
};

export const urlFormatter = (url: string) => {
  const linkedInJobBaseUrl = 'https://www.linkedin.com/jobs/view/';
  const trimmedUrl = url.trim();

  if (trimmedUrl.startsWith('https://www.linkedin.com')) {
    // Extract the job ID from the URL
    const jobIdMatch = trimmedUrl.match(/(?:view\/|currentJobId=)(\d+)/);
    if (jobIdMatch && jobIdMatch[1]) {
      return linkedInJobBaseUrl + jobIdMatch[1];
    }
  } else if (/^\d+$/.test(trimmedUrl)) {
    // If it's simply a numeric ID
    return linkedInJobBaseUrl + trimmedUrl;
  }

  // If it doesn't match any of the above conditions, return the original URL
  return trimmedUrl;
};
