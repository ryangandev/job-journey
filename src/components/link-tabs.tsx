'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type LinkTabsProps = {
  children: React.ReactElement<LinkTabProps>[];
};

type LinkTabProps = {
  title: string;
  path: string;
  isActive?: boolean;
  onClick?: () => void;
};

function LinkTabs({ children }: LinkTabsProps) {
  const pathname = usePathname();
  const initialActiveTab = children.findIndex(
    (child) => child.props.path === pathname,
  );
  const [activeTab, setActiveTab] = useState<number>(initialActiveTab);

  useEffect(() => {
    const activeIndex = children.findIndex(
      (child) => child.props.path === pathname,
    );
    if (activeTab !== activeIndex) {
      setActiveTab(activeIndex !== -1 ? activeIndex : initialActiveTab);
    }
  }, [pathname, children, activeTab, initialActiveTab]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <nav>
      <ul className="flex space-x-6 border-b dark:border-dark-100/20">
        {children.map((child, index) => (
          <LinkTab
            key={index}
            title={child.props.title}
            path={child.props.path}
            isActive={index === activeTab}
            onClick={() => handleTabChange(index)}
          />
        ))}
      </ul>
    </nav>
  );
}

function LinkTab({ title, path, isActive, onClick }: LinkTabProps) {
  return (
    <li
      className={`cursor-pointer pb-1.5 ${
        isActive
          ? 'border-b-2 border-light-100 text-light-100 dark:border-dark-100 dark:text-dark-100'
          : 'text-light-400 hover:border-b-2 hover:text-blue-500 dark:text-dark-400 hover:dark:border-dark-100/40 hover:dark:text-blue-600'
      }`}
      onClick={onClick}
    >
      <Link href={path}>{title}</Link>
    </li>
  );
}

export { LinkTabs, LinkTab };
