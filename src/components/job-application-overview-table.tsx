"use client";

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor,
} from "@nextui-org/react";
import { useState, useMemo, useCallback, Key } from "react";
import { columns, statusOptions, appliedJobs } from "../data/data";
import { AppliedJob } from "../models/applied-job";
import { capitalize } from "../libs/string-utils";
import {
    ChevronDownIcon,
    PlusIcon,
    SearchIcon,
    VerticalDotsIcon,
} from "../assets/svgs";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const statusColorMap: Record<string, ChipProps["color"]> = {
    applied: "warning",
    interviewing: "secondary",
    offered: "success",
    rejected: "danger",
    ghosted: "default",
};

const INITIAL_VISIBLE_COLUMNS = [
    "title",
    "company",
    "status",
    "replied",
    "interviewAquired",
    "appliedAt",
    "updatedAt",
    "actions",
];

export default function JobApplicationOverviewTable() {
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS),
    );
    const [statusFilter, setStatusFilter] = useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "appliedAt",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);
    const dateFormatOption: {
        month: "2-digit" | "numeric";
        day: "2-digit" | "numeric";
        year: "2-digit" | "numeric";
    } = {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
    };

    const pages = Math.ceil(appliedJobs.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid),
        );
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredAppliedJobs = [...appliedJobs];

        if (hasSearchFilter) {
            filteredAppliedJobs = filteredAppliedJobs.filter((appliedJob) =>
                appliedJob.company
                    .toLowerCase()
                    .includes(filterValue.toLowerCase()),
            );
        }

        if (
            statusFilter !== "all" &&
            Array.from(statusFilter).length !== statusOptions.length
        ) {
            filteredAppliedJobs = filteredAppliedJobs.filter((appliedJob) =>
                Array.from(statusFilter).includes(appliedJob.status),
            );
        }

        return filteredAppliedJobs;
    }, [appliedJobs, filterValue, statusFilter]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a: AppliedJob, b: AppliedJob) => {
            const first = a[sortDescriptor.column as keyof AppliedJob];
            const second = b[sortDescriptor.column as keyof AppliedJob];
            const cmp = first > second ? 1 : first < second ? -1 : 0;

            return sortDescriptor.direction === "ascending" ? cmp : -cmp;
        });
    }, [sortDescriptor, items]);

    const renderBooleanCell = useCallback((value: boolean) => {
        return value ? (
            <FaCheck className="text-green-500 text-medium" />
        ) : (
            <RxCross2 className="text-rose-500 text-large" />
        );
    }, []);

    const renderCell = useCallback((appliedJob: AppliedJob, columnKey: Key) => {
        const cellValue = appliedJob[columnKey as keyof AppliedJob];

        switch (columnKey) {
            case "company":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">
                            {cellValue as string}
                        </p>
                        <p className="text-bold text-tiny capitalize text-default-500">
                            {appliedJob.location}
                        </p>
                    </div>
                );
            case "title":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">
                            {cellValue as string}
                        </p>
                        <p className="text-bold text-tiny capitalize text-default-500">
                            {appliedJob.remote}
                        </p>
                    </div>
                );
            case "status":
                return (
                    <div>
                        <Chip
                            className="capitalize border-none gap-1 text-default-600"
                            color={statusColorMap[appliedJob.status]}
                            size="md"
                            variant="dot"
                        >
                            {cellValue as string}
                        </Chip>
                    </div>
                );
            case "replied":
                return (
                    <div className="flex pl-4">
                        {renderBooleanCell(cellValue as boolean)}
                    </div>
                );
            case "interviewAquired":
                return (
                    <div className="flex pl-4">
                        {renderBooleanCell(cellValue as boolean)}
                    </div>
                );
            case "appliedAt":
                return (
                    <div>
                        <p className="text-bold text-small">
                            {appliedJob.appliedAt.toLocaleDateString(
                                "en-US",
                                dateFormatOption,
                            )}
                        </p>
                    </div>
                );
            case "updatedAt":
                return (
                    <div>
                        <p className="text-bold text-small">
                            {appliedJob.updatedAt.toLocaleDateString(
                                "en-US",
                                dateFormatOption,
                            )}
                        </p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
                            <DropdownTrigger>
                                <Button
                                    isIconOnly
                                    radius="full"
                                    size="sm"
                                    variant="light"
                                >
                                    <VerticalDotsIcon
                                        className="text-default-400"
                                        width={undefined}
                                        height={undefined}
                                    />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem>View</DropdownItem>
                                <DropdownItem>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return <></>;
        }
    }, []);

    const onRowsPerPageChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setRowsPerPage(Number(e.target.value));
        },
        [],
    );

    const onSearchChange = useCallback((value: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[44%]",
                            inputWrapper: "border-1",
                        }}
                        placeholder="Search by company..."
                        size="md"
                        startContent={
                            <SearchIcon className="text-default-300" />
                        }
                        value={filterValue}
                        variant="bordered"
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={
                                        <ChevronDownIcon className="text-small" />
                                    }
                                    size="md"
                                    variant="flat"
                                >
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem
                                        key={status.uid}
                                        className="capitalize"
                                    >
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button
                            className="bg-foreground text-background"
                            endContent={
                                <PlusIcon
                                    width={undefined}
                                    height={undefined}
                                />
                            }
                            size="md"
                        >
                            Add New
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        Total {appliedJobs.length} applied jobs
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        appliedJobs.length,
        hasSearchFilter,
    ]);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    color="default"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant="light"
                    onChange={setPage}
                />
                <span className="text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${items.length} selected`}
                </span>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    const classNames = useMemo(
        () => ({
            wrapper: ["max-h-[382px]", "max-w-7xl"],
            th: [
                "bg-transparent",
                "text-default-500",
                "border-b",
                "border-divider",
            ],
            // td: [
            //     // changing the rows border radius
            //     // first
            //     "group-data-[first=true]:first:before:rounded-none",
            //     "group-data-[first=true]:last:before:rounded-none",
            //     // middle
            //     "group-data-[middle=true]:before:rounded-none",
            //     // last
            //     "group-data-[last=true]:first:before:rounded-none",
            //     "group-data-[last=true]:last:before:rounded-none",
            // ],
        }),
        [],
    );

    return (
        <Table
            isCompact={false}
            // removeWrapper
            fullWidth
            aria-label="Applied Jobs Table"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            checkboxesProps={{
                classNames: {
                    wrapper:
                        "after:bg-foreground after:text-background text-background",
                },
            }}
            classNames={classNames}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                        width={column.width}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                emptyContent={"There's no applied jobs to show."}
                items={sortedItems}
            >
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
