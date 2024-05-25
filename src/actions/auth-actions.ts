"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

import { signIn, signOut } from "../auth";
import { prisma } from "../libs/db";
import { generateVerificationToken } from "../libs/tokens";
import { sendVerificationEmail } from "../libs/sendEmail";
import { LoginSchema, RegisterSchema } from "../schemas/auth-schema";
import { getUserByEmail } from "../data/user";
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

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" };
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
        redirectTo: "/login",
    });
}

export { registerAction, loginAction, logoutAction };
