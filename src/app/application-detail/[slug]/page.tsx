import { getSpecificApplicationDetailByIdAction } from "../../../actions/applications-actions";
import ApplicationDetailView from "../../../components/applications/application-detail";

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const applicationDetailData = await getSpecificApplicationDetailByIdAction(
        slug,
    );

    return (
        <main className="w-screen flex justify-center py-4 px-4">
            <ApplicationDetailView
                applicationDetailData={applicationDetailData}
            />
        </main>
    );
}
