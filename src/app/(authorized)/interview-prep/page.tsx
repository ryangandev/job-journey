import InterviewQuestionFormModal from "../../../components/interview-prep/interview-question-form-modal";
import InterviewQuestionsView from "../../../components/interview-prep/interview-questions-view";
import PageHeader from "../../../components/page-header";

export default async function InterviewPrepPage() {
    return (
        <main className="flex flex-col items-center p-4">
            <div className="max-w-5xl w-full space-y-8 py-4 min-h-screen">
                <div className="flex justify-between space-x-4 items-center">
                    <PageHeader>Interview Prep</PageHeader>
                    <InterviewQuestionFormModal />
                </div>
                <InterviewQuestionsView />
            </div>
        </main>
    );
}
