'use server'

import { prisma } from "./_libs/db"
import { redirect } from "next/navigation"

export async function createTodoAction(data: FormData) {
    const title = data.get("title")?.valueOf()
    if (typeof title !== "string" || title.length === 0) return

    await prisma.todo.create({ data: { title, isCompleted: false}})
    redirect("/")
}