"use client";

import React, { FormEvent, useState, useRef } from "react";
import {
    Button,
    Input,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Checkbox,
    Progress,
    Breadcrumbs,
    BreadcrumbItem,
    useDisclosure,
} from "@nextui-org/react";
import {
    applicationFormQuestions,
    ApplicationForm,
    ApplicationFormQuestion,
    SelectQuestion,
    CheckboxQuestion,
    InputQuestion,
    newApplicationFormData,
} from "../../data/new-application-form";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdRefresh, IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { ChevronDownIcon } from "../../assets/svgs";
import { jobLevelMap, jobSettingMap, jobTypeMap } from "../../data/application";
import toast from "react-hot-toast";
import isEqual from "lodash/isEqual";
import { addNewApplicationAction } from "../../actions/applications-actions";
import { ApplicationFormSchema } from "../../constants/schema";
import {
    inputTransitionVariants,
    shakeAnimationVariants,
    inputTransition,
} from "../../constants/framer-motion-variants-transitions";
import ConfirmModal from "../../components/confirm-modal";

export default function AddNewApplication() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1: next, -1: previous
    const [newApplicationForm, setNewApplicationForm] =
        useState<ApplicationForm>(newApplicationFormData);
    const [showShakeAnimation, setShowShakeAnimation] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [confirmModalTitle, setConfirmModalTitle] = useState("");
    const [confirmModalQuestion, setConfirmModalQuestion] = useState("");
    const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const isFormEdited = !isEqual(newApplicationForm, newApplicationFormData);

    const handleNavigateRequest = () => {
        const navigateToDashboard = () => {
            window.location.href = "/dashboard";
        };

        if (!isFormEdited) {
            navigateToDashboard();
        } else {
            setConfirmModalTitle("Leave Page?");
            setConfirmModalQuestion(
                "There are unsaved changes. Are you sure to leave this page?",
            );
            setConfirmAction(() => navigateToDashboard);
            onOpen();
        }
    };

    const handleStartNewRequest = () => {
        if (!isFormEdited) return;

        const handleStartNew = () => {
            setNewApplicationForm(newApplicationFormData);
            setCurrentQuestionIndex(0);
            setDirection(0);
            toast.success("Form has been reset.");
        };

        setConfirmModalTitle("Start New Application?");
        setConfirmModalQuestion(
            "There are unsaved changes. Are you sure to start a new application?",
        );
        setConfirmAction(() => handleStartNew);
        onOpen();
    };

    const handleOnModalClose = () => {
        setConfirmModalTitle("");
        setConfirmModalQuestion("");
        setConfirmAction(() => {});
    };

    const handleOnPrevious = () => {
        setCurrentQuestionIndex((prev) => prev - 1);
        setDirection(-1);
    };

    const handleOnNext = () => {
        if (
            newApplicationForm[
                applicationFormQuestions[currentQuestionIndex].key
            ] === "" &&
            applicationFormQuestions[currentQuestionIndex].required
        ) {
            toast.error("Please fill in the required field.", {
                duration: 2000,
            });
            setShowShakeAnimation(true);
            inputRef.current?.focus();
            return;
        }

        // Move to the next question
        setCurrentQuestionIndex((prev) => prev + 1);
        setDirection(1);
    };

    const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // 1. Check if current question is not the last
        if (currentQuestionIndex !== applicationFormQuestions.length - 1) {
            handleOnNext();
            return; // Exit early
        }

        // 2. Client-side validation
        const result = ApplicationFormSchema.safeParse(newApplicationForm);

        if (!result.success) {
            let errorMessages = "";

            result.error.issues.forEach((issue) => {
                errorMessages += issue.path[0] + ": " + issue.message + ".\n";
            });

            toast.error(errorMessages);
            return;
        }

        // 3. Submit the new application
        const response = await addNewApplicationAction(newApplicationForm);

        if (response?.error) {
            toast.error(response.error);
            return;
        }

        // 4. Show success message when no errors
        toast.success("Application added successfully!");
    };

    const renderInputQuestion = (key: InputQuestion, placeholder: string) => {
        return (
            <motion.div
                className="w-full"
                variants={shakeAnimationVariants}
                animate={showShakeAnimation ? "shake" : "static"}
                onAnimationComplete={() => setShowShakeAnimation(false)}
            >
                <Input
                    variant="bordered"
                    size="lg"
                    color={showShakeAnimation ? "danger" : "default"}
                    placeholder={placeholder}
                    autoFocus
                    isClearable
                    ref={inputRef}
                    value={newApplicationForm[key]}
                    onValueChange={(value) =>
                        setNewApplicationForm((prev) => ({
                            ...prev,
                            [key]: value,
                        }))
                    }
                />
            </motion.div>
        );
    };

    const renderSelectQuestion = (key: SelectQuestion, options: string[]) => {
        const typeMaps = {
            setting: jobSettingMap,
            type: jobTypeMap,
            level: jobLevelMap,
        };

        const currentMap = typeMaps[key];

        if (!currentMap || options.length === 0) {
            return null;
        }

        return (
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        size="md"
                        endContent={<ChevronDownIcon />}
                        variant="flat"
                        color="warning"
                    >
                        {currentMap[newApplicationForm[key]]}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    variant="bordered"
                    disallowEmptySelection
                    aria-label={"Select " + key}
                    closeOnSelect={true}
                    selectedKeys={[newApplicationForm[key]]}
                    selectionMode="single"
                    onSelectionChange={(selectedKeys) => {
                        const selectedKeysArray = Array.from(selectedKeys);
                        setNewApplicationForm((prev) => ({
                            ...prev,
                            [key]: selectedKeysArray[0],
                        }));
                    }}
                >
                    {options.map((option) => (
                        <DropdownItem key={option}>
                            {currentMap[option]}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        );
    };

    const renderCheckboxQuestion = (
        key: CheckboxQuestion,
        placeholder: string,
    ) => {
        return (
            <Checkbox
                className="text-light-100 dark:text-dark-100 text-sm"
                isSelected={newApplicationForm[key]}
                size="lg"
                color="danger"
                onValueChange={(value) => {
                    setNewApplicationForm((prev) => ({
                        ...prev,
                        [key]: value,
                    }));
                }}
            >
                {placeholder}
            </Checkbox>
        );
    };

    const renderQuestion = (
        applicationFormQuestion: ApplicationFormQuestion,
    ) => {
        switch (applicationFormQuestion.type) {
            case "input": {
                const { key, placeholder } = applicationFormQuestion;
                const inputQuestionComponent = renderInputQuestion(
                    key as InputQuestion,
                    placeholder ?? "",
                );
                return inputQuestionComponent;
            }
            case "select": {
                const { key, options } = applicationFormQuestion;
                const selectQuestionComponent = renderSelectQuestion(
                    key as SelectQuestion,
                    options ?? [],
                );
                return selectQuestionComponent;
            }
            case "checkbox": {
                const { key, placeholder } = applicationFormQuestion;
                const checkboxQuestionComponent = renderCheckboxQuestion(
                    key as CheckboxQuestion,
                    placeholder ?? "",
                );
                return checkboxQuestionComponent;
            }
            default:
                return null;
        }
    };

    return (
        <>
            <AnimatePresence>
                <main className="w-screen h-screen flex flex-col items-center pt-4 pb-20">
                    <Breadcrumbs className="max-w-[36rem] w-full">
                        <BreadcrumbItem onPress={handleNavigateRequest}>
                            Dashboard
                        </BreadcrumbItem>
                        <BreadcrumbItem>Add New Application</BreadcrumbItem>
                    </Breadcrumbs>
                    <div className="max-w-[36rem] w-full h-full flex flex-col justify-center items-center space-y-12">
                        <motion.form
                            className="w-full flex flex-col space-y-4"
                            onSubmit={handleOnSubmit}
                            key={currentQuestionIndex}
                            custom={direction}
                            variants={inputTransitionVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={inputTransition}
                        >
                            <span className="text-lg font-semibold text-light-100 dark:text-dark-100">
                                {currentQuestionIndex + 1}.{" "}
                                {
                                    applicationFormQuestions[
                                        currentQuestionIndex
                                    ].question
                                }
                                {applicationFormQuestions[currentQuestionIndex]
                                    .required && (
                                    <span className="text-red-500"> *</span>
                                )}
                            </span>
                            <div className="h-16 flex items-center">
                                {renderQuestion(
                                    applicationFormQuestions[
                                        currentQuestionIndex
                                    ],
                                )}
                            </div>

                            {/* Button Group */}
                            <div className="flex flex-row justify-between items-center">
                                <Button
                                    size="md"
                                    radius="sm"
                                    variant="flat"
                                    endContent={<IoMdRefresh />}
                                    color="danger"
                                    onPress={handleStartNewRequest}
                                    isDisabled={!isFormEdited}
                                >
                                    Start New
                                </Button>
                                <div className="flex items-center space-x-4">
                                    <Button
                                        size="md"
                                        radius="sm"
                                        variant="flat"
                                        startContent={<IoMdArrowBack />}
                                        color="secondary"
                                        onPress={handleOnPrevious}
                                        isDisabled={currentQuestionIndex === 0}
                                    >
                                        Previous
                                    </Button>
                                    {currentQuestionIndex ===
                                    applicationFormQuestions.length - 1 ? (
                                        <Button
                                            size="md"
                                            radius="sm"
                                            variant="flat"
                                            endContent={<FaCheck />}
                                            color="success"
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    ) : (
                                        <Button
                                            size="md"
                                            radius="sm"
                                            variant="flat"
                                            endContent={<IoMdArrowForward />}
                                            color="primary"
                                            onPress={handleOnNext}
                                            isDisabled={
                                                currentQuestionIndex ===
                                                applicationFormQuestions.length -
                                                    1
                                            }
                                        >
                                            Next
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </motion.form>

                        {/* Progress Section */}
                        <motion.div
                            className="w-full"
                            variants={inputTransitionVariants}
                            custom={0} // direction
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={inputTransition}
                        >
                            <Progress
                                size="sm"
                                radius="md"
                                classNames={{
                                    base: "max-w-[36rem]",
                                    track: "drop-shadow-md border border-default",
                                    indicator:
                                        "bg-gradient-to-r from-pink-500 to-yellow-500",
                                    label: "tracking-wider font-medium text-default-600",
                                    value: "text-foreground/60",
                                }}
                                label="Completion"
                                value={
                                    ((currentQuestionIndex + 1) /
                                        applicationFormQuestions.length) *
                                    100
                                }
                                showValueLabel={true}
                            />
                        </motion.div>
                    </div>
                </main>
            </AnimatePresence>
            <ConfirmModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title={confirmModalTitle}
                confirmQuestion={confirmModalQuestion}
                onConfirm={confirmAction}
                onClose={handleOnModalClose}
            />
        </>
    );
}
