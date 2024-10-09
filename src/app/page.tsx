import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center space-y-20 px-4 py-6">
      <Link href="/login">Sign In</Link>
      <h1 className="hero max-w-5xl text-center text-5xl font-bold">
        The One Management Tool You Need To Streamline Your Job Process
      </h1>
    </main>
  );
}
