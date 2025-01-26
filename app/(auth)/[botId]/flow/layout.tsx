import Header from "@/features/layout/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="z-10 bg-gray-100">
        <Header />
      </div>
      <div className="flex flex-grow">
        <div className="-z-0 flex-grow flex-shrink min-h-full relative">
          {children}
        </div>
      </div>
    </>
  );
}
