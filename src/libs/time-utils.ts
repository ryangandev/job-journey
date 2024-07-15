function dateToTwoDigitsString(date: Date): string {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
}

function timeElapsed(past: Date) {
  const now = new Date();
  const elapsed = now.getTime() - past.getTime();

  const secondsElapsed = Math.floor(elapsed / 1000);
  const minutesElapsed = Math.floor(secondsElapsed / 60);
  const hoursElapsed = Math.floor(minutesElapsed / 60);
  const daysElapsed = Math.floor(hoursElapsed / 24);
  const monthsElapsed = Math.floor(daysElapsed / 30);
  const yearsElapsed = Math.floor(monthsElapsed / 12);

  if (minutesElapsed < 1) {
    return 'Just now';
  } else if (minutesElapsed < 60) {
    return minutesElapsed > 1
      ? `${minutesElapsed} minutes ago`
      : '1 minute ago';
  } else if (hoursElapsed < 24) {
    return hoursElapsed > 1 ? `${hoursElapsed} hours ago` : '1 hour ago';
  } else if (daysElapsed < 30) {
    return daysElapsed > 1 ? `${daysElapsed} days ago` : '1 day ago';
  } else if (monthsElapsed < 12) {
    return monthsElapsed > 1 ? `${monthsElapsed} months ago` : '1 month ago';
  } else {
    return yearsElapsed > 1 ? `${yearsElapsed} years ago` : '1 year ago';
  }
}

export { dateToTwoDigitsString, timeElapsed };
