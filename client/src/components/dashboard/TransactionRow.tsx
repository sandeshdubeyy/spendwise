import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

interface TransactionRowProps {
	title: string;
	category: string;
	amount: string;
	type: "income" | "expense";
	date: string;
	className?: string;
}

const TransactionRow = ({
	title,
	category,
	amount,
	type,
	date,
	className,
}: TransactionRowProps) => {
	return (
		<div
			className={cn(
				"flex items-center justify-between gap-4 border-b py-4 last:border-b-0",
				COLORS.cardBorder,
				className
			)}
		>
			<div>
				<p className={cn("font-medium", COLORS.textPrimary)}>{title}</p>
				<p className={cn("text-sm", COLORS.textMuted)}>
					{category} · {date}
				</p>
			</div>

			<p
				className={cn(
					"font-medium",
					type === "income" ? COLORS.income : COLORS.expense
				)}
			>
				{type === "income" ? "+" : "-"}
				{amount}
			</p>
		</div>
	);
};

export default TransactionRow;