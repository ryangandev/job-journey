"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

import { prisma } from "../libs/db";
import { LoginSchema, RegisterSchema } from "../schemas/auth-schema";
import { getUserByEmail } from "../data/user";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { signIn, signOut } from "../auth";

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

    // TODO: Send verification token email
    return { success: "Email Sent!" };
}

async function loginAction(loginData: z.infer<typeof LoginSchema>) {
    const parsedLoginData = LoginSchema.safeParse(loginData);

    if (!parsedLoginData.success) {
        return { error: "Invalid data" };
    }

    const { email, password } = loginData;

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
