import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Menu, Moon } from "lucide-react";
import logo from "../../assets/images/spendwise-logo.png";

import { useTheme } from "../../context/Theme.context";
import MobileDrawer from "./MobileDrawer";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsActive(window.scrollY < 24);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const bright = isActive || isOpen;

    return (
        <header
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(window.scrollY < 24)}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(window.scrollY < 24)}
            className={cn(
                "sticky top-0 z-[100] transition-all duration-300",
                COLORS.navbarBorder,
                bright
                    ? "bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:bg-[#071126]/95"
                    : "bg-white/45 shadow-none backdrop-blur-sm dark:bg-[#071126]/55"
            )}
        >
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            src={logo}
                            alt="SpendWise Logo"
                            className={cn(
                                "h-10 w-auto transition-opacity duration-300",
                                bright ? "opacity-100" : "opacity-75"
                            )}
                        />
                    </Link>
                </div>

                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        to="/"
                        className={cn(
                            "text-sm font-medium transition-all duration-300",
                            bright
                                ? COLORS.link
                                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                        )}
                    >
                        Features
                    </Link>

                    <Link
                        to="/"
                        className={cn(
                            "text-sm font-medium transition-all duration-300",
                            bright
                                ? COLORS.link
                                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                        )}
                    >
                        About
                    </Link>

                    <Link
                        to="/login"
                        className={cn(
                            "text-sm font-medium transition-all duration-300",
                            bright
                                ? COLORS.link
                                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                        )}
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className={cn(
                            "rounded-lg px-5 py-2 text-sm font-medium text-white transition-all duration-300",
                            bright
                                ? COLORS.primaryBtn
                                : "bg-slate-500 text-white hover:bg-slate-600 dark:bg-slate-700 dark:hover:bg-slate-700"
                        )}
                    >
                        Get started
                    </Link>

                    <button
                        onClick={toggleTheme}
                        className={cn(
                            "rounded-lg p-2 transition-all duration-300",
                            COLORS.focusRing,
                            bright
                                ? "hover:bg-green-50 dark:hover:bg-blue-900/40"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                    >
                        {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
                    </button>
                </div>

                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleTheme}
                        className={cn(
                            "rounded-lg p-2 transition-all duration-300",
                            COLORS.focusRing,
                            bright
                                ? "hover:bg-green-50 dark:hover:bg-blue-900/40"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                    >
                        {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
                    </button>

                    <button
                        onClick={() => setIsOpen(true)}
                        className={cn(
                            "rounded-lg p-2 transition-all duration-300",
                            bright
                                ? "hover:bg-green-50 dark:hover:bg-blue-900/40"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                    >
                        <Menu size={22} />
                    </button>
                </div>
            </nav>

            <MobileDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>
    );
};

export default Navbar;