'use client'

import { useEffect, useState } from "react"
import { prisma } from "../_libs/db"
import { deleteTodoAction, getTodosAction, toggleTodoAction } from "@/_actions"
import TodoItem from "./todo-item"

interface Todo {
    id: string
    title: string
    isCompleted: boolean
    createdAt: Date
    updatedAt: Date
}

function TodoTable() {
    const [todos, setTodos] = useState<Todo[]>()

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await getTodosAction()
            console.log("Todo: ", response)
            setTodos(response)
        }
        fetchTodos()
    }, [])

    return (
        <ul className='pl-4'>
        {todos?.map( todo => (
          <TodoItem 
            key={todo.id} 
            {...todo} 
            toggleTodo={toggleTodoAction} 
            deleteTodo={deleteTodoAction} 
          />
        ))}
      </ul>
    )
}

export default TodoTable;
