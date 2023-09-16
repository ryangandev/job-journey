import CreateTodoForm from "@/_components/create-todo-form";
import TodoTable from "@/_components/todo-table";
import { getTodosAction } from "@/_actions";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Timer from "./_components/timer";
import ThemeSwitch from "./_components/theme-switch";
import FilterTable from "./_components/filter-table";

export default async function Home() {
    const todos = await getTodosAction();

    return (
        <Card className="w-full lg:w-[1000px] h-[600px] bg-slate-200 dark:bg-slate-950 outline-dashed">
            <CardHeader className="flex items-center justify-between px-5 pt-5 pb-0">
                <div className="flex gap-2">
                    <h1 className="text-2xl font-extrabold">Todo Dashboard</h1>
                    <CreateTodoForm />
                    <ThemeSwitch />
                </div>
                <h1 className="text-md font-light">
                    <Timer />
                </h1>
            </CardHeader>
            <CardBody className="flex flex-row gap-5">
                <TodoTable todos={todos} />
                <FilterTable />
            </CardBody>
        </Card>
    );
}
