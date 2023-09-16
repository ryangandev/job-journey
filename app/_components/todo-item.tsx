"use client";

import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import "../_styles/animations.css";

interface TodoItemProps {
    id: string;
    title: string;
    description: string | null;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    toggleTodo: (id: string, isCompleted: boolean) => void;
    deleteTodo: (id: string) => void;
}

function TodoItem({
    id,
    title,
    description,
    isCompleted,
    createdAt,
    updatedAt,
    toggleTodo,
    deleteTodo,
}: TodoItemProps) {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = (todoId: string) => {
        setDeleting(true);
        setTimeout(() => {
            deleteTodo(todoId);
        }, 500); // This should match the animation duration
    };

    return (
        <li
            className={`flex ${
                isCompleted
                    ? "bg-slate-200 dark:bg-slate-800"
                    : "bg-white dark:bg-slate-900"
            } justify-between gap-1 items-center border-b border-slate-400 border-opacity-40 px-4 py-1 
            hover:z-50 hover:outline hover:outline-gray-400 hover:shadow-2xl transition-background
            ${deleting ? "fade-out-left" : ""}`}
        >
            <Checkbox
                id={id}
                className="gap-4"
                lineThrough={isCompleted}
                defaultSelected={isCompleted}
                onChange={(e) => toggleTodo(id, e.target.checked)}
            >
                <span className="px-1 line-clamp-1 font-extralight">
                    {title}
                </span>
            </Checkbox>

            <Button
                className=""
                onClick={() => handleDelete(id)}
                isIconOnly
                color="danger"
                variant="light"
            >
                <AiOutlineDelete className="text-xl" />
            </Button>
        </li>
    );
}

export default TodoItem;
