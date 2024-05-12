import NavBar from "../../components/navbar";

export default function AuthorizedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}
