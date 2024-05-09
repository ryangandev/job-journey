function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getNavbarSectionPath(path: string): string {
    const trimmedPath = path.startsWith("/") ? path.slice(1) : path;
    const segments = trimmedPath.split("/");

    // If the path is "/", return it as is
    // Otherwise, return the first segment of the path
    return segments.length > 0 && segments[0] !== "" ? "/" + segments[0] : "/";
}

export { capitalize, getNavbarSectionPath };
