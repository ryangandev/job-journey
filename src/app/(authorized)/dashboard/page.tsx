import dynamic from "next/dynamic";

import { getApplicationsListAction } from "../../../actions/applications-actions";
import { auth, signOut } from "../../../auth";

// Problem:
// Due to this line in dashboard.tsx: selectionMode="multiple" on the nextui table component causing this error:
// Warning: Prop 'data-key' did not match. Server: "row-header-column-ilm253m8gg" Client: "row-header-column-57c34tinu8f"

// Solution:
// Using dynamic import for the JobApplicationsDashboard component and disabling server-side rendering (ssr: false)
// Similar problems found on github by seb350:
// https://github.com/nextui-org/nextui/issues/1729
// https://github.com/nextui-org/nextui/issues/779

const ApplicationsDashboard = dynamic(
    () => import("../../../components/applications/dashboard"),
    { ssr: false },
);

export default async function Dashboard() {
    const session = await auth();
    const applications = await getApplicationsListAction();

    console.log("session", session);
    return (
        <main className="w-screen py-4 px-4">
            <div className="max-w-7xl w-full mx-auto">
                <form
                    action={async () => {
                        "use server";

                        await signOut({
                            redirectTo: "/auth/login",
                        });
                    }}
                >
                    <button type="submit" className="bg-gray">
                        Sign out
                    </button>
                </form>
                <ApplicationsDashboard applicationsData={applications} />
            </div>
        </main>
    );
}
