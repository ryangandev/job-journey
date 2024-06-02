import { SessionProvider } from "next-auth/react";

import { auth } from "../../auth";
import NavBar from "../../components/navbar";
import { ConfirmModalProvider } from "../../providers/confirm-modal-provider";
import ConfirmModal from "../../components/confirm-modal";

export default async function AuthorizedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <ConfirmModalProvider>
                <NavBar />
                {children}
                <ConfirmModal />
            </ConfirmModalProvider>
        </SessionProvider>
    );
}
