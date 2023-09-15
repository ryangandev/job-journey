"use client";

import { deleteTodoAction, toggleTodoAction } from "@/_actions";
import TodoItem from "./todo-item";

interface Todo {
    id: string;
    title: string;
    description: string | null;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

function TodoTable({ todos }: { todos: Todo[] }) {
    return (
        <ul className="space-y-4">
            {todos?.map((todo) => (
                <TodoItem
                    key={todo.id}
                    {...todo}
                    toggleTodo={toggleTodoAction}
                    deleteTodo={deleteTodoAction}
                />
            ))}
        </ul>
    );
}

export default TodoTable;
