import { getAppliedJobsListAction } from "../actions/job-applications-management-actions";
import JobApplicationsDashboard from "../components/job-applications-management/dashboard";

export default async function Home() {
    const appliedJobs = await getAppliedJobsListAction();

    return (
        <main>
            <JobApplicationsDashboard appliedJobs={appliedJobs} />
        </main>
    );
}
