'use server'

import { prisma } from "@/_libs/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createTodoAction(data: FormData) {
    const title = data.get("title")?.valueOf()
    if (typeof title !== "string" || title.length === 0) return

    await prisma.todo.create({ data: { title, isCompleted: false}})
    revalidatePath('/')
}

export async function toggleTodoAction(id: string, isCompleted: boolean) {
    await prisma.todo.update({ where: { id }, data: { isCompleted }})
}

export async function deleteTodoAction(id: string) {
    await prisma.todo.delete({ where: { id }})
    revalidatePath('/')
}
