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
    SortDescriptor,
    Spinner,
    Divider,
} from "@nextui-org/react";
import { useState, useMemo, useCallback, Key, useEffect } from "react";
import {
    columns,
    jobLevelMap,
    jobSettingMap,
    jobTypeMap,
    statusColorMap,
    statusOptions,
} from "../../data/application";
import { Application } from "../../models/application";
import {
    ChevronDownIcon,
    PlusIcon,
    SearchIcon,
    VerticalDotsIcon,
} from "../../assets/svgs";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useRouter } from "next/navigation";
import { getApplicationsListAction } from "../../actions/applications-actions";
import { dateToTwoDigitsString } from "../../libs/time-utils";

const INITIAL_VISIBLE_COLUMNS = [
    "isFavorite",
    "company",
    "title",
    "status",
    "replied",
    "interviewAquired",
    "appliedAt",
    "updatedAt",
    "actions",
];

export default function ApplicationsDashboard() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS),
    );
    const [statusFilter, setStatusFilter] = useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "appliedAt",
        direction: "descending",
    });
    const [page, setPage] = useState(1);
    const router = useRouter();

    useEffect(() => {
        const fetchApplications = async () => {
            const applications = await getApplicationsListAction();
            setApplications(applications);
            setLoading(false);
        };

        fetchApplications();
    }, []);

    const pages = Math.ceil(applications.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid),
        );
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredApplications = [...applications];

        if (hasSearchFilter) {
            filteredApplications = filteredApplications.filter((application) =>
                application.company
                    .toLowerCase()
                    .includes(filterValue.toLowerCase()),
            );
        }

        if (
            statusFilter !== "all" &&
            Array.from(statusFilter).length !== statusOptions.length
        ) {
            filteredApplications = filteredApplications.filter((application) =>
                Array.from(statusFilter).includes(application.status),
            );
        }

        return filteredApplications;
    }, [applications, filterValue, statusFilter]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a: Application, b: Application) => {
            const first = a[sortDescriptor.column as keyof Application];
            const second = b[sortDescriptor.column as keyof Application];
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

    const renderCell = useCallback(
        (application: Application, columnKey: Key) => {
            const cellValue = application[columnKey as keyof Application];

            switch (columnKey) {
                case "isFavorite":
                    return (
                        <div>
                            {application.isFavorite ? (
                                <MdFavorite className="text-red-500 text-lg" />
                            ) : (
                                <MdFavoriteBorder className="text-light-200 dark:text-dark-200 text-lg" />
                            )}
                        </div>
                    );
                case "title":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-small capitalize">
                                {cellValue as string}
                            </p>
                            <div className="flex flex-row items-center space-x-2">
                                <span className="text-bold text-tiny caspanitalize text-default-500">
                                    {jobSettingMap[application.setting]}
                                </span>
                                <Divider
                                    className="h-2"
                                    orientation="vertical"
                                />
                                <span className="text-bold text-tiny capitalize text-default-500">
                                    {jobTypeMap[application.type]}
                                </span>
                                <Divider
                                    className="h-2"
                                    orientation="vertical"
                                />
                                <span className="text-bold text-tiny capitalize text-default-500">
                                    {jobLevelMap[application.level]}
                                </span>
                            </div>
                        </div>
                    );
                case "company":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-small capitalize">
                                {cellValue as string}
                            </p>
                            <p className="text-bold text-tiny capitalize text-default-500">
                                {application.location}
                            </p>
                        </div>
                    );
                case "status":
                    return (
                        <div>
                            <Chip
                                className="capitalize border-none gap-1 text-default-600"
                                color={statusColorMap[application.status]}
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
                                {dateToTwoDigitsString(application.appliedAt)}
                            </p>
                        </div>
                    );
                case "updatedAt":
                    return (
                        <div>
                            <p className="text-bold text-small">
                                {dateToTwoDigitsString(application.updatedAt)}
                            </p>
                        </div>
                    );
                case "actions":
                    return (
                        <div className="relative flex justify-end items-center gap-2">
                            <Dropdown>
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
                                <DropdownMenu aria-label="Actions Menu">
                                    <DropdownItem
                                        onClick={() => {
                                            router.push(
                                                `/application-detail/${application.id}`,
                                            );
                                        }}
                                    >
                                        View
                                    </DropdownItem>
                                    <DropdownItem>Delete</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    );
                default:
                    return <></>;
            }
        },
        [],
    );

    const handleOnRowsPerPageChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setRowsPerPage(Number(e.target.value));
        },
        [],
    );

    const handleOnSearchChange = useCallback((value: string) => {
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
                        onValueChange={handleOnSearchChange}
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
                                    <DropdownItem key={status.uid}>
                                        {status.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button
                            className="bg-foreground text-background"
                            onPress={() => router.push("/add-new-application")}
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
                        Total {applications.length} applications
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={handleOnRowsPerPageChange}
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
        handleOnSearchChange,
        handleOnRowsPerPageChange,
        applications.length,
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
                {/* <span className="text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${items.length} selected`}
                </span> */}
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    const classNames = useMemo(
        () => ({
            wrapper: ["max-h-5xl", "max-w-7xl", "min-h-[280px]"],
            th: [
                "bg-transparent",
                "text-default-500",
                "border-b",
                "border-divider",
            ],
            td: [
                // changing the rows border radius
                // first
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                // middle
                "group-data-[middle=true]:before:rounded-none",
                // last
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        [],
    );

    return (
        <Table
            isCompact={false}
            removeWrapper
            fullWidth
            aria-label="Applications Dashboard"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            // checkboxesProps={{
            //     classNames: {
            //         wrapper:
            //             "after:bg-foreground after:text-background text-background",
            //     },
            // }}
            classNames={classNames}
            selectedKeys={selectedKeys}
            // selectionMode="multiple"
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
                isLoading={loading}
                loadingContent={<Spinner label="Loading job applications..." />}
                emptyContent={loading ? "" : "There's no applications to show."}
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
