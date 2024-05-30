"use client";

import React from "react";
import { Divider, Link as NextUiLink, Button } from "@nextui-org/react";
import {
    Application,
    JobLevel,
    JobSetting,
    JobStatus,
    JobType,
} from "@prisma/client";
import { IoIosAdd } from "react-icons/io";
import toast from "react-hot-toast";
import { z } from "zod";

import {
    ApplicationSchema,
    PartialApplicationSchema,
} from "../../schemas/application-schema";
import { patchApplicationDetailAction } from "../../actions/applications-actions";
import { dateToTwoDigitsString } from "../../libs/time-utils";
import { AnchorIcon } from "../../assets/svgs";
import FavoriteToggle from "../favorite-toggle";
import CustomDropdown from "../custom-dropdown";
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
import PopoverForm from "./popover-form";

type ApplicationWithUpdatableFields = z.infer<typeof ApplicationSchema>;

export default function ApplicationInfo({
    applicationDetail,
}: {
    applicationDetail: Application;
}) {
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

    const handleUpdateField = async <
        K extends keyof ApplicationWithUpdatableFields,
    >(
        fieldKey: K,
        newValue: ApplicationWithUpdatableFields[K],
    ) => {
        // 1. Client-side validation
        // 1.1 Validate the update using zod schema to ensure the update is on a valid field
        const result = PartialApplicationSchema.safeParse({
            [fieldKey]: newValue,
        });
        if (!result.success) {
            const issue = result.error.issues[0];
            toast.error("Field [" + issue.path[0] + "]: " + issue.message);
            return;
        }

        // 1.2 Ensure that only one field is being updated at a time
        const updateKeys = Object.keys(result.data);
        if (updateKeys.length !== 1) {
            toast.error("You should update exactly one field at a time.");
            return;
        }

        // 2. Send a PATCH request including the updated object
        const currentApplicationId = applicationDetail.id;
        const updatedField: Partial<ApplicationWithUpdatableFields> = {};
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
        <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
                <PopoverForm
                    formTitle="Edit Title Info"
                    originalValue={applicationDetail.title}
                    onConfirm={async (newValue) => {
                        await handleUpdateField("title", newValue);
                    }}
                    popoverTriggerComponent={
                        <h1 className="text-2xl font-semibold text-light-100 dark:text-dark-100">
                            {applicationDetail.title}
                        </h1>
                    }
                />
                <div className="flex items-center space-x-4">
                    {/* TODO: Delete Button */}
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
                    <PopoverForm
                        formTitle="Edit Company Info"
                        originalValue={applicationDetail.company}
                        onConfirm={async (newValue) => {
                            await handleUpdateField("company", newValue);
                        }}
                        popoverTriggerComponent={
                            <span className="text-lg font-medium">
                                {applicationDetail.company}
                            </span>
                        }
                    />
                    <Divider className="h-5" orientation="vertical" />
                    <PopoverForm
                        formTitle="Edit Location Info"
                        originalValue={applicationDetail.location}
                        onConfirm={async (newValue) => {
                            await handleUpdateField("location", newValue);
                        }}
                        popoverTriggerComponent={
                            <span className="text-lg font-medium">
                                {applicationDetail.location}
                            </span>
                        }
                    />
                </div>
                <div className="flex flex-row text-sm space-x-2">
                    {renderSubTitle("Applied on:")}
                    {renderHighlightString(
                        dateToTwoDigitsString(applicationDetail.appliedAt),
                    )}
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    {renderSubTitle("Salary: ")}
                    <PopoverForm
                        formTitle="Edit Salary Info"
                        originalValue={applicationDetail.salary}
                        onConfirm={async (newValue) => {
                            await handleUpdateField("salary", newValue);
                        }}
                        popoverTriggerComponent={renderHighlightString(
                            applicationDetail.salary
                                ? applicationDetail.salary
                                : "N/A [add salary info here]",
                        )}
                    />
                </div>
                <div className="flex flex-row text-sm space-x-2">
                    {renderSubTitle("Last Updated:")}
                    {renderHighlightString(
                        dateToTwoDigitsString(applicationDetail.updatedAt),
                    )}
                </div>
            </div>

            <div className="flex flex-row space-x-4 items-center justify-center">
                {/* Setting */}
                <CustomDropdown
                    triggerType="chip"
                    label="Setting"
                    value={applicationDetail.setting}
                    valueOptions={settingOptions}
                    handleUpdate={(selectedKey) => {
                        handleUpdateField("setting", selectedKey as JobSetting);
                    }}
                    colorMapper={() => "success"}
                    displayMapper={(value) => jobSettingMap[value]}
                />

                {/* Type */}
                <CustomDropdown
                    triggerType="chip"
                    label="Type"
                    value={applicationDetail.type}
                    valueOptions={typeOptions}
                    handleUpdate={(selectedKey) => {
                        handleUpdateField("type", selectedKey as JobType);
                    }}
                    colorMapper={() => "primary"}
                    displayMapper={(value) => jobTypeMap[value]}
                />

                {/* Level */}
                <CustomDropdown
                    triggerType="chip"
                    label="Level"
                    value={applicationDetail.level}
                    valueOptions={levelOptions}
                    handleUpdate={(selectedKey) => {
                        handleUpdateField("level", selectedKey as JobLevel);
                    }}
                    colorMapper={() => "warning"}
                    displayMapper={(value) => jobLevelMap[value]}
                />

                {/* Status */}
                <CustomDropdown
                    triggerType="chip"
                    label="Status"
                    value={applicationDetail.status}
                    valueOptions={statusOptions}
                    handleUpdate={(selectedKey) => {
                        handleUpdateField("status", selectedKey as JobStatus);
                    }}
                    colorMapper={(value) => statusColorMap[value]}
                    displayMapper={(value) => jobStatusMap[value]}
                />

                {/* Replied */}
                <CustomDropdown
                    triggerType="chip"
                    label="Replied"
                    value={applicationDetail.replied ? "Replied" : "No Reply"}
                    valueOptions={repliedOptions}
                    handleUpdate={(selectedKey) => {
                        handleUpdateField("replied", selectedKey === "Replied");
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

            <div className="flex flex-col space-y-2">
                {renderSubTitle("Job Posting Link")}
                <div className="flex space-x-2 items-center ml-3">
                    <PopoverForm
                        popoverPlacement="right"
                        formTitle="Edit Job Posting link"
                        originalValue={applicationDetail.jobPostingLink}
                        onConfirm={async (newValue) => {
                            await handleUpdateField("jobPostingLink", newValue);
                        }}
                        popoverTriggerComponent={
                            <button className="active:scale-95 rounded-sm transition-transform">
                                <AnchorIcon width={18} className="mx-1" />
                            </button>
                        }
                    />
                    <NextUiLink
                        isExternal
                        underline="hover"
                        href={applicationDetail.jobPostingLink}
                        isDisabled={!applicationDetail.jobPostingLink}
                    >
                        <span className="max-w-[44rem] break-words">
                            {applicationDetail.jobPostingLink ||
                                "[click the icon to add a link]"}
                        </span>
                    </NextUiLink>
                </div>
            </div>

            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                    {renderSubTitle("Status Tracking Links")}
                    <PopoverForm
                        popoverPlacement="right"
                        formTitle="Add a new status tracking link"
                        onConfirm={async (newValue) => {
                            await handleUpdateField("statusTrackingLinks", [
                                ...applicationDetail.statusTrackingLinks,
                                newValue,
                            ]);
                        }}
                        popoverTriggerComponent={
                            <Button
                                isIconOnly
                                variant="light"
                                color="secondary"
                                endContent={<IoIosAdd size={20} />}
                                size="sm"
                            />
                        }
                    />
                </div>
                <ul className="flex flex-col space-y-2 ml-3">
                    {applicationDetail.statusTrackingLinks.map(
                        (link, index) => (
                            <li
                                key={index}
                                className="flex items-center space-x-2"
                            >
                                <PopoverForm
                                    popoverPlacement="right"
                                    formTitle="Edit Status Tracking Link"
                                    originalValue={link}
                                    onConfirm={async (newValue) => {
                                        const updatedLinks = [
                                            ...applicationDetail.statusTrackingLinks,
                                        ];
                                        if (newValue.trim() === "") {
                                            updatedLinks.splice(index, 1); // Remove the link if the new value is empty
                                        } else {
                                            updatedLinks[index] = newValue; // Update the link
                                        }
                                        await handleUpdateField(
                                            "statusTrackingLinks",
                                            updatedLinks,
                                        );
                                    }}
                                    popoverTriggerComponent={
                                        <button className="active:scale-95 rounded-sm transition-transform">
                                            <AnchorIcon
                                                width={18}
                                                className="mx-1"
                                            />
                                        </button>
                                    }
                                />
                                <NextUiLink
                                    isExternal
                                    underline="hover"
                                    href={link}
                                >
                                    <span className="max-w-[44rem] break-words">
                                        {link}
                                    </span>
                                </NextUiLink>
                            </li>
                        ),
                    )}
                </ul>
            </div>
        </div>
    );
}
