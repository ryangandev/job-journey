import SideBar from '@/components/side-bar';

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-grow bg-[#EDEDED]">
      <SideBar />
      <div className="my-2 mr-2 flex flex-grow rounded-[4px] border bg-[#FBFBFB] lg:ml-[244px]">
        {children}
      </div>
    </div>
  );
}
