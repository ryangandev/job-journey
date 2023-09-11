"use client";

interface TodoItemProps {
    id: string;
    title: string;
    isCompleted: boolean;
    toggleTodo: (id: string, isCompleted: boolean) => void;
    deleteTodo: (id: string) => void;
}

function TodoItem({
    id,
    title,
    isCompleted,
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
