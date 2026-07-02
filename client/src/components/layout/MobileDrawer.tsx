import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

interface MobileDrawerProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileDrawer = ({ isOpen, setIsOpen }: MobileDrawerProps) => {
    return createPortal(
        <>
            <div
                onClick={() => setIsOpen(false)}
                className={cn(
                    "fixed inset-0 z-[998] bg-black/40 transition-opacity duration-300 md:hidden",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            />

            <div
                className={cn(
                    "fixed top-0 right-0 z-[999] h-screen w-72 overflow-y-auto bg-white shadow-xl transition-transform duration-300 md:hidden",
                    "dark:bg-[#132d4a]",
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

                <div className="flex flex-col gap-6 px-8">
                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className={cn(
                            "text-lg font-medium transition-colors duration-200",
                            COLORS.link
                        )}
                    >
                        Features
                    </Link>

                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className={cn(
                            "text-lg font-medium transition-colors duration-200",
                            COLORS.link
                        )}
                    >
                        About
                    </Link>

                    <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className={cn(
                            "text-lg font-medium transition-colors duration-200",
                            COLORS.link
                        )}
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className={cn(
                            "mt-2 rounded-lg px-4 py-3 text-center font-medium text-white transition-colors duration-200",
                            COLORS.primaryBtn
                        )}
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </>,
        document.body
    );
};

export default MobileDrawer;