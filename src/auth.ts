import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserPlan } from "@prisma/client";

import { prisma } from "./libs/db";
import { getUserById } from "./data/user";
import authConfig from "./auth.config";

// To Assign new fields to the session object, we need to use the callbacks object
// Assign the new field to the token object in the jwt callback first
// Then assign the new field to the session object in the session callback

export const { auth, handlers, signIn, signOut } = NextAuth({
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.userPlan && session.user) {
                session.user.userPlan = token.userPlan as UserPlan;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            token.userPlan = existingUser.userPlan;
            return token;
        },
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" }, // Use JWT here because we cannot use database sessions with Prisma, it does not work on the Edge
    ...authConfig,
});
