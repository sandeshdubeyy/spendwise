import { forwardRef, useId } from "react";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import type { InputProps } from "../../types/ui.types";

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, label, error, helperText, id, type = "text", ...props }, ref) => {
		const generatedId = useId();
		const inputId = id ?? generatedId;

		return (
			<div className="w-full">
				{label ? (
					<label
						htmlFor={inputId}
						className={cn("mb-2 block text-sm font-medium", COLORS.textPrimary)}
					>
						{label}
					</label>
				) : null}

				<input
					ref={ref}
					id={inputId}
					type={type}
					className={cn(
						"h-10 w-full rounded-lg border px-3 text-sm transition-colors duration-200",
						COLORS.cardBg,
						COLORS.cardBorder,
						COLORS.textPrimary,
						"placeholder:text-slate-400 dark:placeholder:text-slate-500",
						COLORS.focusRing,
						error && "border-red-500 focus-visible:ring-red-500",
						className
					)}
					{...props}
				/>

				{error ? (
					<p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
				) : null}

				{helperText && !error ? (
					<p className={cn("mt-2 text-sm", COLORS.textMuted)}>{helperText}</p>
				) : null}
			</div>
		);
	}
);

Input.displayName = "Input";

export default Input;