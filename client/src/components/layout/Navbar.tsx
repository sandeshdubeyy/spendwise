import { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Menu, Moon } from "lucide-react";
import logo from "../../assets/images/spendwise-logo.png";

import { useTheme } from "../../context/Theme.context";
import MobileDrawer from "./MobileDrawer";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <header
            className={cn(
                "sticky top-0 z-50 border-b",
                COLORS.navbarBorder,
                COLORS.navbarBg
            )}
        >
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logo} alt="SpendWise Logo" className="h-10 w-auto" />
                    </Link>
                </div>

                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        to="/"
                        className={cn(
                            "text-sm font-medium transition-colors duration-200",
                            COLORS.link
                        )}
                    >
                        Features
                    </Link>

                    <Link
                        to="/"
                        className={cn(
                            "text-sm font-medium transition-colors duration-200",
                            COLORS.link
                        )}
                    >
                        About
                    </Link>

                    <Link
                        to="/login"
                        className={cn(
                            "text-sm font-medium transition-colors duration-200",
                            COLORS.link
                        )}
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className={cn(
                            "rounded-lg px-5 py-2 text-sm font-medium text-white transition-colors duration-200",
                            COLORS.primaryBtn
                        )}
                    >
                        Get started
                    </Link>

                    <button
                        onClick={toggleTheme}
                        className={cn(
                            "rounded-lg p-2 transition-colors duration-200",
                            COLORS.focusRing,
                            "hover:bg-green-50 dark:hover:bg-blue-900/40"
                        )}
                    >
                        {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
                    </button>
                </div>

                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleTheme}
                        className={cn(
                            "rounded-lg p-2 transition-colors duration-200",
                            COLORS.focusRing,
                            "hover:bg-green-50 dark:hover:bg-blue-900/40"
                        )}
                    >
                        {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
                    </button>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="rounded-lg p-2 transition-colors duration-200 hover:bg-green-50 dark:hover:bg-blue-900/40"
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