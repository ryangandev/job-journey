'use client';

import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import useConfirmModal from '../hooks/use-confirm-modal';

export default function ConfirmModal() {
  const {
    isOpen,
    onOpenChange,
    title,
    question,
    action,
    onClose,
    loading,
    setLoading,
  } = useConfirmModal();

  const handleConfirm = async (onClose: () => void) => {
    setLoading(true);
    try {
      const result = action();
      if (result instanceof Promise) {
        await result;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal
      placement="center"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      isDismissable={!loading}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p>{question}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                isDisabled={loading}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  handleConfirm(onClose);
                }}
                isDisabled={loading}
                isLoading={loading}
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
