import { v4 as uuidv4 } from "uuid";

import { prisma } from "./db";
import { getVerificationTokenByEmail } from "../data/verification-token";
import { getResetPasswordTokenByEmail } from "../data/reset-password-token";

const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000); // 1 hour from now

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expiresAt,
        },
    });

    return verificationToken;
};

const generateResetPasswordToken = async (email: string) => {
    const token = uuidv4();
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000); // 1 hour from now

    const existingToken = await getResetPasswordTokenByEmail(email);

    if (existingToken) {
        await prisma.resetPasswordToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const resetPasswordToken = await prisma.resetPasswordToken.create({
        data: {
            email,
            token,
            expiresAt,
        },
    });

    return resetPasswordToken;
};

export { generateVerificationToken, generateResetPasswordToken };
