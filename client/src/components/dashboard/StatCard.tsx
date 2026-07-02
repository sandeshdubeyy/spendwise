import type { LucideIcon } from "lucide-react";
import { Card, CardBody } from "../common/Card";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import type { StatVariant } from "../../types/ui.types";

interface StatCardProps {
	title: string;
	value: string;
	icon: LucideIcon;
	variant?: StatVariant;
	className?: string;
}

const valueStyles: Record<StatVariant, string> = {
	default: COLORS.textPrimary,
	income: COLORS.income,
	expense: COLORS.expense,
	savings: COLORS.savings,
};

const StatCard = ({
	title,
	value,
	icon: Icon,
	variant = "default",
	className,
}: StatCardProps) => {
	return (
		<Card className={className}>
			<CardBody>
				<div className="flex items-start justify-between gap-4">
					<div>
						<p className={cn("text-sm", COLORS.textSecondary)}>{title}</p>
						<p className={cn("mt-2 text-2xl font-semibold", valueStyles[variant])}>
							{value}
						</p>
					</div>

					<div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
						<Icon size={20} className={COLORS.textSecondary} />
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default StatCard;