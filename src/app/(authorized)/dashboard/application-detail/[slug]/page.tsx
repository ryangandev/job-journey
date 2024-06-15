import { Metadata } from "next";
import { Divider, Spinner } from "@nextui-org/react";

import { getApplicationById } from "../../../../../data/application";
import { getApplicationUpdatesByApplicationId } from "../../../../../data/application";
import LoadingError from "../../../../../components/loading-error";
import HelperSign from "../../../../../components/helper-sign";
import ApplicationDetail from "../../../../../components/dashboard/application-detail";
import ApplicationUpdates from "../../../../../components/dashboard/application-updates";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const { slug } = params;
    const applicationDetailData = await getApplicationById(slug);

    if (applicationDetailData && !("error" in applicationDetailData)) {
        return {
            title:
                applicationDetailData.company +
                " - " +
                applicationDetailData.title +
                " - JobJourney",
            description: "Detailed view of a job application.",
        };
    }

    return {
        title: "Application Not Found - JobJourney",
        description: "Detailed view of a job application.",
    };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const applicationDetail = await getApplicationById(slug);

    if ("error" in applicationDetail) {
        return <LoadingError error={applicationDetail.error} />;
    }

    const applicationUpdatesData = await getApplicationUpdatesByApplicationId(
        applicationDetail.id,
    );

    if ("error" in applicationUpdatesData) {
        return (
            <main className="flex justify-center px-4 py-8">
                <section className="max-w-[48rem] w-full flex flex-col space-y-6">
                    <ApplicationDetail applicationDetail={applicationDetail} />
                    <Divider orientation="horizontal" />
                    <Spinner label="Loading application updates..." />
                </section>
                <ApplicationDetailPageHelper />
            </main>
        );
    }

    return (
        <main className="flex justify-center px-4 py-8">
            <section className="max-w-[48rem] w-full flex flex-col space-y-6">
                <ApplicationDetail applicationDetail={applicationDetail} />
                <Divider orientation="horizontal" />
                <ApplicationUpdates
                    applicationUpdates={applicationUpdatesData}
                    applicationId={applicationDetail.id}
                />
            </section>
            <ApplicationDetailPageHelper />
        </main>
    );
}

const ApplicationDetailPageHelper = () => {
    return (
        <HelperSign
            helperContent={
                <div className="p-1">
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold">💡 Tip</span>
                    </div>
                    <div className="mt-2 text-sm max-w-60">
                        Click on the text or link icons to edit application
                        details.
                    </div>
                </div>
            }
        />
    );
};
