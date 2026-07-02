import { cn } from "../../utils/cn";
import type { Size } from "../../types/ui.types";

interface SpinnerProps {
	size?: Size;
	className?: string;
}

const sizeStyles: Record<Size, string> = {
	sm: "h-4 w-4",
	md: "h-6 w-6",
	lg: "h-8 w-8",
};

const Spinner = ({ size = "md", className }: SpinnerProps) => {
	return (
		<span
			role="status"
			aria-label="Loading"
			className={cn(
				"inline-block animate-spin rounded-full border-2 border-current border-t-transparent",
				sizeStyles[size],
				className
			)}
		/>
	);
};

export default Spinner;