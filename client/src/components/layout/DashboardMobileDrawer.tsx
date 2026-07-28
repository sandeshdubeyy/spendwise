import { NavLink, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  Grid,
  CreditCard,
  List,
  PieChart,
  Target,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../context/Auth.context";

interface DashboardMobileDrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const navItems = [
  { label: "Overview", to: ROUTES.DASHBOARD, icon: Grid },
  { label: "Expenses", to: ROUTES.EXPENSES, icon: CreditCard },
  { label: "Categories", to: ROUTES.CATEGORIES, icon: List },
  { label: "Budgets", to: ROUTES.BUDGETS, icon: Target },
  { label: "Savings", to: ROUTES.SAVINGS_GOALS, icon: PieChart },
  { label: "Analytics", to: ROUTES.ANALYTICS, icon: PieChart },
  { label: "Settings", to: ROUTES.PROFILE, icon: Settings },
];

const DashboardMobileDrawer = ({ isOpen, setIsOpen }: DashboardMobileDrawerProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return createPortal(
    <>
      {/* dark overlay behind drawer, click to close */}
      <div
        onClick={() => setIsOpen(false)}
        className={cn(
          "fixed inset-0 z-[998] bg-black/40 transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* sliding panel — same slide logic as MobileDrawer.tsx */}
      <div
        className={cn(
          "fixed top-0 right-0 z-999 h-screen w-72 overflow-y-auto bg-white shadow-xl transition-transform duration-300 lg:hidden",
          "dark:bg-[#071126]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-end p-5">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-blue-900/40"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 px-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-green-50/80 dark:bg-blue-800/60 " + COLORS.income
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  )
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="mt-4 border-t pt-4 dark:border-slate-800">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <LogOut size={18} />
              <span>Sign out</span>
            </button>
          </div>
        </nav>
      </div>
    </>,
    document.body
  );
};

export default DashboardMobileDrawer;