import { JobSetting, JobType, JobLevel } from "../models/application";
import { levelOptions, settingOptions, typeOptions } from "./application";

interface ApplicationForm {
    userId: string;
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
        options: settingOptions,
    },
    {
        key: "type",
        question: "What is the job type?",
        type: "select",
        required: true,
        options: typeOptions,
    },
    {
        key: "level",
        question: "What is the job level?",
        type: "select",
        required: true,
        options: levelOptions,
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

const applicationFormTemplate: ApplicationForm = {
    userId: "",
    title: "",
    company: "",
    location: "",
    setting: "on_site",
    type: "full_time",
    level: "junior",
    salary: "",
    link: "",
    updates: "",
    isFavorite: false,
};

export { applicationFormQuestions, applicationFormTemplate };
export type {
    ApplicationForm,
    ApplicationFormQuestion,
    InputQuestion,
    SelectQuestion,
    CheckboxQuestion,
};
