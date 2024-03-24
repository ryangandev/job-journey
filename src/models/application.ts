type JobType = "on_site" | "remote";

type JobStatus =
    | "applied"
    | "interviewing"
    | "offered"
    | "rejected"
    | "ghosted";

interface QA {
    question: string;
    answer: string;
}

interface Application {
    id: string;
    company: string;
    title: string;
    location: string;
    type: JobType;
    status: JobStatus;
    isFavorite: boolean;
    replied: boolean;
    interviewAquired: boolean;
    appliedAt: Date;
    updatedAt: Date;
}

interface ApplicationDetail extends Application {
    link: string;
    applicationQA: readonly QA[];
    updates: readonly string[];
}

export type { Application, ApplicationDetail, JobStatus, JobType, QA };
