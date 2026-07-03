import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

interface BrandWrapperProps {
    children: ReactNode;
    variant?: "soft" | "bold";
}

const BrandWrapper = ({ children, variant = "soft" }: BrandWrapperProps) => {
    return (
        <div
            className={cn(
                "relative",
                variant === "soft"
                    ? "bg-gradient-to-b from-green-50/60 to-white dark:from-[#071126] dark:to-[#071126]"
                    : "bg-gradient-to-r from-[#f0fdf4] via-[#e6fffa] to-[#eef2ff]",
                COLORS.pageBg
            )}
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-20" />
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default BrandWrapper;