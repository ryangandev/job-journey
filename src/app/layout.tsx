import { AppProviders } from "../providers/app-providers";
import "./globals.css";
import ThemeSwitch from "../components/theme-switch";
import { Toaster } from "react-hot-toast";
import NavBar from "../components/navbar";
import { inter } from "../assets/fonts";

export const metadata = {
    title: "JobJourney",
    description:
        "An app to help you organize and streamline your job application process.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // added 'suppressHydrationWarning' to the html tag to avoid warning (solution from reddit below)
        // https://www.reddit.com/r/nextjs/comments/138smpm/how_to_fix_extra_attributes_from_the_server_error/
        // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} relative`}>
                <AppProviders>
                    {children}
                    <Toaster position="top-center" />
                    <ThemeSwitch />
                </AppProviders>
            </body>
        </html>
    );
}
