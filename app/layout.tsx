import { AppProviders } from "./_providers/app-providers";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Job Journey",
    description:
        "An app to help you organize and streamline your job application process.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className="dark h-full flex justify-center items-center"
        >
            <body className={`${inter.className}`}>
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
