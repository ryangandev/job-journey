import ApplicationDetailView from "../../../../../components/applications/application-detail-view";
import { getApplicationById } from "../../../../../data/application";

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const applicationDetailData = await getApplicationById(slug);

    return (
        <main className="w-screen flex justify-center pt-4 pb-8 px-4">
            <ApplicationDetailView
                applicationDetailData={applicationDetailData}
            />
        </main>
    );
}
