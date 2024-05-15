import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "./libs/db";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" }, // Use JWT here because we cannot use database sessions with Prisma, it does not work on the Edge
    ...authConfig,
});
