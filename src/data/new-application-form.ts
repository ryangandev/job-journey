import { JobSetting, JobType, JobLevel } from "../models/application";

interface ApplicationForm {
    title: string;
    company: string;
    location: string;
    setting: JobSetting;
    type: JobType;
    level: JobLevel;
    salary: string;
    link: string;
    updates: string;
    isFavorite: boolean;
}

interface ApplicationFormQuestion {
    key:
        | "title"
        | "company"
        | "location"
        | "setting"
        | "type"
        | "level"
        | "salary"
        | "link"
        | "updates"
        | "isFavorite";
    question: string;
    type: "input" | "select" | "checkbox";
    required: boolean;
    placeholder?: string;
    options?: string[];
}

type InputQuestion =
    | "title"
    | "company"
    | "location"
    | "salary"
    | "link"
    | "updates";
type SelectQuestion = "setting" | "type" | "level";
type CheckboxQuestion = "isFavorite";

const applicationFormQuestions: ApplicationFormQuestion[] = [
    {
        key: "title",
        question: "What is the job title you are applying for?",
        type: "input",
        required: true,
        placeholder: "Eg. Frontend Developer",
    },
    {
        key: "company",
        question: "What is the company name?",
        type: "input",
        required: true,
        placeholder: "Eg. Apple Inc.",
    },
    {
        key: "location",
        question: "What is the job location?",
        type: "input",
        required: true,
        placeholder: "Eg. San Francisco, CA",
    },
    {
        key: "setting",
        question: "What is the work setting?",
        type: "select",
        required: true,
        options: ["on_site", "remote", "hybrid"],
    },
    {
        key: "type",
        question: "What is the job type?",
        type: "select",
        required: true,
        options: ["full_time", "part_time", "contract", "freelance"],
    },
    {
        key: "level",
        question: "What is the job level?",
        type: "select",
        required: true,
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
        type: "input",
        required: false,
        placeholder: "Eg. $100,000 - $120,000 per year",
    },
    {
        key: "link",
        question: "What is the job posting link?",
        type: "input",
        required: true,
        placeholder: "Eg. https://www.apple.com/jobs/...",
    },
    {
        key: "updates",
        question: "Any updates?",
        type: "input",
        required: false,
        placeholder: "Eg. If no updates, press Enter or click Next",
    },
    {
        key: "isFavorite",
        question: "Add to favorite?",
        type: "checkbox",
        required: false,
        placeholder: "Add to favorite",
    },
];

export { applicationFormQuestions };
export type {
    ApplicationForm,
    ApplicationFormQuestion,
    InputQuestion,
    SelectQuestion,
    CheckboxQuestion,
};
