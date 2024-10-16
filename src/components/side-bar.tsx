'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import useCurrentUser from '@/hooks/use-current-user';

export default function SideBar() {
  const user = useCurrentUser();
  const [isOpen, setIsOpen] = useState(true);

  const userImage = useMemo(() => user?.image || '', [user?.image]);
  const userName = useMemo(() => user?.name || '', [user?.name]);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside
      className={`fixed left-0 top-0 min-h-screen w-[244px] bg-[#EDEDED] transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} `}
    >
      <div className="h-12 px-[14px] pt-2">
        <div className="flex h-full items-center">
          <div
            className="flex items-center space-x-2 pl-1"
            aria-label="User menu"
          >
            <Image
              src={userImage}
              alt={userName}
              width={20}
              height={20}
              className="rounded-md"
            />
            <span className="text-sm font-semibold">{userName}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
