import { ChipProps } from '@nextui-org/react';
import { InterviewQuestion, InterviewQuestionType } from '@prisma/client';

import { prisma } from '../libs/db';

const getInterviewQuestionsByType = async (
  userId: string,
  type: InterviewQuestionType,
): Promise<InterviewQuestion[]> => {
  try {
    const interviewQuestions = await prisma.interviewQuestion.findMany({
      where: {
        userId: userId,
        type: type,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return interviewQuestions;
  } catch (error) {
    throw new Error('Failed to fetch the interview questions.');
  }
};

const getFilteredInterviewQuestions = async (
  userId: string,
  query: string,
  type: string,
): Promise<InterviewQuestion[]> => {
  try {
    // Create the base where clause
    const whereClause: any = {
      userId: userId,
      OR: [
        {
          question: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    };

    // Add type condition if type is not "all" and not empty
    if (type && type !== 'all') {
      whereClause.type = type;
    }

    const interviewQuestions = await prisma.interviewQuestion.findMany({
      where: whereClause,
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return interviewQuestions;
  } catch (error) {
    throw new Error('Failed to fetch the interview questions.');
  }
};

const interviewQuestionTypeOptions = ['behavioral', 'technical', 'company'];

const interviewQuestionTypeMap: Record<InterviewQuestionType, string> = {
  behavioral: 'Behavioral',
  technical: 'Technical',
  company: 'Company',
};

const interviewQuestionTypeColorMap: Record<string, ChipProps['color']> = {
  behavioral: 'primary',
  technical: 'secondary',
  company: 'success',
};

export {
  getInterviewQuestionsByType,
  getFilteredInterviewQuestions,
  interviewQuestionTypeOptions,
  interviewQuestionTypeMap,
  interviewQuestionTypeColorMap,
};
