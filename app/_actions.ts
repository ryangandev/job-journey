"use server";

import { prisma } from "@/_libs/db";
import { revalidatePath } from "next/cache";

export async function getTodosAction() {
    const todos = await prisma.todo.findMany();
    return todos;
}

export async function createTodoAction(title: string, description: string) {
    await prisma.todo.create({
        data: { title, description, isCompleted: false },
    });
    revalidatePath("/");
}

export async function toggleTodoAction(id: string, isCompleted: boolean) {
    await prisma.todo.update({ where: { id }, data: { isCompleted } });
    revalidatePath("/");
}

export async function deleteTodoAction(id: string) {
    await prisma.todo.delete({ where: { id } });
    revalidatePath("/");
}
