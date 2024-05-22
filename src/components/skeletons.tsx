import React from "react";
import { Divider, Skeleton } from "@nextui-org/react";

export function ApplicationInfoSkeleton() {
    return (
        <div className="max-w-[48rem] w-full flex flex-col space-y-6">
            <div className="flex justify-between h-9 w-full">
                <Skeleton className="w-2/5 rounded-lg" />
                <Skeleton className=" w-1/6 rounded-lg" />
            </div>
            <div className="flex justify-between h-7 w-full">
                <div className="flex h-full w-3/5 space-x-2">
                    <Skeleton className="w-1/2 rounded-lg" />
                    <Divider className="h-5 my-auto" orientation="vertical" />
                    <Skeleton className="w-1/2 rounded-lg" />
                </div>
                <Skeleton className="w-1/5 rounded-lg" />
            </div>
            <div className="flex justify-between h-6 w-full">
                <Skeleton className="w-2/5 rounded-lg" />
                <Skeleton className="w-1/4 rounded-lg" />
            </div>
            <div className="flex h-7 w-full space-x-4 justify-center">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="w-1/8 rounded-full" />
                ))}
            </div>
            <div className="flex flex-col w-full space-y-2">
                <Skeleton className="w-1/5 h-6 rounded-lg" />
                <Skeleton className="w-4/5 h-6 rounded-lg" />
            </div>
            <div className="flex flex-col w-full space-y-2">
                <Skeleton className="w-1/5 h-8 rounded-lg" />
                {Array.from({ length: 2 }).map((_, i) => (
                    <Skeleton key={i} className="w-4/5 h-6 rounded-lg" />
                ))}
            </div>
        </div>
    );
}
