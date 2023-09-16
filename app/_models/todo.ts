enum TodoFilterTypes {
    All = "all",
    Completed = "completed",
    Incomplete = "incomplete",
}

type TodoFilter =
    | TodoFilterTypes.All
    | TodoFilterTypes.Completed
    | TodoFilterTypes.Incomplete;

interface Todo {
    id: string;
    title: string;
    description: string | null;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export { TodoFilterTypes };
export type { Todo, TodoFilter };
