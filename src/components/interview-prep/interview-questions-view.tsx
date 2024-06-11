"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Input, Spinner, RadioGroup, Radio } from "@nextui-org/react";
import { debounce } from "lodash";

import { SearchIcon } from "../../assets/svgs";
import InterviewQuestionContainer from "./interview-question-container";
import { InterviewQuestion, InterviewQuestionType } from "@prisma/client";
import { getSearchedInterviewQuestionsAction } from "../../actions/interview-prep-actions";
import {
    interviewQuestionTypeMap,
    interviewQuestionTypeOptions,
} from "../../data/interview-questions";

// Simple in-memory cache
const searchCache: Record<string, InterviewQuestion[]> = {};

export default function InterviewQuestionsView() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [questionTypeFilter, setQuestionTypeFilter] = useState<
        InterviewQuestionType | "all"
    >("all");
    const [companyInterviewQuestions, setCompanyInterviewQuestions] = useState<
        InterviewQuestion[]
    >([]);

    const debouncedFetchQuestions = useCallback(
        debounce(async (query: string, type: InterviewQuestionType | "all") => {
            setIsSearching(true);

            // Check if the result is in the cache
            const cacheKey = `${query}-${type}`;
            if (searchCache[cacheKey]) {
                setCompanyInterviewQuestions(searchCache[cacheKey]);
                setIsSearching(false);
                return;
            }

            const questions = await getSearchedInterviewQuestionsAction({
                query,
                type: questionTypeFilter,
            });

            if (questions.error) {
                console.log(questions.error);
                setIsSearching(false);
                return;
            }

            if (questions.interviewQuestions) {
                // Store the result in the cache
                searchCache[cacheKey] = questions.interviewQuestions;
                setCompanyInterviewQuestions(questions.interviewQuestions);
            }
            setIsSearching(false);
        }, 500),
        [questionTypeFilter],
    );

    useEffect(() => {
        debouncedFetchQuestions(searchQuery, questionTypeFilter);
    }, [searchQuery, questionTypeFilter, debouncedFetchQuestions]);

    return (
        <div className="flex flex-col space-y-4">
            <Input
                variant="bordered"
                classNames={{
                    base: "w-full sm:max-w-[50%]",
                    inputWrapper: "border-1 px-2",
                }}
                startContent={<SearchIcon />}
                placeholder="Search questions by keyword"
                value={searchQuery}
                onValueChange={setSearchQuery}
            />
            <RadioGroup
                orientation="horizontal"
                value={questionTypeFilter}
                onValueChange={(value) =>
                    setQuestionTypeFilter(
                        value as InterviewQuestionType | "all",
                    )
                }
            >
                <Radio value="all">All</Radio>
                {interviewQuestionTypeOptions.map((questionType) => (
                    <Radio key={questionType} value={questionType}>
                        {
                            interviewQuestionTypeMap[
                                questionType as InterviewQuestionType
                            ]
                        }
                    </Radio>
                ))}
            </RadioGroup>
            {isSearching ? (
                <Spinner
                    className="mx-auto my-4"
                    label="Searching..."
                    color="primary"
                />
            ) : (
                <ul className="space-y-3">
                    {companyInterviewQuestions.map((question) => (
                        <li key={question.id}>
                            <InterviewQuestionContainer
                                type={question.type}
                                question={question.question}
                                answer={question.answer}
                                highlight={searchQuery}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
