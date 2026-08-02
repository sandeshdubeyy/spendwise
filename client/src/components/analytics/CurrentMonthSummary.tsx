import { useEffect, useState } from "react";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { getCurrentMonthSummary } from "../../services/expense.services";

interface Summary {
    transactionCount: number;
    totalIncome: number;
    totalExpense: number;
    currentBalance: number;
}

const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "INR" }).format(value);

const CurrentMonthSummary = () => {
    const [summary, setSummary] = useState<Summary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getCurrentMonthSummary();
                setSummary(data);
            } catch {
                setError("Couldn't load this month's summary.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (loading) {
        return (
            <div className={cn("border-t border-b py-4", COLORS.cardBorder)}>
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
        );
    }

    if (error) {
        return (
            <div className={cn("border-t border-b py-4 text-sm", COLORS.cardBorder, COLORS.danger)}>
                {error}
            </div>
        );
    }

    const items = [
        { label: "Balance", value: formatMoney(summary!.currentBalance), color: COLORS.textPrimary },
        { label: "Expenses", value: formatMoney(summary!.totalExpense), color: COLORS.expense },
        { label: "Income", value: formatMoney(summary!.totalIncome), color: COLORS.income },
        { label: "Transactions", value: String(summary!.transactionCount), color: COLORS.textPrimary },
    ];

    return (
        <div className={cn("border-t border-b", COLORS.cardBorder)}>
            <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className={cn("text-sm", COLORS.textSecondary)}>
                    Your current month overview
                </p>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                    {items.map((item) => (
                        <div key={item.label} className="flex items-baseline gap-2">
                            <span className={cn("text-xs uppercase tracking-wide", COLORS.textMuted)}>
                                {item.label}
                            </span>
                            <span className={cn("text-sm font-semibold tabular-nums", item.color)}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CurrentMonthSummary;