import {
    JobSetting,
    JobType,
    JobLevel,
    QA,
    Update,
} from "../models/application";

interface ApplicationForm {
    title: string;
    company: string;
    location: string;
    setting: JobSetting;
    type: JobType;
    level: JobLevel;
    salary: string;
    link: string;
    applicationQA: QA[];
    updates: Update[];
    isFavorite: boolean;
}

interface ApplicationFormQuestion {
    key: string;
    question: string;
    placeholder?: string;
    type: "input" | "select" | "checkbox" | "multi-QA";
    options?: string[];
}

const applicationFormQuestions: ApplicationFormQuestion[] = [
    {
        key: "title",
        question: "What is the job title you are applying for?",
        placeholder: "Eg. Frontend Developer",
        type: "input",
    },
    {
        key: "company",
        question: "What is the company name?",
        placeholder: "Eg. Apple Inc.",
        type: "input",
    },
    {
        key: "location",
        question: "What is the job location?",
        placeholder: "Eg. San Francisco, CA",
        type: "input",
    },
    {
        key: "setting",
        question: "What is the work setting?",
        type: "select",
        options: ["on_site", "remote", "hybrid"],
    },
    {
        key: "type",
        question: "What is the job type?",
        type: "select",
        options: ["full_time", "part_time", "contract", "freelance"],
    },
    {
        key: "level",
        question: "What is the job level?",
        type: "select",
        options: [
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
        ],
    },
    {
        key: "salary",
        question: "What is the salary range?",
        placeholder: "Eg. $100,000 - $120,000 per year",
        type: "input",
    },
    {
        key: "link",
        question: "What is the job posting link?",
        placeholder: "Eg. https://www.apple.com/jobs/...",
        type: "input",
    },
    {
        key: "updates",
        question: "Any updates?",
        placeholder: "Eg. Application submitted through LinkedIn.",
        type: "input",
    },
    {
        key: "isFavorite",
        question: "Add to favorite?",
        type: "checkbox",
        options: ["yes", "no"],
    },
];

export { applicationFormQuestions };
export type { ApplicationForm, ApplicationFormQuestion };
