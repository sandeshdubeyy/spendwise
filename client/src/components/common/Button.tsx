import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import type { ButtonProps } from "../../types/ui.types";
import Spinner from "./Spinner";

const variantStyles = {
	primary: COLORS.primaryBtn,
	secondary:
		"bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700",
	outline:
		"border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800",
	ghost:
		"bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
	danger: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500",
};

const sizeStyles = {
	sm: "h-9 px-3 text-sm",
	md: "h-10 px-4 text-sm",
	lg: "h-11 px-6 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant = "primary",
			size = "md",
			isLoading = false,
			disabled,
			children,
			...props
		},
		ref
	) => {
		return (
			<button
				ref={ref}
				disabled={disabled || isLoading}
				className={cn(
					"inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
					COLORS.focusRing,
					variantStyles[variant],
					sizeStyles[size],
					className
				)}
				{...props}
			>
				{isLoading ? <Spinner size="sm" /> : null}
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";

export default Button;