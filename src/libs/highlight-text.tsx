const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
        return text;
    }

    const escapedHighlight = escapeRegExp(highlight);
    const regex = new RegExp(`(${escapedHighlight})`, "gi");
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, index) =>
                regex.test(part) &&
                part.toLowerCase() === highlight.toLowerCase() ? (
                    // TODO: later fix the bg not working with tailwind problem, use text-color temporarily
                    <span key={index} className="text-red-500 font-semibold">
                        {part}
                    </span>
                ) : (
                    part
                ),
            )}
        </>
    );
};

const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
};

export { highlightText, escapeRegExp };
