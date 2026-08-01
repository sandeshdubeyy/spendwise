import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

interface ProgressBarProps {
    percentage: number;
    status?: "completed" | "in_progress";
    showLabel?: boolean;
    className?: string;
}

const ProgressBar = ({
    percentage,
    status = "in_progress",
    showLabel = true,
    className,
}: ProgressBarProps) => {
    const clamped = Math.min(100, Math.max(0, percentage));

    const barColor =
        status === "completed"
            ? "bg-green-600 dark:bg-green-500"
            : "bg-[#1e3a8a] dark:bg-blue-500";

    return (
        <div className={cn("w-full", className)}>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                    className={cn("h-full rounded-full transition-all duration-500", barColor)}
                    style={{ width: `${clamped}%` }}
                />
            </div>

            {showLabel ? (
                <p className={cn("mt-1.5 text-xs font-medium", COLORS.textMuted)}>
                    {clamped}% {status === "completed" ? "— Completed" : "funded"}
                </p>
            ) : null}
        </div>
    );
};

export default ProgressBar;