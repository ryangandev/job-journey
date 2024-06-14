"use client";

import { createContext, useState, Dispatch, SetStateAction } from "react";
import { useDisclosure } from "@nextui-org/react";

type ConfirmModalProviderProps = {
    children: React.ReactNode;
};

type ConfirmModalContextProps = {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    question: string;
    setQuestion: Dispatch<SetStateAction<string>>;
    action: () => void | Promise<void>;
    setAction: Dispatch<SetStateAction<() => void | Promise<void>>>;
    onClose: () => void;
    setOnClose: Dispatch<SetStateAction<() => void>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

const ConfirmModalContext = createContext<ConfirmModalContextProps | null>(
    null,
);

export function ConfirmModalProvider({ children }: ConfirmModalProviderProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [title, setTitle] = useState<string>("");
    const [question, setQuestion] = useState<string>("");
    const [action, setAction] = useState<() => void | Promise<void>>(() => {});
    const [onClose, setOnClose] = useState<() => void>(() => {});
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <ConfirmModalContext.Provider
            value={{
                isOpen,
                onOpen,
                onOpenChange,
                title,
                setTitle,
                question,
                setQuestion,
                action,
                setAction,
                onClose,
                setOnClose,
                loading,
                setLoading,
            }}
        >
            {children}
        </ConfirmModalContext.Provider>
    );
}

export { ConfirmModalContext };
