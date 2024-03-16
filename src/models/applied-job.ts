type JobStatus =
    | "applied"
    | "interviewing"
    | "offered"
    | "rejected"
    | "ghosted";

interface AppliedJob {
    id: string;
    title: string;
    company: string;
    location: string;
    remote: boolean;
    status: JobStatus;
    replied: boolean;
    link: string;
    updates: string[];
    appliedAt: Date;
    updatedAt: Date;
}
