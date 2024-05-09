type NavbarSectionName =
    | "Home"
    | "Dashboard"
    | "Digital Profile"
    | "Interview Prep"
    | "Goal Tracker";

interface NavbarLink {
    name: NavbarSectionName;
    url: string;
}

export type { NavbarSectionName, NavbarLink };
