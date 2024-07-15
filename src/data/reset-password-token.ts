import { prisma } from '../libs/db';

const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
      where: {
        token,
      },
    });

    return resetPasswordToken;
  } catch (error) {
    return null;
  }
};

const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
      where: {
        email,
      },
    });

    return resetPasswordToken;
  } catch (error) {
    return null;
  }
};

export { getResetPasswordTokenByToken, getResetPasswordTokenByEmail };
