import Link from "next/link";

export default function Page({ params }: { params: { slug: string } }) {
    return (
        <main className="pt-16 pb-10">
            <p className="text-gray-600">
                This is the application detail page for {params.slug}
            </p>
            <Link href="/">
                <p className="text-blue-600">Go back to home</p>
            </Link>
        </main>
    );
}
