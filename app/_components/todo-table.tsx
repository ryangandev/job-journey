'use client'

import { useEffect, useState } from "react"
import { prisma } from "../_libs/db"

function TodoTable() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await prisma.todo.findMany()
            console.log("Todo: ", response)
        }

        fetchTodos()
    }, [])

    return (
        <div>

        </div>
    )
}

export default TodoTable;
