'use client';

import React from 'react';
import { InterviewQuestionType } from '@prisma/client';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  useDisclosure,
} from '@nextui-org/react';

import {
  interviewQuestionTypeColorMap,
  interviewQuestionTypeMap,
} from '../../data/interview-questions';
import QuestionModal from './question-modal';
import { highlightText } from '../../libs/highlight-text';

type QuestionProps = {
  questionId: string;
  type: InterviewQuestionType;
  question: string;
  answer: string;
  highlight: string;
};

export default function Question({
  questionId,
  type,
  question,
  answer,
  highlight,
}: QuestionProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card
        className="px-4"
        isHoverable
        isPressable
        fullWidth
        shadow="sm"
        disableRipple
        onPress={() => {
          onOpen();
        }}
      >
        <CardHeader className="pb-1 pt-2">
          <p className="line-clamp-2 text-left text-xl font-semibold">
            Q: {highlightText(question, highlight)}
          </p>
        </CardHeader>
        <CardBody className="py-1">
          <p className="line-clamp-2 indent-7">
            {answer ? highlightText(answer, highlight) : 'Enter your answer...'}
          </p>
        </CardBody>
        <CardFooter className="pb-2 pt-1">
          <Chip color={interviewQuestionTypeColorMap[type]}>
            {interviewQuestionTypeMap[type]}
          </Chip>
        </CardFooter>
      </Card>
      <QuestionModal
        questionId={questionId}
        type={type}
        question={question}
        answer={answer}
        highlight={highlight}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
