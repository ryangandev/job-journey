function dateToTwoDigitsString(date: Date): string {
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
}

export { dateToTwoDigitsString };
