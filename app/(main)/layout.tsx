import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className=""
    >
      <div className="">
        <Navbar />
        <div className="flex flex-row">
        <Sidebar />
        <main className="">
        {children}
      </main>
        </div>
      </div>
      
    </div>
  );
};

export default MainLayout;
