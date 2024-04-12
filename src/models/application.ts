type JobSetting = "on_site" | "remote" | "hybrid";

type JobType = "full_time" | "part_time" | "contract" | "freelance";

type JobLevel =
    | "intern"
    | "entry"
    | "junior"
    | "associate"
    | "mid"
    | "mid_senior"
    | "senior"
    | "lead"
    | "manager"
    | "director"
    | "executive";

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

interface Update {
    date: Date;
    content: string;
}

interface Application {
    id: string;
    title: string;
    company: string;
    location: string;
    setting: JobSetting;
    type: JobType;
    level: JobLevel;
    status: JobStatus;
    isFavorite: boolean;
    replied: boolean;
    interviewAquired: boolean;
    appliedAt: Date;
    updatedAt: Date;
}

interface ApplicationDetail extends Application {
    salary: string;
    link: string;
    updates: readonly Update[];
}

export type {
    Application,
    ApplicationDetail,
    JobSetting,
    JobType,
    JobLevel,
    JobStatus,
    QA,
    Update,
};
