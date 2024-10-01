export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="my-auto">{children}</div>;
}
