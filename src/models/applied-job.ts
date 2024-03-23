type JobType = "on-site" | "remote";

type JobStatus =
    | "applied"
    | "interviewing"
    | "offered"
    | "rejected"
    | "ghosted";

interface QuestionAndAnswer {
    question: string;
    answer: string;
}

interface AppliedJob {
    id: string;
    company: string;
    title: string;
    location: string;
    remote: JobType;
    status: JobStatus;
    isFavorite: boolean;
    link: string;
    replied: boolean;
    interviewAquired: boolean;
    applicationQA: readonly QuestionAndAnswer[];
    updates: readonly string[];
    appliedAt: Date;
    updatedAt: Date;
}

export type { AppliedJob, JobStatus, JobType, QuestionAndAnswer };
