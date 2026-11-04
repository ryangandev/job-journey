'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  useEffect,
  useMemo,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';

import {
  DEFAULT_FILTERS,
  MAX_SEARCH_LENGTH,
  parseDashboardFilters,
  toDashboardSearch,
  type DashboardFilters,
  type SortValue,
  type StatusFilter,
} from '@/lib/job-applications';

const SEARCH_DEBOUNCE_MS = 300;

/**
 * Status, search and sort for the dashboard, kept in the query string
 * (e.g. `?status=INTERVIEWING&q=acme&sort=applied`) so a refresh or a shared link keeps them.
 */
export default function useDashboardFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlFilters = useMemo(
    () => parseDashboardFilters(searchParams),
    [searchParams],
  );

  // `router.replace` only updates `useSearchParams` once the navigation commits;
  // show the new filters right away in the meantime
  const [filters, setOptimisticFilters] = useOptimistic(urlFilters);
  const [, startTransition] = useTransition();

  // Lets the debounced search write the latest status / sort, not the ones it was scheduled with
  const latestFilters = useRef(filters);
  useEffect(() => {
    latestFilters.current = filters;
  });

  const replaceFilters = (patch: Partial<DashboardFilters>) => {
    const next = { ...latestFilters.current, ...patch };
    latestFilters.current = next;

    startTransition(() => {
      setOptimisticFilters(next);
      router.replace(`${pathname}${toDashboardSearch(next)}`, {
        scroll: false,
      });
    });
  };

  // The search box filters the list as you type; the URL follows once typing pauses
  const [searchInput, setSearchInput] = useState(urlFilters.q);
  const [writtenQuery, setWrittenQuery] = useState(urlFilters.q);
  const [seenUrlQuery, setSeenUrlQuery] = useState(urlFilters.q);

  if (urlFilters.q !== seenUrlQuery) {
    setSeenUrlQuery(urlFilters.q);
    // The query changed from outside (e.g. the sidebar's Dashboard link): show it in the box
    if (urlFilters.q !== writtenQuery) setSearchInput(urlFilters.q);
  }

  const writeQuery = useDebouncedCallback((value: string) => {
    const q = value.trim().slice(0, MAX_SEARCH_LENGTH);
    setWrittenQuery(q);
    if (q !== latestFilters.current.q) replaceFilters({ q });
  }, SEARCH_DEBOUNCE_MS);

  const setSearch = (value: string) => {
    setSearchInput(value);
    writeQuery(value);
  };

  const setStatus = (status: StatusFilter) => {
    if (status !== latestFilters.current.status) replaceFilters({ status });
  };

  const setSort = (sort: SortValue) => {
    if (sort !== latestFilters.current.sort) replaceFilters({ sort });
  };

  /** Clears the status and the search; the sort order is a preference, so it stays. */
  const clearFilters = () => {
    writeQuery.cancel();
    setSearchInput('');
    setWrittenQuery('');
    replaceFilters({ status: DEFAULT_FILTERS.status, q: '' });
  };

  return {
    status: filters.status,
    sort: filters.sort,
    searchInput,
    setSearch,
    setStatus,
    setSort,
    clearFilters,
  };
}
