"use client";

import { useEffect, useState } from "react";
import { ApplicationDetail } from "../../../models/application";
import { getSpecificApplicationDetailByIdAction } from "../../../actions/applications-actions";
import { dateToTwoDigitsString, timeElapsed } from "../../../libs/time-utils";
import {
    Divider,
    Chip,
    ChipProps,
    Link as NextUiLink,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Breadcrumbs,
    BreadcrumbItem,
    Spinner,
} from "@nextui-org/react";
import FavoriteToggle from "../../../components/favorite-toggle";
import {
    jobSettingMap,
    jobTypeMap,
    jobLevelMap,
    statusColorMap,
    statusOptions,
} from "../../../data/application";
import { capitalize } from "../../../libs/string-utils";
import { MdUpdate, MdAddCircleOutline } from "react-icons/md";
import { AnchorIcon } from "../../../assets/svgs";
import toast from "react-hot-toast";

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const [applicationDetail, setApplicationDetail] = useState<
        ApplicationDetail | undefined
    >();

    useEffect(() => {
        const fetchApplicationDetail = async () => {
            const response = await getSpecificApplicationDetailByIdAction(slug);
            if ("error" in response) {
                toast.error(response.error);
                return;
            }

            setApplicationDetail(response);
        };

        fetchApplicationDetail();
    }, []);

    const renderDetailTitle = (title: string) => {
        return <h2 className="text-light-300 dark:text-dark-300">{title}</h2>;
    };

    const renderHighlightString = (content: string) => {
        return (
            <span className="text-light-100 dark:text-dark-100">{content}</span>
        );
    };

    const renderChipContent = (content: string, color: ChipProps["color"]) => {
        return (
            <Chip
                size="md"
                variant="flat"
                color={color}
                className="text-sm p-2 cursor-default select-none"
            >
                {capitalize(content)}
            </Chip>
        );
    };

    const handleToggleUpdate = () => {};

    const handleAddNewUpdate = () => {};

    return (
        <main className="w-screen flex justify-center py-10 px-4">
            {applicationDetail ? (
                <div className="max-w-[48rem] w-full flex flex-col space-y-6">
                    <Breadcrumbs>
                        <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
                        <BreadcrumbItem>
                            Application Detail - {applicationDetail.company}
                        </BreadcrumbItem>
                    </Breadcrumbs>

                    <div className="flex flex-row space-x-4 justify-between items-center">
                        <h1 className="text-2xl font-semibold text-light-100 dark:text-dark-100">
                            {applicationDetail.title}
                        </h1>
                        <FavoriteToggle
                            isFavorite={applicationDetail.isFavorite}
                            onToggle={handleToggleUpdate}
                        />
                    </div>

                    <div className="flex justify-between text-light-200 dark:text-dark-200">
                        <div className="flex items-center space-x-4">
                            <span className="text-lg font-medium">
                                {applicationDetail.company}
                            </span>
                            <Divider className="h-5" orientation="vertical" />
                            <span className="text-lg font-medium">
                                {applicationDetail.location}
                            </span>
                        </div>
                        <div className="flex flex-row text-sm space-x-2">
                            {renderDetailTitle("Applied on:")}
                            {renderHighlightString(
                                dateToTwoDigitsString(
                                    applicationDetail.appliedAt,
                                ),
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex items-center space-x-4">
                            {renderChipContent(
                                jobSettingMap[applicationDetail.setting],
                                "success",
                            )}
                            {renderChipContent(
                                jobTypeMap[applicationDetail.type],
                                "secondary",
                            )}
                            {renderChipContent(
                                jobLevelMap[applicationDetail.level],
                                "warning",
                            )}
                            {renderChipContent(
                                applicationDetail.salary,
                                "danger",
                            )}
                        </div>
                        <div className="flex flex-row text-sm space-x-2">
                            {renderDetailTitle("Last Updated:")}
                            {renderHighlightString(
                                dateToTwoDigitsString(
                                    applicationDetail.updatedAt,
                                ),
                            )}
                        </div>
                    </div>

                    <div className="flex flex-row space-x-4 items-center">
                        {/* Status */}
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                    color={
                                        statusColorMap[applicationDetail.status]
                                    }
                                >
                                    {capitalize(applicationDetail.status)}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Status Selection"
                                closeOnSelect={true}
                                selectedKeys={[applicationDetail.status]}
                                selectionMode="single"
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid}>
                                        {status.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Divider className="h-5" orientation="vertical" />
                        {/* Replied */}
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                    color={
                                        applicationDetail.replied
                                            ? "warning"
                                            : "default"
                                    }
                                >
                                    {applicationDetail.replied
                                        ? "Replied"
                                        : "No Reply"}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Replied Selection"
                                closeOnSelect={true}
                                selectedKeys={[
                                    applicationDetail.replied
                                        ? "Replied"
                                        : "No Reply",
                                ]}
                                selectionMode="single"
                            >
                                <DropdownItem key={"Replied"}>
                                    Replied
                                </DropdownItem>
                                <DropdownItem key={"No Reply"}>
                                    No Reply
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Divider className="h-5" orientation="vertical" />
                        {/* Interview Aquired */}
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                    color={
                                        applicationDetail.interviewAquired
                                            ? "success"
                                            : "default"
                                    }
                                >
                                    {applicationDetail.interviewAquired
                                        ? "Interview Aquired"
                                        : "No Interview"}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Interview Aquired Selection"
                                closeOnSelect={true}
                                selectedKeys={[
                                    applicationDetail.interviewAquired
                                        ? "Interview Aquired"
                                        : "No Interview",
                                ]}
                                selectionMode="single"
                            >
                                <DropdownItem key={"Interview Aquired"}>
                                    Interview Aquired
                                </DropdownItem>
                                <DropdownItem key={"No Interview"}>
                                    No Interview
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Divider className="h-5" orientation="vertical" />
                        {/* Job Link */}
                        <NextUiLink
                            className="pl-4"
                            isExternal
                            isBlock
                            showAnchorIcon
                            anchorIcon={
                                <AnchorIcon width={20} className="mx-2" />
                            }
                            href={applicationDetail.link}
                            isDisabled={!applicationDetail.link}
                        >
                            Job Link
                        </NextUiLink>
                    </div>
                    <Divider orientation="horizontal" />
                    <div className="flex flex-col space-y-4">
                        {renderDetailTitle("Updates")}
                        <ul className="ml-3">
                            {applicationDetail.updates.map((update, index) => (
                                <li className="flex flex-col" key={index}>
                                    <div className="flex flex-row items-center space-x-2">
                                        <MdUpdate className="text-2xl" />
                                        <span className="text-sm ">
                                            {renderHighlightString(
                                                update.content,
                                            )}
                                        </span>
                                        {renderHighlightString("·")}
                                        <span className="text-sm text-light-400 dark:text-dark-400">
                                            {timeElapsed(update.date)}
                                        </span>
                                    </div>
                                    <Divider
                                        className="h-4 ml-3 my-1"
                                        orientation="vertical"
                                    />
                                </li>
                            ))}
                            <button
                                onClick={handleAddNewUpdate}
                                className="flex flex-row items-center space-x-2 hover:opacity-80 active:opacity-60 active:scale-95 transition-transform-opacity duration-200"
                            >
                                <MdAddCircleOutline className="text-2xl text-light-400 dark:text-dark-400" />
                                <span className="text-sm text-light-400 dark:text-dark-400">
                                    click to add
                                </span>
                            </button>
                        </ul>
                    </div>
                </div>
            ) : (
                <Spinner label="Loading Application..." />
            )}
        </main>
    );
}
