import { ChipProps } from '@nextui-org/react';
import { InterviewQuestionType } from '@prisma/client';

export const interviewQuestionTypeOptions = [
  'behavioral',
  'technical',
  'company',
];

export const interviewQuestionTypeMap: Record<InterviewQuestionType, string> = {
  behavioral: 'Behavioral',
  technical: 'Technical',
  company: 'Company',
};

export const interviewQuestionTypeColorMap: Record<string, ChipProps['color']> =
  {
    behavioral: 'primary',
    technical: 'secondary',
    company: 'success',
  };
