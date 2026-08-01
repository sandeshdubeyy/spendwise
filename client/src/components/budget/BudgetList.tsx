import { useEffect, useState } from "react";
import { Card, CardHeader } from "../common/Card";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { getBudgets, type Budget } from "../../services/budget.services";

interface BudgetListProps {
    refreshKey?: number;
}

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

const getCategoryName = (category: Budget["category"]) =>
    typeof category === "string" ? category : category?.name ?? "—";

const SkeletonRow = () => (
    <tr>
        {Array.from({ length: 4 }).map((_, i) => (
            <td key={i} className="px-4 py-4">
                <div className="h-3 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </td>
        ))}
    </tr>
);

const BudgetList = ({ refreshKey = 0 }: BudgetListProps) => {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getBudgets();
                setBudgets(data);
            } catch {
                setError("Couldn't load budgets.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [refreshKey]);

    return (
        <Card className="mt-6">
            <CardHeader>
                <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>
                    All Budgets
                </h3>
            </CardHeader>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                    <thead>
                        <tr className={cn("border-b", COLORS.cardBorder)}>
                            <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>
                                Category
                            </th>
                            <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>
                                Month
                            </th>
                            <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>
                                Year
                            </th>
                            <th className={cn("px-4 py-3 text-right text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>
                                Amount
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                        ) : error ? (
                            <tr>
                                <td colSpan={4} className={cn("px-4 py-8 text-center text-sm", COLORS.danger)}>
                                    {error}
                                </td>
                            </tr>
                        ) : budgets.length === 0 ? (
                            <tr>
                                <td colSpan={4} className={cn("px-4 py-8 text-center text-sm", COLORS.textMuted)}>
                                    No budgets yet. Add your first one above.
                                </td>
                            </tr>
                        ) : (
                            budgets.map((budget) => (
                                <tr
                                    key={budget._id}
                                    className="transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                >
                                    <td className={cn("px-4 py-4 font-medium capitalize", COLORS.textPrimary)}>
                                        {getCategoryName(budget.category)}
                                    </td>
                                    <td className={cn("px-4 py-4", COLORS.textSecondary)}>
                                        {MONTH_NAMES[budget.month - 1] ?? budget.month}
                                    </td>
                                    <td className={cn("px-4 py-4", COLORS.textSecondary)}>
                                        {budget.year}
                                    </td>
                                    <td className={cn("px-4 py-4 text-right font-medium tabular-nums", COLORS.textPrimary)}>
                                        {formatMoney(budget.amount)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default BudgetList;