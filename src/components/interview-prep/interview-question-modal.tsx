"use client";

import React, { useState } from "react";
import { InterviewQuestionType } from "@prisma/client";
import {
    Button,
    Chip,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
} from "@nextui-org/react";

import { highlightText } from "../../libs/highlight-text";
import {
    interviewQuestionTypeColorMap,
    interviewQuestionTypeMap,
} from "../../data/interview-questions";

interface InterviewQuestionModalProps {
    type: InterviewQuestionType;
    question: string;
    answer: string;
    highlight: string;
    isOpen: boolean;
    onOpenChange: () => void;
    loading: boolean;
    handleConfirm: (onClose: () => void) => void;
}

export default function InterviewQuestionModal({
    type,
    question,
    answer,
    highlight,
    isOpen,
    onOpenChange,
    loading,
}: InterviewQuestionModalProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newQuestion, setNewQuestion] = useState<string>(question);
    const [newAnswer, setNewAnswer] = useState<string>(answer);

    const formatAndHighlightText = (text: string, highlight: string) => {
        return text.split("\n").map((line, index) => (
            <React.Fragment key={index}>
                {highlightText(line, highlight)}
                <br />
            </React.Fragment>
        ));
    };

    const handleCancel = () => {
        setNewQuestion(question);
        setNewAnswer(answer);
        setIsEditing(false);
    };

    return (
        <Modal
            size="3xl"
            placement="center"
            backdrop="blur"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={handleCancel}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col space-y-2 pt-6 pb-1">
                            {isEditing ? (
                                <Input
                                    label="Question"
                                    variant="bordered"
                                    value={newQuestion}
                                    onValueChange={setNewQuestion}
                                />
                            ) : (
                                <p className="text-xl font-semibold">
                                    Q: {highlightText(question, highlight)}
                                </p>
                            )}
                            <div className="flex flex-row space-x-2">
                                <Chip
                                    color={interviewQuestionTypeColorMap[type]}
                                >
                                    {interviewQuestionTypeMap[type]}
                                </Chip>
                            </div>
                        </ModalHeader>
                        <ModalBody className="py-1">
                            {isEditing ? (
                                <Textarea
                                    label="Answer"
                                    variant="bordered"
                                    value={newAnswer}
                                    onValueChange={setNewAnswer}
                                />
                            ) : (
                                <p>
                                    {answer
                                        ? formatAndHighlightText(
                                              answer,
                                              highlight,
                                          )
                                        : "Enter your answer..."}
                                </p>
                            )}
                        </ModalBody>
                        <ModalFooter className="pt-1">
                            <Button
                                color="warning"
                                variant={"bordered"}
                                onPress={() => setIsEditing(true)}
                                isDisabled={loading || isEditing}
                            >
                                Edit
                            </Button>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                                isDisabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                onPress={() => {}}
                                isDisabled={loading}
                                isLoading={loading}
                            >
                                Confirm
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
