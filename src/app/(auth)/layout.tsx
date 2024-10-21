import { GrGlobe } from 'react-icons/gr';

import AnimatedLayoutWrapper from '@/components/animated-layout-wrapper';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto my-auto flex h-[400px] w-[336px] select-none flex-col items-center">
      <GrGlobe size={48} className="mb-8 flex-shrink-0" />
      <AnimatedLayoutWrapper>{children}</AnimatedLayoutWrapper>
    </div>
  );
}
