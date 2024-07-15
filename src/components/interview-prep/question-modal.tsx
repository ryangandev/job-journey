'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { GoPencil, GoTrash } from 'react-icons/go';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Textarea,
} from '@nextui-org/react';
import { InterviewQuestionType } from '@prisma/client';

import {
  updateInterviewQuestionAction,
  deleteInterviewQuestionAction,
} from '../../actions/interview-prep-actions';
import {
  interviewQuestionTypeColorMap,
  interviewQuestionTypeMap,
  interviewQuestionTypeOptions,
} from '../../data/interview-questions';
import useConfirmModal from '../../hooks/use-confirm-modal';
import { highlightText } from '../../libs/highlight-text';
import { InterviewQuestionUpdateSchema } from '../../schemas/interview-prep-schema';

type QuestionModalProps = {
  questionId: string;
  type: InterviewQuestionType;
  question: string;
  answer: string;
  highlight: string;
  isOpen: boolean;
  onOpenChange: () => void;
};

export default function QuestionModal({
  questionId,
  type,
  question,
  answer,
  highlight,
  isOpen,
  onOpenChange,
}: QuestionModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm<z.infer<typeof InterviewQuestionUpdateSchema>>({
    resolver: zodResolver(InterviewQuestionUpdateSchema),
    defaultValues: {
      questionId: questionId,
      type: type,
      question: question,
      answer: answer,
    },
  });
  const { onOpen, setTitle, setQuestion, setAction } = useConfirmModal();

  const formatAndHighlightText = (text: string, highlight: string) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {highlightText(line, highlight)}
        <br />
      </React.Fragment>
    ));
  };

  const handleOnCancel = () => {
    setIsEditing(false);
    reset();
  };

  const handleOnSubmit = async (
    interviewQuestionUpdateData: z.infer<typeof InterviewQuestionUpdateSchema>,
  ) => {
    const responsne = await updateInterviewQuestionAction(
      interviewQuestionUpdateData,
    );
    if (responsne.error) {
      toast.error(responsne.error);
      return;
    }
    if (responsne.message) {
      toast.success(responsne.message);
      reset();
      setIsEditing(false);
    }
  };

  const handleDelete = async (questionId: string) => {
    const responsne = await deleteInterviewQuestionAction(questionId);
    if (responsne.error) {
      toast.error(responsne.error);
      return;
    }
    if (responsne.message) {
      toast.success(responsne.message);
      reset();
      setIsEditing(false);
    }
  };

  const handleDeleteRequest = (id: string) => {
    setTitle('Delete Question');
    setQuestion('Are you sure you want to delete this question?');
    setAction(() => async () => await handleDelete(id));
    onOpen();
  };

  return (
    <Modal
      size="3xl"
      placement="center"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleOnCancel}
      scrollBehavior="outside"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <ModalHeader className="flex flex-col space-y-3 pb-1 pt-6">
              {isEditing ? (
                <Input
                  {...register('question')}
                  label="Question"
                  variant="bordered"
                />
              ) : (
                <p className="text-xl font-semibold">
                  Q: {highlightText(question, highlight)}
                </p>
              )}
              <div className="flex flex-row space-x-2">
                {!isEditing ? (
                  <Chip color={interviewQuestionTypeColorMap[type]}>
                    {interviewQuestionTypeMap[type]}
                  </Chip>
                ) : (
                  <Controller
                    control={control}
                    name="type"
                    render={({ field }) => (
                      <RadioGroup
                        orientation="horizontal"
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        {interviewQuestionTypeOptions.map((questionType) => (
                          <Radio key={questionType} value={questionType}>
                            {
                              interviewQuestionTypeMap[
                                questionType as InterviewQuestionType
                              ]
                            }
                          </Radio>
                        ))}
                      </RadioGroup>
                    )}
                  />
                )}
              </div>
            </ModalHeader>
            <ModalBody className="py-1">
              {isEditing ? (
                <Textarea
                  {...register('answer')}
                  label="Answer"
                  variant="bordered"
                />
              ) : (
                <p>
                  {answer
                    ? formatAndHighlightText(answer, highlight)
                    : 'Enter your answer...'}
                </p>
              )}
            </ModalBody>
            <ModalFooter className="pt-2">
              {!isEditing ? (
                <span className="flex flex-row space-x-2">
                  <Button
                    color="warning"
                    variant="light"
                    onPress={() => setIsEditing(true)}
                    isDisabled={isSubmitting || isEditing}
                    isIconOnly
                    size="sm"
                  >
                    <GoPencil size={20} />
                  </Button>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => handleDeleteRequest(questionId)}
                    isDisabled={isSubmitting || isEditing}
                    isIconOnly
                    size="sm"
                  >
                    <GoTrash size={20} />
                  </Button>
                </span>
              ) : (
                <span className="flex flex-row space-x-2">
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => setIsEditing(false)}
                    isDisabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="success"
                    variant="flat"
                    type="submit"
                    isDisabled={isSubmitting || !isValid || !isDirty}
                    isLoading={isSubmitting}
                  >
                    Update
                  </Button>
                </span>
              )}
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
