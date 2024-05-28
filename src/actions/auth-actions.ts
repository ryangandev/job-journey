"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

import { signIn, signOut } from "../auth";
import { prisma } from "../libs/db";
import {
    generateVerificationToken,
    generateResetPasswordToken,
} from "../libs/tokens";
import {
    sendVerificationEmail,
    sendResetPasswordEmail,
} from "../libs/sendEmail";
import {
    LoginSchema,
    RegisterSchema,
    ResetPasswordSchema,
} from "../schemas/auth-schema";
import { getUserByEmail } from "../data/user";
import { getVerificationTokenByToken } from "../data/verification-token";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";

async function registerAction(registerData: z.infer<typeof RegisterSchema>) {
    const parsedRegisterData = RegisterSchema.safeParse(registerData);

    if (!parsedRegisterData.success) {
        return { error: "Invalid data" };
    }

    const { name, email, password } = registerData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already in use!" };
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
    );

    return { success: "Verification Email Sent!" };
}

async function loginAction(loginData: z.infer<typeof LoginSchema>) {
    const parsedLoginData = LoginSchema.safeParse(loginData);

    if (!parsedLoginData.success) {
        return { error: "Invalid data" };
    }

    const { email, password } = loginData;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email) {
        return { error: "Email does not exist!" };
    } else if (!existingUser.password) {
        return { error: "Email used with a provider sign in" };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email,
        );

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        );

        return { success: "Verification Email Sent!" };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });

        return { success: "Logged in!" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": {
                    return { error: "Invalid credentials!" };
                }
                default: {
                    return { error: "Something went wrong!" };
                }
            }
        }
        throw error;
    }
}

async function logoutAction() {
    await signOut({
        redirectTo: "/auth/login",
    });
}

async function newVerificationAction(token: string) {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: "Token does not exist!" };
    }

    const hasExpired = new Date(existingToken.expiresAt) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Email does not exist!" };
    }

    await prisma.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email, // Update the email when user wants to change their email
        },
    });

    await prisma.verificationToken.delete({
        where: {
            id: existingToken.id,
        },
    });

    return { success: "Email verified!" };
}

const resetPasswordAction = async (
    values: z.infer<typeof ResetPasswordSchema>,
) => {
    const result = ResetPasswordSchema.safeParse(values);

    if (!result.success) {
        return { error: "Invalid email" };
    }

    const { email } = result.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "Email not found!" };
    }

    const resetPasswordToken = await generateResetPasswordToken(email);
    await sendResetPasswordEmail(
        resetPasswordToken.email,
        resetPasswordToken.token,
    );

    return { success: "Reset email sent!" };
};

export {
    registerAction,
    loginAction,
    logoutAction,
    newVerificationAction,
    resetPasswordAction,
};
