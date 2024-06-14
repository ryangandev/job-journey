"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import { InterviewQuestion } from "@prisma/client";

import SearchFilter from "./search-filter";
import Question from "./question";

export default function QuestionsTable({
    interviewQuestions,
}: {
    interviewQuestions: InterviewQuestion[];
}) {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    const [isSearching, setIsSearching] = useState<boolean>(false);

    useEffect(() => {
        setIsSearching(false);
    }, [interviewQuestions]);

    return (
        <div className="flex flex-col space-y-4">
            <SearchFilter setIsSearching={setIsSearching} />
            <ul className="flex space-y-3">
                {isSearching ? (
                    <Spinner
                        className="mx-auto my-4"
                        label="Searching..."
                        color="primary"
                    />
                ) : (
                    <ul className="w-full space-y-3">
                        {interviewQuestions.map((question) => (
                            <li key={question.id}>
                                <Question
                                    questionId={question.id}
                                    type={question.type}
                                    question={question.question}
                                    answer={question.answer}
                                    highlight={query}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </ul>
        </div>
    );
}
