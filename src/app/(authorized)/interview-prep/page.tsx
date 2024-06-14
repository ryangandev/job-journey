import { auth } from "../../../auth";
import FormModal from "../../../components/interview-prep/create-form-modal";
import QuestionsTable from "../../../components/interview-prep/table";
import NotAuthorized from "../../../components/not-authorized";
import PageHeader from "../../../components/page-header";
import { getFilteredInterviewQuestions } from "../../../data/interview-questions";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query: string;
        type: string;
    };
}) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return <NotAuthorized />;
    }

    const queryData = {
        userId: session.user.id,
        query: searchParams?.query || "",
        type: searchParams?.type || "",
    };

    const interviewQuestions = await getFilteredInterviewQuestions(
        queryData.userId,
        queryData.query,
        queryData.type,
    ).catch((error) => {
        console.log(error);
        return [];
    });

    return (
        <main className="flex flex-col items-center p-4">
            <div className="max-w-5xl w-full space-y-8 py-4 min-h-screen">
                <div className="flex justify-between space-x-4 items-center">
                    <PageHeader>Interview Prep</PageHeader>
                    <FormModal />
                </div>
                <QuestionsTable interviewQuestions={interviewQuestions} />
            </div>
        </main>
    );
}
