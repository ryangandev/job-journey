"use client";

import React from "react";
import { createTodoAction } from "../_actions";
import { Button } from "@nextui-org/button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Input,
    Textarea,
} from "@nextui-org/react";
import { FcTodoList } from "react-icons/fc";

export default function CreateTodoForm() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    async function formAction(data: FormData, onClose: () => void) {
        const title = data.get("title")?.valueOf();
        const description = data.get("description")?.valueOf();
        if (
            typeof title !== "string" ||
            typeof description !== "string" ||
            title.length === 0
        )
            return;

        await createTodoAction(title, description);
        onClose();
    }

    return (
        <>
            <Button
                className="text-md text-slate-50"
                onPress={onOpen}
                endContent={<AiOutlinePlusCircle className="text-xl" />}
                size="sm"
                color="warning"
                variant="ghost"
                radius="md"
            >
                Create
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Create New Todo
                            </ModalHeader>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(
                                        e.target as HTMLFormElement,
                                    );
                                    formAction(formData, onClose);
                                }}
                            >
                                <ModalBody>
                                    <Input
                                        name="title"
                                        autoFocus
                                        endContent={
                                            <FcTodoList className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Todo Title"
                                        placeholder="Enter your new todo"
                                        variant="bordered"
                                    />
                                    <Textarea
                                        name="description"
                                        autoFocus
                                        label="Todo Description (Optinoal)"
                                        placeholder="Enter your Todo Description"
                                        variant="bordered"
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="flat"
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        // onPress={onClose}
                                    >
                                        Create
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
