import { cn } from "../../utils/cn";
import type { BadgeVariant } from "../../types/ui.types";

interface BadgeProps {
	children: React.ReactNode;
	variant?: BadgeVariant;
	className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
	default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
	success: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
	warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
	danger: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
};

const Badge = ({ children, variant = "default", className }: BadgeProps) => {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
				variantStyles[variant],
				className
			)}
		>
			{children}
		</span>
	);
};

export default Badge;