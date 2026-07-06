import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { User as UserIcon, ChevronDown, LogOut } from "lucide-react";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import ThemeToggle from "../common/ThemeToggle";
import { ROUTES } from "../../constants/routes";

import logo from "../../assets/images/spendwise-logo.png";

type User = {
  name?: string;
  email?: string;
  avatarUrl?: string;
};

interface DashboardNavbarProps {
  user?: User;
  onLogout?: () => void;
}

const getInitials = (name?: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const DashboardNavbar = ({ user, onLogout }: DashboardNavbarProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!open) return;
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] border-b",
        COLORS.navbarBorder,
        "bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:bg-[#071126]"
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link to={ROUTES.DASHBOARD} className="flex items-center gap-3">
            <img src={logo} alt="SpendWise" className="h-10 w-auto" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ThemeToggle className="rounded-lg" iconSize={22} />
          </div>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={open}
              className={cn(
                "flex items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-200",
                COLORS.focusRing,
                "hover:bg-green-50 dark:hover:bg-blue-900/40"
              )}
            >
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name ?? "Avatar"}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-800 dark:bg-slate-800 dark:text-white"
                  )}
                >
                  {getInitials(user?.name) || <UserIcon size={16} />}
                </div>
              )}

              <ChevronDown
                size={18}
                className={open ? "rotate-180 transform" : ""}
              />
            </button>

            {open && (
              <div
                className={cn(
                  "absolute right-0 top-[calc(100%+8px)] z-50 w-56 rounded-lg border",
                  "bg-white py-2 shadow-lg dark:bg-slate-900",
                  COLORS.cardBorder
                )}
              >
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {user?.name ?? "Your Name"}
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-600 dark:text-slate-400">
                    {user?.email ?? "you@domain.com"}
                  </p>
                </div>

                <div className="mt-1 border-t" />

                <nav className="py-1">
                  <Link
                    to={ROUTES.PROFILE}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                    onClick={() => setOpen(false)}
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                    onClick={() => setOpen(false)}
                  >
                    Settings
                  </Link>

                  <Link
                    to="/profile/change-password"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                    onClick={() => setOpen(false)}
                  >
                    Change Password
                  </Link>

                  <div className="mt-2 border-t" />

                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onLogout?.();
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashboardNavbar;