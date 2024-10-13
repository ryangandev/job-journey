export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full px-4 py-6">{children}</div>;
}
