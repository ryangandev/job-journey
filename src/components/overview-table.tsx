"use client";

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/table";
import { useState, useMemo, useCallback } from "react";

const INITIAL_VISIBLE_COLUMNS = [
    "title",
    "company",
    "location",
    "status",
    "replied",
    "appliedAt",
];

export default function OverviewTable() {
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(
        new Set(INITIAL_VISIBLE_COLUMNS),
    );
    const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "appliedAt",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);

    // const pages = Math.ceil(appliedJobs.length / rowsPerPage); // TODO: import appliedJobs

    const hasSearchFilter = Boolean(filterValue);

    // const headerCOlumns = useMemo(() => {
    //     return columns.filter((column) => Array.from(visibleColumns).includes(column));
    // }, [visibleColumns]); // TODO: import columns

    return <div className="flex flex-col gap-4"></div>;
}
