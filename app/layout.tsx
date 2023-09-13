import { AppProviders } from "./_providers/app-providers";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "NextJs - Todo App",
    description: "",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark flex justify-center items-center">
            <body className={`${inter.className}`}>
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
