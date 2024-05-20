import { prisma } from "../libs/db";
import { Column, SearchFilterOption } from "../models/dashboard";

const getApplicationsDashboardByUserId = async (userId: string) => {
    try {
        const applications = await prisma.application.findMany({
            select: {
                id: true,
                company: true,
                title: true,
                location: true,
                setting: true,
                type: true,
                level: true,
                status: true,
                isFavorite: true,
                replied: true,
                interviewAquired: true,
                appliedAt: true,
                updatedAt: true,
            },
            where: {
                userId: userId,
            },
        });

        return applications;
    } catch (error) {
        console.log("Error:", error);
        return {
            error: "There was an error fetching the applications.",
        };
    }
};

const columns: Column[] = [
    {
        name: "Fav",
        uid: "isFavorite",
        width: 50,
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

const searchFilterOptions: SearchFilterOption[] = [
    "title",
    "company",
    "location",
    // "appliedAt",
    // "updatedAt",
];

const searchFilterOptionsMap: Record<string, string> = {
    title: "Title",
    company: "Company",
    location: "Location",
    appliedAt: "Applied At",
    updatedAt: "Updated At",
};

export {
    getApplicationsDashboardByUserId,
    columns,
    searchFilterOptions,
    searchFilterOptionsMap,
};
