import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface MobileDrawerProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileDrawer = ({
    isOpen,
    setIsOpen,
}: MobileDrawerProps) => {
    return createPortal(
        <>
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 z-[998] bg-black/40 transition-opacity duration-300 md:hidden ${isOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
            />
            <div
                className={`fixed top-0 right-0 z-[999] h-screen w-72 bg-white shadow-xl transition-transform duration-300 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}>
                <div className="flex justify-end p-5">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-lg p-2 transition-colors hover:bg-slate-100">
                        <X size={24} />
                    </button>
                </div>


                <div className="flex flex-col gap-6 px-8 z-999">
                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-slate-700 transition-colors hover:text-blue-600">
                        Features
                    </Link>

                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-slate-700 transition-colors hover:text-blue-600"
                    >
                        About
                    </Link>

                    <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-slate-700 transition-colors hover:text-blue-600">
                        Login
                    </Link>

                    <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="mt-2 rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700">
                        Get Started
                    </Link>
                </div>
            </div>
        </>,
        document.body
    );
};

export default MobileDrawer;