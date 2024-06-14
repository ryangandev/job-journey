"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@nextui-org/react";

import { SearchIcon } from "../assets/svgs";

type SearchBarProps = {
    placeholder?: string;
    setIsSearching?: (isSearching: boolean) => void;
};

export default function SearchBar({
    placeholder,
    setIsSearching,
}: SearchBarProps) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);

        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }

        setIsSearching && setIsSearching(true);
        replace(`${pathname}?${params.toString()}`);
    }, 500);

    return (
        <Input
            variant="bordered"
            classNames={{
                base: "w-full sm:max-w-[50%]",
                inputWrapper: "border-1 px-2",
            }}
            startContent={<SearchIcon />}
            placeholder={placeholder}
            autoComplete="off"
            autoFocus
            defaultValue={searchParams.get("query")?.toString()}
            onValueChange={(value) => {
                handleSearch(value);
            }}
        />
    );
}
