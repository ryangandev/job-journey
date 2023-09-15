import CreateTodoForm from "@/_components/create-todo-form";
import TodoTable from "@/_components/todo-table";
import { getTodosAction } from "@/_actions";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

export default async function Home() {
    const todos = await getTodosAction();

    return (
        <Card className="w-full lg:w-[1000px] h-[600px]">
            <CardHeader className="flex gap-4 items-center">
                <h1 className="text-2xl font-extrabold">Todo Dashboard</h1>
                <CreateTodoForm />
            </CardHeader>
            <CardBody className="">
                <TodoTable todos={todos} />
            </CardBody>
        </Card>
    );
}
