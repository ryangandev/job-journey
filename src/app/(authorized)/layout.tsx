import { SessionProvider } from "next-auth/react";

import { auth } from "../../auth";
import NavBar from "../../components/navbar";

export default async function AuthorizedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <NavBar />
            {children}
        </SessionProvider>
    );
}
