import { useContext } from "react";
import { ConfirmModalContext } from "../providers/confirm-modal-provider";

const useConfirmModal = () => {
    const context = useContext(ConfirmModalContext);

    if (!context) {
        throw new Error(
            "useConfirmModal must be used within a ConfirmModalProvider",
        );
    }

    return context;
};

export default useConfirmModal;
