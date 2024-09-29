import prisma from '@/lib/db';

export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
      where: {
        token,
      },
    });

    return resetPasswordToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
      where: {
        email,
      },
    });

    return resetPasswordToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};
