"use client";

import React, { useEffect, useState } from "react";
import {
    ApplicationDetail,
    JobStatus,
    JobSetting,
    JobType,
    JobLevel,
} from "../../models/application";
import { patchApplicationDetailAction } from "../../actions/applications-actions";
import { dateToTwoDigitsString, timeElapsed } from "../../libs/time-utils";
import {
    Divider,
    Link as NextUiLink,
    Button,
    Breadcrumbs,
    BreadcrumbItem,
    Spinner,
    Input,
} from "@nextui-org/react";
import FavoriteToggle from "../favorite-toggle";
import {
    jobStatusMap,
    jobSettingMap,
    jobTypeMap,
    jobLevelMap,
    statusColorMap,
    statusOptions,
    settingOptions,
    typeOptions,
    levelOptions,
    repliedOptions,
    repliedColorMap,
    interviewColorMap,
    interviewAquiredOptions,
} from "../../data/application";
import { MdUpdate, MdAddCircleOutline } from "react-icons/md";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { AnchorIcon } from "../../assets/svgs";
import toast from "react-hot-toast";
import EditTooltip from "../tooltips/edit-tooltip";
import CustomDropdown from "../custom-dropdown";

export default function ApplicationDetailView({
    applicationDetailData,
}: {
    applicationDetailData: ApplicationDetail | { error: string };
}) {
    const [applicationDetail, setApplicationDetail] = useState<
        ApplicationDetail | undefined
    >();

    useEffect(() => {
        if ("error" in applicationDetailData) {
            toast.error(applicationDetailData.error);
            setApplicationDetail(undefined);
        } else {
            setApplicationDetail(applicationDetailData);
        }
    }, [applicationDetailData]);

    const renderSubTitle = (title: string) => {
        return (
            <h2 className="text-light-300 dark:text-dark-300 select-none">
                {title}
            </h2>
        );
    };

    const renderHighlightString = (content: string) => {
        return (
            <span className="text-light-100 dark:text-dark-100">{content}</span>
        );
    };

    const renderInfoString = (content: string) => {
        return (
            <span className="text-light-400 dark:text-dark-400 select-none">
                {content}
            </span>
        );
    };

    const EditableContent = ({
        fieldKey,
        contentValue,
        contentComponent: ContentComponent,
    }: {
        fieldKey: keyof ApplicationDetail;
        contentValue: string;
        contentComponent: React.FC<{
            contentValue: string;
            onPress: () => void;
        }>;
    }) => {
        const [isEditing, setIsEditing] = useState(false);
        const [newContent, setNewContent] = useState(contentValue);

        const handleConfirmUpdate = () => {
            // If the new content is the same as the old content, do nothing
            if (newContent === contentValue) {
                setIsEditing(false);
                return;
            }

            // If the new content is empty, show an error message
            if (newContent.trim().length === 0) {
                toast.error("Field cannot be empty.");
                return;
            }

            handleUpdateField(fieldKey, newContent);
            setIsEditing(false);
        };

        const handleCancelUpdate = () => {
            setNewContent(contentValue);
            setIsEditing(false);
        };

        return isEditing ? (
            <div className="flex flex-row items-center space-x-2">
                <Input
                    className="max-w-xs w-full"
                    variant="bordered"
                    autoFocus
                    minLength={1}
                    value={newContent}
                    onValueChange={(value) => {
                        setNewContent(value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleConfirmUpdate();
                        } else if (e.key === "Escape") {
                            handleCancelUpdate();
                        }
                    }}
                />
                <Button
                    isIconOnly={true}
                    aria-label="Save"
                    variant="light"
                    size="sm"
                    color="success"
                    onPress={handleConfirmUpdate}
                >
                    <IoMdCheckmark className="text-lg" />
                </Button>
                <Button
                    isIconOnly={true}
                    aria-label="Cancel"
                    variant="light"
                    size="sm"
                    color="danger"
                    onPress={handleCancelUpdate}
                >
                    <IoMdClose className="text-lg" />
                </Button>
            </div>
        ) : (
            <ContentComponent
                contentValue={contentValue}
                onPress={() => {
                    setIsEditing(true);
                }}
            />
        );
    };

    const AddUpdateContent = () => {
        if (!applicationDetail) {
            toast.error("There's no application loaded.");
            return;
        }

        const [isAdding, setIsAdding] = useState(false);
        const [newUpdate, setNewUpdate] = useState("");

        useEffect(() => {
            if (isAdding) {
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: "smooth",
                });
            }
        }, [isAdding]);

        const handleConfirmAdd = () => {
            if (newUpdate.trim().length === 0) {
                toast.error("Field cannot be empty.");
                return;
            }

            handleUpdateField(
                "updates",
                applicationDetail.updates.concat({
                    date: new Date(),
                    content: newUpdate.trim(),
                }),
            );
        };

        const handleCancelAdd = () => {
            setIsAdding(false);
            setNewUpdate("");
        };

        return isAdding ? (
            <div className="flex flex-col items-center space-y-2">
                <Input
                    variant="bordered"
                    placeholder="Write your new update here..."
                    autoFocus
                    minLength={1}
                    value={newUpdate}
                    onValueChange={(value) => {
                        setNewUpdate(value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleConfirmAdd();
                        } else if (e.key === "Escape") {
                            handleCancelAdd();
                        }
                    }}
                />
                <div className="flex flex-row justify-end space-x-2 w-full">
                    <Button
                        aria-label="Save"
                        variant="light"
                        size="sm"
                        color="success"
                        startContent={<IoMdCheckmark className="text-lg" />}
                        onPress={handleConfirmAdd}
                    >
                        Confirm
                    </Button>
                    <Button
                        aria-label="Cancel"
                        variant="flat"
                        size="sm"
                        color="danger"
                        startContent={<IoMdClose className="text-lg" />}
                        onPress={handleCancelAdd}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        ) : (
            <button
                onClick={() => setIsAdding(true)}
                className="flex flex-row items-center space-x-2 hover:opacity-80 active:opacity-60 active:scale-95 transition-transform-opacity duration-200"
            >
                <MdAddCircleOutline className="text-2xl text-light-400 dark:text-dark-400" />
                <span className="text-sm">
                    {renderInfoString("click to add")}
                </span>
            </button>
        );
    };

    const handleUpdateField = async <K extends keyof ApplicationDetail>(
        fieldKey: K,
        newValue: ApplicationDetail[K],
    ) => {
        // 1. Client-side validation
        // 1.1 Check if the applicationDetail is loaded
        if (!applicationDetail) {
            toast.error("There's no application loaded.");
            return;
        }

        // 1.2 id, appliedAt, updatedAt are not allowed to be updated
        if (
            fieldKey === "id" ||
            fieldKey === "appliedAt" ||
            fieldKey === "updatedAt"
        ) {
            toast.error(`Cannot update field ${fieldKey}`);
            return;
        }

        // 2. Send a PATCH request including the updated object
        const currentApplicationId = applicationDetail.id;
        const updatedField: Partial<ApplicationDetail> = {};
        updatedField[fieldKey] = newValue;

        const response = await patchApplicationDetailAction(
            currentApplicationId,
            updatedField,
        );

        // 3. Update the application detail state based on the response
        if (response.error) {
            toast.error(response.error);
            return;
        }

        if (response.message) {
            toast.success(response.message);
        }
    };

    return (
        <>
            {applicationDetail ? (
                <div className="max-w-[48rem] w-full flex flex-col space-y-6">
                    <Breadcrumbs>
                        <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
                        <BreadcrumbItem>
                            Application Detail - {applicationDetail.company}
                        </BreadcrumbItem>
                    </Breadcrumbs>

                    <div className="flex flex-row space-x-4 justify-between items-center">
                        <div className="flex flex-row space-x-4">
                            <EditableContent
                                fieldKey="title"
                                contentValue={applicationDetail.title}
                                contentComponent={({
                                    contentValue,
                                    onPress,
                                }) => (
                                    <EditTooltip onPress={onPress}>
                                        <h1 className="text-2xl font-semibold text-light-100 dark:text-dark-100">
                                            {contentValue}
                                        </h1>
                                    </EditTooltip>
                                )}
                            />
                        </div>
                        <div className="flex flex-row  items-center space-x-4">
                            <EditableContent
                                fieldKey="link"
                                contentValue={applicationDetail.link}
                                contentComponent={({ onPress }) => (
                                    <EditTooltip
                                        onPress={onPress}
                                        placement="top"
                                    >
                                        <NextUiLink
                                            isExternal
                                            isBlock
                                            showAnchorIcon
                                            anchorIcon={
                                                <AnchorIcon
                                                    width={20}
                                                    className="mx-2"
                                                />
                                            }
                                            href={applicationDetail.link}
                                            isDisabled={!applicationDetail.link}
                                        />
                                    </EditTooltip>
                                )}
                            />
                            <FavoriteToggle
                                isFavorite={applicationDetail.isFavorite}
                                onToggle={() =>
                                    handleUpdateField(
                                        "isFavorite",
                                        !applicationDetail.isFavorite,
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-light-200 dark:text-dark-200">
                        <div className="flex items-center space-x-4">
                            <EditableContent
                                fieldKey="company"
                                contentValue={applicationDetail.company}
                                contentComponent={({
                                    contentValue,
                                    onPress,
                                }) => (
                                    <EditTooltip
                                        onPress={onPress}
                                        placement="left"
                                    >
                                        <span className="text-lg font-medium">
                                            {contentValue}
                                        </span>
                                    </EditTooltip>
                                )}
                            />
                            <Divider className="h-5" orientation="vertical" />
                            <EditableContent
                                fieldKey="location"
                                contentValue={applicationDetail.location}
                                contentComponent={({
                                    contentValue,
                                    onPress,
                                }) => (
                                    <EditTooltip onPress={onPress}>
                                        <span className="text-lg font-medium">
                                            {contentValue}
                                        </span>
                                    </EditTooltip>
                                )}
                            />
                        </div>
                        <div className="flex flex-row text-sm space-x-2">
                            {renderSubTitle("Applied on:")}
                            {renderHighlightString(
                                dateToTwoDigitsString(
                                    applicationDetail.appliedAt,
                                ),
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            {renderSubTitle("Salary: ")}
                            <EditableContent
                                fieldKey="salary"
                                contentValue={applicationDetail.salary}
                                contentComponent={({
                                    contentValue,
                                    onPress,
                                }) => (
                                    <EditTooltip onPress={onPress}>
                                        {renderHighlightString(contentValue)}
                                    </EditTooltip>
                                )}
                            />
                        </div>
                        <div className="flex flex-row text-sm space-x-2">
                            {renderSubTitle("Last Updated:")}
                            {renderHighlightString(
                                dateToTwoDigitsString(
                                    applicationDetail.updatedAt,
                                ),
                            )}
                        </div>
                    </div>

                    <div className="flex flex-row space-x-4 items-center justify-center">
                        {/* Setting */}
                        <CustomDropdown
                            triggerType="chip"
                            label="Setting"
                            value={applicationDetail.setting}
                            valueOptions={settingOptions.map(
                                (setting) => setting,
                            )}
                            handleUpdate={(selectedKey) => {
                                handleUpdateField(
                                    "setting",
                                    selectedKey as JobSetting,
                                );
                            }}
                            colorMapper={() => "success"}
                            displayMapper={(value) => jobSettingMap[value]}
                        />

                        {/* Type */}
                        <CustomDropdown
                            triggerType="chip"
                            label="Type"
                            value={applicationDetail.type}
                            valueOptions={typeOptions.map((type) => type)}
                            handleUpdate={(selectedKey) => {
                                handleUpdateField(
                                    "type",
                                    selectedKey as JobType,
                                );
                            }}
                            colorMapper={() => "primary"}
                            displayMapper={(value) => jobTypeMap[value]}
                        />

                        {/* Level */}
                        <CustomDropdown
                            triggerType="chip"
                            label="Level"
                            value={applicationDetail.level}
                            valueOptions={levelOptions.map((level) => level)}
                            handleUpdate={(selectedKey) => {
                                handleUpdateField(
                                    "level",
                                    selectedKey as JobLevel,
                                );
                            }}
                            colorMapper={() => "warning"}
                            displayMapper={(value) => jobLevelMap[value]}
                        />

                        {/* Status */}
                        <CustomDropdown
                            triggerType="chip"
                            label="Status"
                            value={applicationDetail.status}
                            valueOptions={statusOptions.map((status) => status)}
                            handleUpdate={(selectedKey) => {
                                handleUpdateField(
                                    "status",
                                    selectedKey as JobStatus,
                                );
                            }}
                            colorMapper={(value) => statusColorMap[value]}
                            displayMapper={(value) => jobStatusMap[value]}
                        />

                        {/* Replied */}
                        <CustomDropdown
                            triggerType="chip"
                            label="Replied"
                            value={
                                applicationDetail.replied
                                    ? "Replied"
                                    : "No Reply"
                            }
                            valueOptions={repliedOptions}
                            handleUpdate={(selectedKey) => {
                                handleUpdateField(
                                    "replied",
                                    selectedKey === "Replied",
                                );
                            }}
                            colorMapper={(value) => repliedColorMap[value]}
                        />

                        {/* Interview Aquired */}
                        <CustomDropdown
                            triggerType="chip"
                            label="Interview Aquired"
                            value={
                                applicationDetail.interviewAquired
                                    ? "Interview Aquired"
                                    : "No Interview"
                            }
                            valueOptions={interviewAquiredOptions}
                            handleUpdate={(selectedKey) => {
                                handleUpdateField(
                                    "interviewAquired",
                                    selectedKey === "Interview Aquired",
                                );
                            }}
                            colorMapper={(value) => interviewColorMap[value]}
                        />
                    </div>

                    <Divider orientation="horizontal" />

                    <div className="flex flex-col space-y-4">
                        {renderSubTitle("Updates")}
                        <ul className="ml-3">
                            {applicationDetail.updates.map((update, index) => (
                                <li className="flex flex-col" key={index}>
                                    <div className="flex flex-row items-center space-x-2">
                                        <span>
                                            <MdUpdate className="text-2xl" />
                                        </span>
                                        <span className="text-sm space-x-2">
                                            {renderHighlightString(
                                                update.content,
                                            )}
                                            <span className="select-none">
                                                {renderHighlightString("·")}
                                            </span>
                                            <span className="text-sm ">
                                                {timeElapsed(update.date)}
                                            </span>
                                        </span>
                                    </div>
                                    <Divider
                                        className="h-4 ml-3 my-1"
                                        orientation="vertical"
                                    />
                                </li>
                            ))}
                            <AddUpdateContent />
                        </ul>
                    </div>
                </div>
            ) : (
                <Spinner label="Loading Application..." />
            )}
        </>
    );
}
