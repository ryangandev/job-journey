import AnimatedLayoutWrapper from '@/components/animated-layout-wrapper';
import { AuthShell } from '@/components/auth/auth-components';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthShell>
      <AnimatedLayoutWrapper>{children}</AnimatedLayoutWrapper>
    </AuthShell>
  );
}
