import CreateTodoForm from '@/_components/create-todo-form'
import TodoTable from "@/_components/todo-table"
import { getTodosAction } from "@/_actions"

export default async function Home() {
    const todos = await getTodosAction()

    return (
        <>
            <header className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl'>Todos</h1>
            </header>
            <CreateTodoForm />
            <TodoTable todos={todos} />
        </>
    )
}
