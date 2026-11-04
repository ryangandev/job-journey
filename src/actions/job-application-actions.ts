'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import {
  ApplicationStatusSchema,
  JobApplicationSchema,
  type JobApplicationFormInput,
  type JobApplicationFormOutput,
} from '@/schemas/job-application-schema';

type ActionResult = { success: true } | { error: string };

const DASHBOARD_PATH = '/dashboard';
const NOT_FOUND_ERROR = 'This application no longer exists';
const GENERIC_ERROR = 'Something went wrong! Please try again';

const getCurrentUserId = async () => {
  const session = await auth();
  return session?.user?.id ?? null;
};

// `appliedAt` is a calendar date (YYYY-MM-DD); store it as UTC midnight so it never shifts a day
const toDbData = (values: JobApplicationFormOutput) => ({
  ...values,
  appliedAt: values.appliedAt
    ? new Date(`${values.appliedAt}T00:00:00Z`)
    : null,
});

export async function createJobApplicationAction(
  values: JobApplicationFormInput,
): Promise<ActionResult> {
  const userId = await getCurrentUserId();
  if (!userId) return { error: 'You need to be logged in' };

  const parsed = JobApplicationSchema.safeParse(values);
  if (!parsed.success) return { error: 'Invalid data' };

  try {
    await prisma.jobApplication.create({
      data: { ...toDbData(parsed.data), userId },
    });
  } catch (error) {
    console.error(error);
    return { error: GENERIC_ERROR };
  }

  revalidatePath(DASHBOARD_PATH);
  return { success: true };
}

export async function updateJobApplicationAction(
  id: string,
  values: JobApplicationFormInput,
): Promise<ActionResult> {
  const userId = await getCurrentUserId();
  if (!userId) return { error: 'You need to be logged in' };

  const parsed = JobApplicationSchema.safeParse(values);
  if (!parsed.success) return { error: 'Invalid data' };

  try {
    // Scoping by userId means users can only ever touch their own applications
    const { count } = await prisma.jobApplication.updateMany({
      where: { id, userId },
      data: toDbData(parsed.data),
    });
    if (count === 0) return { error: NOT_FOUND_ERROR };
  } catch (error) {
    console.error(error);
    return { error: GENERIC_ERROR };
  }

  revalidatePath(DASHBOARD_PATH);
  return { success: true };
}

export async function updateJobApplicationStatusAction(
  id: string,
  status: string,
): Promise<ActionResult> {
  const userId = await getCurrentUserId();
  if (!userId) return { error: 'You need to be logged in' };

  const parsedStatus = ApplicationStatusSchema.safeParse(status);
  if (!parsedStatus.success) return { error: 'Invalid status' };

  try {
    const { count } = await prisma.jobApplication.updateMany({
      where: { id, userId },
      data: { status: parsedStatus.data },
    });
    if (count === 0) return { error: NOT_FOUND_ERROR };
  } catch (error) {
    console.error(error);
    return { error: GENERIC_ERROR };
  }

  revalidatePath(DASHBOARD_PATH);
  return { success: true };
}

export async function deleteJobApplicationAction(
  id: string,
): Promise<ActionResult> {
  const userId = await getCurrentUserId();
  if (!userId) return { error: 'You need to be logged in' };

  try {
    const { count } = await prisma.jobApplication.deleteMany({
      where: { id, userId },
    });
    if (count === 0) return { error: NOT_FOUND_ERROR };
  } catch (error) {
    console.error(error);
    return { error: GENERIC_ERROR };
  }

  revalidatePath(DASHBOARD_PATH);
  return { success: true };
}
