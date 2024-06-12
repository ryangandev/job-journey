"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { GoPencil } from "react-icons/go";

import { updateInterviewQuestionAction } from "../../actions/interview-prep-actions";
import {
    interviewQuestionTypeColorMap,
    interviewQuestionTypeMap,
    interviewQuestionTypeOptions,
} from "../../data/interview-questions";
import { highlightText } from "../../libs/highlight-text";
import { InterviewQuestionUpdateSchema } from "../../schemas/interview-prep-schema";
import CustomDropdown from "../custom-dropdown";

interface InterviewQuestionModalProps {
    questionId: string;
    type: InterviewQuestionType;
    question: string;
    answer: string;
    highlight: string;
    isOpen: boolean;
    onOpenChange: () => void;
    handleConfirm: () => void;
}

export default function InterviewQuestionModal({
    questionId,
    type,
    question,
    answer,
    highlight,
    isOpen,
    onOpenChange,
    handleConfirm,
}: InterviewQuestionModalProps) {
    const [isEditing, setIsEditing] = useState(false);

    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { isSubmitting, isDirty, isValid },
    } = useForm<z.infer<typeof InterviewQuestionUpdateSchema>>({
        resolver: zodResolver(InterviewQuestionUpdateSchema),
        defaultValues: {
            questionId: questionId,
            type: type,
            question: question,
            answer: answer,
        },
    });

    const formatAndHighlightText = (text: string, highlight: string) => {
        return text.split("\n").map((line, index) => (
            <React.Fragment key={index}>
                {highlightText(line, highlight)}
                <br />
            </React.Fragment>
        ));
    };

    const handleOnCancel = () => {
        setIsEditing(false);
        reset();
    };

    const handleOnSubmit = async (
        interviewQuestionUpdateData: z.infer<
            typeof InterviewQuestionUpdateSchema
        >,
    ) => {
        const responsne = await updateInterviewQuestionAction(
            interviewQuestionUpdateData,
        );
        if (responsne.error) {
            console.log(responsne.error);
            return;
        }
        if (responsne.message) {
            handleConfirm();
            reset();
            setIsEditing(false);
        }
    };

    return (
        <Modal
            size="3xl"
            placement="center"
            backdrop="blur"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={handleOnCancel}
        >
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <ModalHeader className="flex flex-col space-y-2 pt-6 pb-1">
                            {isEditing ? (
                                <Input
                                    {...register("question")}
                                    label="Question"
                                    variant="bordered"
                                />
                            ) : (
                                <p className="text-xl font-semibold">
                                    Q: {highlightText(question, highlight)}
                                </p>
                            )}
                            <div className="flex flex-row space-x-2">
                                {!isEditing ? (
                                    <Chip
                                        color={
                                            interviewQuestionTypeColorMap[type]
                                        }
                                    >
                                        {interviewQuestionTypeMap[type]}
                                    </Chip>
                                ) : (
                                    <Controller
                                        control={control}
                                        name="type"
                                        render={({ field }) => (
                                            <CustomDropdown
                                                triggerType="button"
                                                buttonVariant="bordered"
                                                label="Question Type"
                                                value={field.value}
                                                valueOptions={
                                                    interviewQuestionTypeOptions
                                                }
                                                handleUpdate={(selectedKey) => {
                                                    field.onChange(selectedKey);
                                                }}
                                                displayMapper={(value) =>
                                                    interviewQuestionTypeMap[
                                                        value as InterviewQuestionType
                                                    ]
                                                }
                                                isDisabled={isSubmitting}
                                            />
                                        )}
                                    />
                                )}
                            </div>
                        </ModalHeader>
                        <ModalBody className="py-1">
                            {isEditing ? (
                                <Textarea
                                    {...register("answer")}
                                    label="Answer"
                                    variant="bordered"
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
                        <ModalFooter className="pt-2">
                            {!isEditing ? (
                                <Button
                                    color="warning"
                                    variant="light"
                                    onPress={() => setIsEditing(true)}
                                    isDisabled={isSubmitting || isEditing}
                                    isIconOnly
                                    size="sm"
                                >
                                    <GoPencil size={20} />
                                </Button>
                            ) : (
                                <span className="flex flex-row space-x-2">
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onPress={() => setIsEditing(false)}
                                        isDisabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="success"
                                        variant="flat"
                                        type="submit"
                                        isDisabled={
                                            isSubmitting || !isValid || !isDirty
                                        }
                                        isLoading={isSubmitting}
                                    >
                                        Update
                                    </Button>
                                </span>
                            )}
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}
