import { AppProviders } from "../providers/app-providers";
import "./globals.css";
import { Inter } from "next/font/google";
import ThemeSwitch from "../components/theme-switch";

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
        <html lang="en">
            <body
                className={`${inter.className} relative flex justify-center pt-16 pb-10`}
            >
                <AppProviders>
                    {children}
                    <ThemeSwitch />
                </AppProviders>
            </body>
        </html>
    );
}
