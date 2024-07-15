'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { auth } from '../auth';
import { prisma } from '../libs/db';
import {
  InterviewQuestionSchema,
  InterviewQuestionTagSchema,
  InterviewQuestionUpdateSchema,
} from '../schemas/interview-prep-schema';

const createInterviewQuestionAction = async (
  interviewQuestionData: z.infer<typeof InterviewQuestionSchema>,
) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      error: 'User not found',
    };
  }

  const result = InterviewQuestionSchema.safeParse(interviewQuestionData);
  if (!result.success) {
    return {
      error: result.error.issues.map((issue) => issue.message).join(', '),
    };
  }

  const { type, question, answer } = result.data;

  try {
    await prisma.interviewQuestion.create({
      data: {
        userId,
        type,
        question,
        answer,
      },
    });
  } catch (error) {
    return {
      error: 'There was an error creating the interview question.',
    };
  }

  revalidatePath('/interview-prep');
  return {
    message: 'Interview question created successfully.',
  };
};

const updateInterviewQuestionAction = async (
  update: z.infer<typeof InterviewQuestionUpdateSchema>,
) => {
  const result = InterviewQuestionUpdateSchema.safeParse(update);
  if (!result.success) {
    return {
      error: result.error.issues.map((issue) => issue.message).join(', '),
    };
  }

  const { questionId, type, question, answer } = result.data;

  try {
    await prisma.interviewQuestion.update({
      where: {
        id: questionId,
      },
      data: {
        type,
        question,
        answer,
      },
    });
  } catch (error) {
    return {
      error: 'There was an error updating the interview question.',
    };
  }

  revalidatePath('/interview-prep');
  return {
    message: 'Interview question updated successfully.',
  };
};

const deleteInterviewQuestionAction = async (questionId: string) => {
  try {
    await prisma.interviewQuestion.delete({
      where: {
        id: questionId,
      },
    });
  } catch (error) {
    return {
      error: 'There was an error deleting the interview question.',
    };
  }

  revalidatePath('/interview-prep');
  return {
    message: 'Interview question deleted successfully.',
  };
};

const createTagAction = async (
  tagData: z.infer<typeof InterviewQuestionTagSchema>,
) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      error: 'User not found',
    };
  }

  const result = InterviewQuestionTagSchema.safeParse(tagData);
  if (!result.success) {
    return {
      error: result.error.issues.map((issue) => issue.message).join(', '),
    };
  }

  const { name } = result.data;

  try {
    await prisma.tag.create({
      data: {
        userId,
        name,
      },
    });
  } catch (error) {
    return {
      error: 'There was an error creating the tag.',
    };
  }

  revalidatePath('/interview-prep');
  return {
    message: 'Tag created successfully.',
  };
};

export {
  createInterviewQuestionAction,
  updateInterviewQuestionAction,
  deleteInterviewQuestionAction,
  createTagAction,
};
