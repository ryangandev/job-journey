import { ChipProps } from "@nextui-org/chip";

import { prisma } from "../libs/db";

const getApplicationById = async (id: string) => {
    try {
        const application = await prisma.application.findUnique({
            where: {
                id,
            },
        });

        if (!application) {
            console.log(`Application with id ${id} not found.`);
            return {
                error: `Application not found.`,
            };
        }

        return application;
    } catch (error) {
        return {
            error: "There was an error loading the application.",
        };
    }
};

const statusOptions = [
    "not_applied",
    "applied",
    "interviewing",
    "offered",
    "rejected",
    "not_selected",
    "ghosted",
];

const settingOptions = ["on_site", "remote", "hybrid"];

const typeOptions = ["full_time", "part_time", "contract", "freelance"];

const levelOptions = [
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
];

const repliedOptions = ["Replied", "No Reply"];

const interviewAquiredOptions = ["Interview Aquired", "No Interview"];

const statusColorMap: Record<string, ChipProps["color"]> = {
    not_applied: "warning",
    applied: "primary",
    interviewing: "secondary",
    offered: "success",
    rejected: "danger",
    not_selected: "default",
    ghosted: "default",
};

const repliedColorMap: Record<string, ChipProps["color"]> = {
    Replied: "secondary",
    "No Reply": "danger",
};

const interviewColorMap: Record<string, ChipProps["color"]> = {
    "Interview Aquired": "success",
    "No Interview": "warning",
};

const jobStatusMap: Record<string, string> = {
    not_applied: "Not Applied",
    applied: "Applied",
    interviewing: "Interviewing",
    offered: "Offered",
    rejected: "Rejected",
    ghosted: "Ghosted",
};

const jobSettingMap: Record<string, string> = {
    on_site: "On-site",
    remote: "Remote",
    hybrid: "Hybrid",
};

const jobTypeMap: Record<string, string> = {
    full_time: "Full-time",
    part_time: "Part-time",
    contract: "Contract",
    freelance: "Freelance",
};

const jobLevelMap: Record<string, string> = {
    intern: "Intern",
    entry: "Entry Level",
    junior: "Junior",
    associate: "Associate",
    mid: "Mid Level",
    mid_senior: "Mid-Senior Level",
    senior: "Senior Level",
    lead: "Lead",
    manager: "Manager",
    director: "Director",
    executive: "Executive",
};

export {
    getApplicationById,
    statusOptions,
    settingOptions,
    typeOptions,
    levelOptions,
    repliedOptions,
    interviewAquiredOptions,
    statusColorMap,
    repliedColorMap,
    interviewColorMap,
    jobStatusMap,
    jobSettingMap,
    jobTypeMap,
    jobLevelMap,
};
