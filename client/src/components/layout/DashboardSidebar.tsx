import { NavLink, useNavigate } from "react-router-dom";
import {
  Grid,
  CreditCard,
  List,
  PieChart,
  Target,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../context/Auth.context";

const navItems = [
  { label: "Overview", to: ROUTES.DASHBOARD, icon: Grid },
  { label: "Expenses", to: ROUTES.EXPENSES, icon: CreditCard },
  { label: "Categories", to: ROUTES.CATEGORIES, icon: List },
  { label: "Budgets", to: ROUTES.BUDGETS, icon: Target },
  { label: "Savings", to: ROUTES.SAVINGS_GOALS, icon: PieChart },
  { label: "Analytics", to: ROUTES.ANALYTICS, icon: PieChart },
  { label: "Settings", to: ROUTES.PROFILE, icon: Settings },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const renderLink = (to: string, label: string, Icon: any) => (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-green-50/80 dark:bg-blue-800/60 " + COLORS.income
            : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
          COLORS.cardBorder
        )
      }
    >
      <Icon size={18} />
      <span className="truncate">{label}</span>
    </NavLink>
  );

  return (
    <aside
      className={cn(
        "hidden lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-72 lg:pt-20 lg:flex lg:flex-col lg:gap-6 lg:px-6",
        COLORS.cardBg,
        COLORS.cardBorder
      )}
    >
      <nav className="mt-6 flex flex-1 flex-col gap-2">
        {navItems.map((n) => (
          <div key={n.to}>{renderLink(n.to, n.label, n.icon)}</div>
        ))}

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;