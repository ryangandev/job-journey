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
        name: "COMPANY",
        uid: "company",
        width: 175,
        sortable: true,
    },
    {
        name: "TITLE",
        uid: "title",
        width: 300,
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
    { name: "Applied", uid: "applied" },
    { name: "Interviewing", uid: "interviewing" },
    { name: "Offered", uid: "offered" },
    { name: "Rejected", uid: "rejected" },
    { name: "Ghosted", uid: "ghosted" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
    applied: "warning",
    interviewing: "secondary",
    offered: "success",
    rejected: "danger",
    ghosted: "default",
};

const jobTypeMap: Record<string, string> = {
    on_site: "on-site",
    remote: "remote",
};

export { columns, statusOptions, statusColorMap, jobTypeMap };
export type { Column };
