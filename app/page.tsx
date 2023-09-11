import { prisma } from "./_libs/db"
import TodoItem from './_components/todo-item'
import { toggleTodoAction, deleteTodoAction } from './_actions'
import CreateTodoForm from './_components/create-todo-form'
import TodoTable from "./_components/todo-table"

function getTodos(){
  return prisma.todo.findMany()
}

export default async function Home() {
  const todos = await getTodos()
  console.log("todos are: ", todos)
  return (
    <>
      <header className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl'>Todos</h1>
      </header>
      <CreateTodoForm />
      <ul className='pl-4'>
        {todos.map( todo => (
          <TodoItem 
            key={todo.id} 
            {...todo} 
            toggleTodo={toggleTodoAction} 
            deleteTodo={deleteTodoAction} 
          />
        ))}
      </ul>
      <TodoTable />
    </>
  )
}
