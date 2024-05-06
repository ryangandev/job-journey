import HomepageOptions from "../components/homepage/homepage-options";

export default function Home() {
    return (
        <main className="w-screen py-4 px-20 lg:px-40 flex flex-col justify-center items-center pt-24 sm:pt-36 space-y-16">
            <h1 className="font-bold text-5xl text-[#171717]/90 dark:text-[#ededed]/90 text-center leading-normal">
                The One Management Tool You Need To Streamline Your Job Process
            </h1>
            <HomepageOptions />
        </main>
    );
}
