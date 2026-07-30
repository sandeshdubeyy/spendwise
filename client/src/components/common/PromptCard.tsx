import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { Card } from "./Card";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

interface PromptCardProps {
    title: string;
    description: string;
    buttonLabel: string;
    to?: string;
    onClick?: () => void;
    icon?: ReactNode;
    className?: string;
}

const PromptCard = ({
    title,
    description,
    buttonLabel,
    to,
    onClick,
    icon,
    className,
}: PromptCardProps) => {
    const buttonClass = cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg px-5 py-3 text-sm font-medium text-white transition-colors",
        COLORS.primaryBtn
    );

    return (
        <Card
            className={cn(
                "overflow-hidden border border-green-100/80 bg-gradient-to-r from-white to-green-50/70 p-0 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)] dark:border-blue-800/60 dark:from-slate-900 dark:to-blue-950/40",
                className
            )}
        >
            <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                    {icon ? <div className="mt-1 shrink-0">{icon}</div> : null}

                    <div>
                        <h3 className={cn("text-lg font-semibold", COLORS.textPrimary)}>
                            {title}
                        </h3>
                        <p className={cn("mt-1 text-sm leading-6", COLORS.textSecondary)}>
                            {description}
                        </p>
                    </div>
                </div>

                {onClick ? (
                    <button type="button" onClick={onClick} className={buttonClass}>
                        {buttonLabel}
                    </button>
                ) : to ? (
                    <Link to={to} className={buttonClass}>
                        {buttonLabel}
                    </Link>
                ) : null}
            </div>
        </Card>
    );
};

export default PromptCard;