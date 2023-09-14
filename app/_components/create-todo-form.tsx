"use client";

import React, { useRef, useState } from "react";
import { createTodoAction } from "../_actions";
import { Button } from "@nextui-org/button";

export default function CreateTodoForm() {
    const formRef = useRef<HTMLFormElement>(null);

    async function formAction(data: FormData) {
        const title = data.get("title")?.valueOf();
        if (typeof title !== "string" || title.length === 0) return;

        await createTodoAction(title);
        formRef.current?.reset();
    }

    return (
        <form ref={formRef} action={formAction} className="flex gap-2 flex-col">
            <input
                type="text"
                name="title"
                className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100 "
            />
            <div className="flex justify-end gap-2">
                <Button
                    type="submit"
                    color="primary"
                    // className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 active:bg-slate-800 outline-none"
                >
                    Create
                </Button>
            </div>
        </form>
    );
}
