"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { useState } from "react";
import { TodoFilter } from "@/_models/todo";

interface FilterTableProps {}

export default function FilterTable({}: FilterTableProps) {
    const [selected, setSelected] = useState("all");

    return (
        <Card className="w-1/4">
            <CardHeader>Filter</CardHeader>
            <CardBody className="">
                <RadioGroup value={selected} onValueChange={setSelected}>
                    <Radio value="all">All</Radio>
                    <Radio value="completed">Completed</Radio>
                    <Radio value="incomplete">Incomplete</Radio>
                </RadioGroup>
            </CardBody>
        </Card>
    );
}
