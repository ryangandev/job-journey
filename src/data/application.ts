import { ChipProps } from "@nextui-org/chip";

interface Column {
    name: string;
    uid: string;
    width?: number;
    sortable?: boolean;
}

const columns: Column[] = [
    {
        name: "ID",
        uid: "id",
        sortable: true,
    },
    {
        name: "Fav",
        uid: "isFavorite",
        width: 50,
        sortable: true,
    },
    {
        name: "TITLE",
        uid: "title",
        width: 300,
        sortable: true,
    },
    {
        name: "COMPANY",
        uid: "company",
        width: 175,
        sortable: true,
    },
    {
        name: "STATUS",
        uid: "status",
        width: 150,
        sortable: true,
    },
    {
        name: "REPLIED",
        uid: "replied",
        width: 100,
        sortable: true,
    },
    {
        name: "INTERVIEW",
        uid: "interviewAquired",
        width: 100,
        sortable: true,
    },
    {
        name: "UPDATES",
        uid: "updates",
    },
    {
        name: "APPLIED",
        uid: "appliedAt",
        width: 100,
        sortable: true,
    },
    {
        name: "UPDATED",
        uid: "updatedAt",
        width: 100,
        sortable: true,
    },
    {
        name: "ACTIONS",
        uid: "actions",
        width: 80,
    },
] as const; // const assertion to infer the type as readonly

const statusOptions = [
    "applied",
    "interviewing",
    "offered",
    "rejected",
    "ghosted",
];

const settingOptions = ["on_site", "remote", "hybrid"];

const typeOptions = ["full_time", "part_time", "contract", "freelance"];

const levelOptions = [
    "intern",
    "entry",
    "junior",
    "associate",
    "mid",
    "mid_senior",
    "senior",
    "lead",
    "manager",
    "director",
    "executive",
];

const repliedOptions = ["Replied", "No Reply"];

const interviewAquiredOptions = ["Interview Aquired", "No Interview"];

const statusColorMap: Record<string, ChipProps["color"]> = {
    applied: "warning",
    interviewing: "secondary",
    offered: "success",
    rejected: "danger",
    ghosted: "default",
};

const repliedColorMap: Record<string, ChipProps["color"]> = {
    Replied: "secondary",
    "No Reply": "default",
};

const interviewColorMap: Record<string, ChipProps["color"]> = {
    "Interview Aquired": "success",
    "No Interview": "default",
};

const jobStatusMap: Record<string, string> = {
    applied: "Applied",
    interviewing: "Interviewing",
    offered: "Offered",
    rejected: "Rejected",
    ghosted: "Ghosted",
};

const jobSettingMap: Record<string, string> = {
    on_site: "On-site",
    remote: "Remote",
    hybrid: "Hybrid",
};

const jobTypeMap: Record<string, string> = {
    full_time: "Full-time",
    part_time: "Part-time",
    contract: "Contract",
    freelance: "Freelance",
};

const jobLevelMap: Record<string, string> = {
    intern: "Intern",
    entry: "Entry Level",
    junior: "Junior",
    associate: "Associate",
    mid: "Mid Level",
    mid_senior: "Mid-Senior Level",
    senior: "Senior Level",
    lead: "Lead",
    manager: "Manager",
    director: "Director",
    executive: "Executive",
};

export {
    columns,
    statusOptions,
    settingOptions,
    typeOptions,
    levelOptions,
    repliedOptions,
    interviewAquiredOptions,
    statusColorMap,
    repliedColorMap,
    interviewColorMap,
    jobStatusMap,
    jobSettingMap,
    jobTypeMap,
    jobLevelMap,
};
export type { Column };
