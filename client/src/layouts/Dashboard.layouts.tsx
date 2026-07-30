import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/DashboardSidebar";
import { cn } from "../utils/cn";
import { COLORS } from "../constants/colors";
import DashboardNavbar from "../components/layout/DashboardNavbar";
import DashboardFooter from "../components/layout/DashboardFooter";

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout = (_props: DashboardLayoutProps) => {
  return (
    <div className={cn("min-h-screen flex flex-col", COLORS.pageBg)}>
      <DashboardNavbar />
      <Sidebar />

      <main className="flex-1 lg:ml-72">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <Outlet />
        </div>
      </main>

      {_props.children == "Expenses" ? <div className="lg:ml-72">
        <DashboardFooter />
      </div> : <></>}
    </div>
  );
};

export default DashboardLayout;