import { useEffect, useState } from "react";
import LineChartCard from "../charts/LineChartCard";
import { getMonthlySpendingTrend } from "../../services/expense.services";
import Spinner from "../common/Spinner";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

const formatMonthLabel = (value: string) => {
    const [year, month] = value.split("-");
    const monthIndex = Number(month) - 1;
    const date = new Date(Number(year), monthIndex, 1);

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
    }).format(date);
};

const MonthlyTrendChart = () => {
    const [data, setData] = useState<{ name: string; amount: number; }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const trend = await getMonthlySpendingTrend();
                const formatted = trend.map((item) => ({
                    name: formatMonthLabel(item.month),
                    amount: item.totalSpent,
                }));

                setData(formatted);
            } catch {
                setError("Couldn't load spending trend.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[360px] items-center justify-center rounded-xl border border-slate-200 bg-white/70 p-6 dark:border-slate-800 dark:bg-slate-900/40">
                <Spinner size="lg" className={COLORS.textBrand} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-[360px] items-center justify-center rounded-xl border border-slate-200 bg-white/70 p-6 text-sm text-red-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-red-400">
                {error}
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="flex h-[360px] items-center justify-center rounded-xl border border-slate-200 bg-white/70 p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
                No spending trend data yet.
            </div>
        );
    }

    return (
        <LineChartCard
            title="Monthly Spending Trend"
            data={data}
            className={cn("h-[360px]")}
        />
    );
};

export default MonthlyTrendChart;