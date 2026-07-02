import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export const Card = ({ className, children, ...props }: CardProps) => {
    return (
        <div
            className={cn(
                "rounded-xl border shadow-sm",
                COLORS.cardBg,
                COLORS.cardBorder,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn("border-b px-6 py-4", COLORS.cardBorder, className)} {...props}>
            {children}
        </div>
    );
};

export const CardBody = ({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn("p-6", className)} {...props}>
            {children}
        </div>
    );
};