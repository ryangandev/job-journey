type NavbarSection =
    | "Dashboard"
    | "Digital Profile"
    | "Interview Prep"
    | "Goal Tracker"
    | "Career Sites";

interface NavbarLink {
    name: NavbarSection;
    url: string;
}

export type { NavbarSection, NavbarLink };
