import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/Theme.context";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

interface ThemeToggleProps {
	className?: string;
	iconSize?: number;
}

const ThemeToggle = ({ className, iconSize = 22 }: ThemeToggleProps) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label="Toggle theme"
			className={cn(
				"rounded-lg p-2 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-800",
				COLORS.focusRing,
				className
			)}
		>
			{theme === "dark" ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
		</button>
	);
};

export default ThemeToggle;