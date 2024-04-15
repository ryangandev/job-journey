import React, { cloneElement } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";

interface ConfirmModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    title: string;
    confirmQuestion: string;
    onConfirm: () => void;
}

export default function ConfirmModal({
    isOpen,
    onOpenChange,
    title,
    confirmQuestion,
    onConfirm,
}: ConfirmModalProps) {
    return (
        <Modal
            placement="center"
            backdrop="blur"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {title}
                        </ModalHeader>
                        <ModalBody>
                            <p>{confirmQuestion}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                onPress={() => {
                                    onConfirm();
                                    onClose();
                                }}
                            >
                                Confirm
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
