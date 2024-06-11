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
                regex.test(part) ? (
                    <span key={index} className="bg-orange-300">
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
