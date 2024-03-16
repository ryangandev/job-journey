import CreateTodoForm from "../components/create-todo-form";
import TodoTable from "../components/todo-table";
import { getTodosAction } from "../actions/actions";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import ThemeSwitch from "../components/theme-switch";

export default async function Home() {
    const todos = await getTodosAction();

    return <>helloworld</>;
}
