import React from "react";

interface PageHeaderProps {
    children: React.ReactNode;
}
export default function PageHeader({ children }: PageHeaderProps) {
    return <h2 className="text-3xl font-semibold capitalize">{children}</h2>;
}
