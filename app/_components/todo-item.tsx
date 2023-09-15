"use client";

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
    return (
        <li className="flex gap-1 items-center">
            <input
                id={id}
                type="checkbox"
                className="cursor-pointer peer"
                defaultChecked={isCompleted}
                onChange={(e) => toggleTodo(id, e.target.checked)}
            />
            <label
                htmlFor={id}
                className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
            >
                {title}
            </label>
            <p>{description}</p>
            <span suppressHydrationWarning>
                Created at: {createdAt.toLocaleString()}
            </span>
            <span suppressHydrationWarning>
                Updated at: {updatedAt.toLocaleString()}
            </span>
            <button
                className="border py-1 px-2 rounded-md ml-8"
                onClick={(e) => deleteTodo(id)}
            >
                Delete
            </button>
        </li>
    );
}

export default TodoItem;
