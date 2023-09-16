"use client";

import { deleteTodoAction, toggleTodoAction } from "@/_actions";
import TodoItem from "./todo-item";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import { Todo } from "@/_models/todo";

function TodoTable({ todos }: { todos: Todo[] }) {
    return (
        <Card className="w-full sm:w-3/4">
            <CardHeader className="px-4 dark:bg-slate-900 gap-4">
                <Button
                    endContent={<AiOutlineCheck className="text-sm" />}
                    color="success"
                    variant="ghost"
                    size="sm"
                >
                    Mark All
                </Button>
                <Button
                    endContent={<AiOutlineDelete className="text-sm" />}
                    color="danger"
                    variant="ghost"
                    size="sm"
                >
                    Delete All
                </Button>
            </CardHeader>
            <CardBody className="p-[1px] dark:bg-slate-900">
                {todos?.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        {...todo}
                        toggleTodo={toggleTodoAction}
                        deleteTodo={deleteTodoAction}
                    />
                ))}
            </CardBody>
            <CardFooter className="text-xs font-mono justify-end dark:bg-slate-900">
                <span>
                    Total Todos: {todos.length}; Completed:{" "}
                    {todos.filter((todo) => todo.isCompleted).length};
                    Incomplete:{" "}
                    {todos.filter((todo) => !todo.isCompleted).length}
                </span>
            </CardFooter>
        </Card>
    );
}

export default TodoTable;
