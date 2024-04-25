import { getSpecificApplicationDetailByIdAction } from "../../../actions/applications-actions";
import ApplicationDetailView from "../../../components/applications/application-detail-view";

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const applicationDetailData = await getSpecificApplicationDetailByIdAction(
        slug,
    );

    return (
        <main className="w-screen flex justify-center pt-4 pb-8 px-4">
            <ApplicationDetailView
                applicationDetailData={applicationDetailData}
            />
        </main>
    );
}
