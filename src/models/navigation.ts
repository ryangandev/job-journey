type NavbarSection =
    | "Home"
    | "Dashboard"
    | "Digital Profile"
    | "Interview Prep"
    | "Goal Tracker";

interface NavbarLink {
    name: NavbarSection;
    url: string;
}

export type { NavbarSection, NavbarLink };
