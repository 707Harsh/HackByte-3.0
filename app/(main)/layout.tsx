import { Navbar } from "@/components/navbar";
const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className=""
    >
      <div className="">
        <Navbar />
      </div>
      <main className="">{children}</main>
    </div>
  );
};

export default MainLayout;
