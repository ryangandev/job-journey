import { AppliedJob } from "../models/applied-job";

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
    { name: "Applied", uid: "applied" },
    { name: "Interviewing", uid: "interviewing" },
    { name: "Offered", uid: "offered" },
    { name: "Rejected", uid: "rejected" },
    { name: "Ghosted", uid: "ghosted" },
];

const appliedJobs: AppliedJob[] = [
    {
        id: "1",
        company: "Datadog",
        title: "Full-Stack Engineer - Demo Engineering",
        location: "Mountain View, CA",
        remote: "on-site",
        status: "rejected",
        link: "https://careers.datadoghq.com/detail/5326808/?gh_jid=5326808&gh_src=8363eca61",
        replied: true,
        interviewAquired: false,
        applicationQA: [],
        updates: ["Received an email rejection"],
        appliedAt: new Date("2023-10-29"),
        updatedAt: new Date("2023-11-01"),
    },
    {
        id: "2",
        company: "Vanguard",
        title: "Entry Level Application Engineer",
        location: "Malvern, PA",
        remote: "on-site",
        status: "interviewing",
        link: "https://vanguard.wd5.myworkdayjobs.com/en-US/vanguard_external/job/Malvern-PA/Entry-Level-Application-Engineer---2024-Start-Date_155913-1",
        replied: false,
        interviewAquired: false,
        applicationQA: [],
        updates: ["Finished the Online assessment"],
        appliedAt: new Date("2023-10-30"),
        updatedAt: new Date("2023-10-31"),
    },
    {
        id: "3",
        company: "Perpay",
        title: "Software Engineer, New Grad",
        location: "Philadelphia, PA",
        remote: "on-site",
        status: "applied",
        link: "https://boards.greenhouse.io/perpay/jobs/4034578007",
        replied: false,
        interviewAquired: false,
        applicationQA: [
            {
                question: "Why are you interested in this position at Perpay?",
                answer: "I am excited about this opportunity to join Perpay as a Software Enginner because of several factors that are important to me. First, the Perpays mission to provide a unique solution to help people build credit while making everyday purchases really interested me, and as a software engineer, I'm very excited to contribute to the development of new features and improvements that could help people improve their financial well-being. Second, I really look forward to the company's collaborative culture and the opportunity to work with a team of talented and passionate individuals. Third, the tech stack used at Perpay including Python, JavaScript, React and etc highly matches my skills and interests. I'm excited to apply my knowledge in these area and continue to develop my expertise. Lastly, the location of the company is ideal as it is close to where I currently live, which would allow me to fully immerse myself in the company culture and easily participate in team events and other activities.",
            },
        ],
        updates: [],
        appliedAt: new Date("2023-11-01"),
        updatedAt: new Date("2023-11-01"),
    },
];

export { columns, statusOptions, appliedJobs };
export type { Column };
