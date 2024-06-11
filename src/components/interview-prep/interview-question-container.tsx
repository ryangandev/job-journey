"use client";

import React from "react";
import { InterviewQuestionType } from "@prisma/client";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    useDisclosure,
} from "@nextui-org/react";

import {
    interviewQuestionTypeColorMap,
    interviewQuestionTypeMap,
} from "../../data/interview-questions";
import { highlightText } from "../../libs/highlight-text";
import InterviewQuestionModal from "./interview-question-modal";

interface InterviewQuestionProps {
    type: InterviewQuestionType;
    question: string;
    answer: string;
    highlight: string;
}

export default function InterviewQuestionContainer({
    type,
    question,
    answer,
    highlight,
}: InterviewQuestionProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Card
                className="px-4"
                isHoverable
                isPressable
                fullWidth
                shadow="sm"
                disableRipple
                onPress={() => {
                    onOpen();
                }}
            >
                <CardHeader className="pt-2 pb-1">
                    <p className="text-xl font-semibold line-clamp-2 text-left">
                        Q: {highlightText(question, highlight)}
                    </p>
                </CardHeader>
                <CardBody className="py-1">
                    <p className="line-clamp-2 indent-7">
                        {answer
                            ? highlightText(answer, highlight)
                            : "Enter your answer..."}
                    </p>
                </CardBody>
                <CardFooter className="pt-1 pb-2">
                    <Chip color={interviewQuestionTypeColorMap[type]}>
                        {interviewQuestionTypeMap[type]}
                    </Chip>
                </CardFooter>
            </Card>
            <InterviewQuestionModal
                type={type}
                question={question}
                answer={answer}
                highlight={highlight}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                loading={false}
                handleConfirm={() => {}}
            />
        </>
    );
}
