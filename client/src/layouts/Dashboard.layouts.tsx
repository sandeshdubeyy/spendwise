import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { cn } from "../utils/cn";
import { COLORS } from "../constants/colors";
import DashboardNavbar from "../components/layout/DashboardNavbar";

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout = (_props: DashboardLayoutProps) => {
  return (
    <div className={cn("min-h-screen", COLORS.pageBg)}>
      <DashboardNavbar />
      <Sidebar />

      {/* Main content: account for navbar height (h-20) and sidebar width on large screens */}
      <main className="min-h-[calc(100vh-5rem)] pt-20 lg:ml-72">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;