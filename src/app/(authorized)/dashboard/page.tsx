import dynamic from "next/dynamic";
import { Metadata } from "next";

import { auth } from "../../../auth";
import { getApplicationsDashboardByUserId } from "../../../data/dashboard";
import NotAuthorized from "../../../components/not-authorized";

export const metadata: Metadata = {
    title: "Dashboard",
    description:
        "An intuitive dashboard that keeps track of your job applications in one place.",
};

// Problem:
// Due to this line in dashboard.tsx: selectionMode="multiple" on the nextui table component causing this error:
// Warning: Prop 'data-key' did not match. Server: "row-header-column-ilm253m8gg" Client: "row-header-column-57c34tinu8f"

// Solution:
// Using dynamic import for the JobApplicationsDashboard component and disabling server-side rendering (ssr: false)
// Similar problems found on github by seb350:
// https://github.com/nextui-org/nextui/issues/1729
// https://github.com/nextui-org/nextui/issues/779

const ApplicationsDashboard = dynamic(
    () => import("../../../components/dashboard/dashboard"),
    { ssr: false },
);

export default async function Dashboard() {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        return <NotAuthorized />;
    }

    const applications = await getApplicationsDashboardByUserId(
        session.user.id,
    );

    return (
        <main className="p-4">
            <div className="max-w-7xl w-full mx-auto">
                <ApplicationsDashboard applicationsData={applications} />
            </div>
        </main>
    );
}
