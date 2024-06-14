type NavbarSectionName =
    | "Home"
    | "Dashboard"
    | "Digital Profile"
    | "Interview Prep"
    | "Goal Tracker";

type NavbarLink = {
    name: NavbarSectionName;
    url: string;
};

export type { NavbarSectionName, NavbarLink };
