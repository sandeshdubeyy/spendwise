import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Grid,
  CreditCard,
  List,
  PieChart,
  Target,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { ROUTES } from "../../constants/routes";

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
  const [open, setOpen] = useState(false);

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
      onClick={() => setOpen(false)}
    >
      <Icon size={18} />
      <span className="truncate">{label}</span>
    </NavLink>
  );

  return (
    <>
      {/* Desktop sidebar */}
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
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              )}
            >
              <LogOut size={18} />
              <span>Sign out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Mobile floating menu button */}
      <div className="fixed left-4 top-4 z-[60] lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-white/90 p-2 shadow-md dark:bg-slate-900/90"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-start lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "relative z-10 h-screen w-72 overflow-y-auto bg-white p-4 shadow-xl transition-transform",
            open ? "translate-x-0" : "translate-x-72",
            "dark:bg-slate-900"
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="text-lg font-semibold">Menu</div>
            <button onClick={() => setOpen(false)} className="rounded p-1">
              <X />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((n) => (
              <div key={n.to}>{renderLink(n.to, n.label, n.icon)}</div>
            ))}

            <div className="mt-6">
              <button
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                )}
                onClick={() => {
                  // placeholder logout handler
                  setOpen(false);
                }}
              >
                <LogOut size={18} />
                <span>Sign out</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;