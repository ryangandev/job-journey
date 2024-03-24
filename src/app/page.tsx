import dynamic from "next/dynamic";

// Problem:
// Due to this line in dashboard.tsx: selectionMode="multiple" on the nextui table component causing this error:
// Warning: Prop 'data-key' did not match. Server: "row-header-column-ilm253m8gg" Client: "row-header-column-57c34tinu8f"

// Solution:
// Using dynamic import for the JobApplicationsDashboard component and disabling server-side rendering (ssr: false)
// Similar problems found on github by seb350:
// https://github.com/nextui-org/nextui/issues/1729
// https://github.com/nextui-org/nextui/issues/779

const ApplicationsDashboard = dynamic(
    () => import("../components/applications/dashboard"),
    { ssr: false },
);

export default async function Home() {
    return (
        <main className="pt-16 pb-10 px-4">
            <ApplicationsDashboard />
        </main>
    );
}
