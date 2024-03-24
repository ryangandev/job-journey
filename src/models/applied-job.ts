type JobType = "on_site" | "remote";

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
    replied: boolean;
    interviewAquired: boolean;
    appliedAt: Date;
    updatedAt: Date;
}

interface AppliedJobDetail extends AppliedJob {
    link: string;
    applicationQA: readonly QuestionAndAnswer[];
    updates: readonly string[];
}

export type {
    AppliedJob,
    AppliedJobDetail,
    JobStatus,
    JobType,
    QuestionAndAnswer,
};
