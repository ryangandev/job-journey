// Dates are formatted in UTC: `appliedAt` is stored as a calendar date at UTC midnight,
// and formatting server and client in the same zone keeps hydration consistent.
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export const formatDate = (date: Date) => dateFormatter.format(date);

/** YYYY-MM-DD for <input type="date">. */
export const toDateInputValue = (date: Date | null) =>
  date ? date.toISOString().slice(0, 10) : '';
