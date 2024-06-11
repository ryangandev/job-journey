"use client";

import { useForm, Controller } from "react-hook-form";
import { InterviewQuestionType } from "@prisma/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure,
} from "@nextui-org/react";
import toast from "react-hot-toast";

import { createInterviewQuestionAction } from "../../actions/interview-prep-actions";
import { PlusIcon } from "../../assets/svgs";
import {
    interviewQuestionTypeMap,
    interviewQuestionTypeOptions,
} from "../../data/interview-questions";
import { InterviewQuestionSchema } from "../../schemas/interview-prep-schema";
import CustomDropdown from "../custom-dropdown";

export default function InterviewQuestionFormModal() {
    const {
        handleSubmit,
        register,
        control,
        reset,
        formState: { isSubmitting, isDirty, isValid },
    } = useForm<z.infer<typeof InterviewQuestionSchema>>({
        resolver: zodResolver(InterviewQuestionSchema),
        defaultValues: {
            type: "behavioral",
            question: "",
            answer: "",
        },
    });

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const handleOnClose = () => {
        reset();
    };

    const handleOnSubtmit = async (
        interviewQuestionData: z.infer<typeof InterviewQuestionSchema>,
    ) => {
        console.log(interviewQuestionData);
        const response = await createInterviewQuestionAction(
            interviewQuestionData,
        );
        if (response.error) {
            toast.error(response.error);
            return;
        }
        if (response.message) {
            toast.success(response.message);
        }
        reset();
        onClose();
    };

    return (
        <>
            <Button
                className="bg-foreground text-background"
                onPress={onOpen}
                endContent={<PlusIcon width={undefined} height={undefined} />}
                size="md"
            >
                Add
            </Button>
            <Modal
                size="3xl"
                placement="center"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={handleOnClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Add a new question
                            </ModalHeader>
                            <form onSubmit={handleSubmit(handleOnSubtmit)}>
                                <ModalBody>
                                    <Input
                                        {...register("question")}
                                        autoFocus
                                        label="Question"
                                        placeholder="Enter your question"
                                        variant="bordered"
                                        autoComplete="off"
                                    />
                                    <Textarea
                                        {...register("answer")}
                                        label="Answer"
                                        placeholder="Enter your answer"
                                        variant="bordered"
                                        minRows={40}
                                    />
                                    <div>
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
                                                    handleUpdate={(
                                                        selectedKey,
                                                    ) => {
                                                        field.onChange(
                                                            selectedKey,
                                                        );
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
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="flat"
                                        onPress={onClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        type="submit"
                                        isLoading={isSubmitting}
                                        isDisabled={
                                            !isDirty || isSubmitting || !isValid
                                        }
                                    >
                                        Create
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
