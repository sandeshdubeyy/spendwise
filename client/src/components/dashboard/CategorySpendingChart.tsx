import { useEffect, useState } from "react";
import PieChartCard, { type PieChartItem } from "../charts/PieChartCard";
import { getCategoryWiseSpending } from "../../services/analytics.services";
import Spinner from "../common/Spinner";
import { COLORS } from "../../constants/colors";

const palette = [
    "#16a34a",
    "#2563eb",
    "#f97316",
    "#8b5cf6",
    "#ec4899",
    "#0f766e",
    "#64748b",
];

const CategorySpendingChart = () => {
    const [data, setData] = useState<PieChartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const spending = await getCategoryWiseSpending();

                const mapped = spending.map((item, index) => ({
                    name: item.category,
                    value: item.totalSpent,
                    color: palette[index % palette.length],
                }));

                setData(mapped);
            } catch {
                setError("Couldn't load category spending.");
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
                No spending data yet.
            </div>
        );
    }

    return (
        <PieChartCard
            title="Category Spending"
            data={data}
            className="h-[360px]"
        />
    );
};

export default CategorySpendingChart;