import { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Card, CardBody, CardHeader } from "../common/Card";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { getCategoryMonthOverMonth } from "../../services/analytics.services";

interface CategoryMoMItem {
    category: string;
    currentSpent: number;
    previousSpent: number;
    percentageChange: number;
}

interface ChartItem extends CategoryMoMItem {
    change: number;
}

const CategoryMoMChart = () => {
    const [data, setData] = useState<ChartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const result = await getCategoryMonthOverMonth();
                setData(result.map((item) => ({ ...item, change: item.percentageChange })));
            } catch {
                setError("Couldn't load month-over-month comparison.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>Category MoM Change</h3>
                </CardHeader>
                <CardBody>
                    <div className="h-72 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </CardBody>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>Category MoM Change</h3>
                </CardHeader>
                <CardBody>
                    <p className={cn("text-sm", COLORS.danger)}>{error}</p>
                </CardBody>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>Category Month-over-Month Change</h3>
            </CardHeader>

            <CardBody>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 8 }}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                            <XAxis
                                type="number"
                                tick={{ fill: "currentColor" }}
                                tickFormatter={(value) => `${value}%`}
                                domain={[-100, 100]}
                            />
                            <YAxis
                                type="category"
                                dataKey="category"
                                tick={{ fill: "currentColor" }}
                                width={110}
                            />
                            <Tooltip
                                formatter={(value) => [
                                    `${Number(value ?? 0).toFixed(1)}%`,
                                    "Change",
                                ]}
                            />
                            <Bar dataKey="change" radius={[0, 6, 6, 0]}>
                                {data.map((entry) => (
                                    <Cell
                                        key={entry.category}
                                        fill={entry.percentageChange >= 0 ? "#10b981" : "#ef4444"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardBody>
        </Card>
    );
};

export default CategoryMoMChart;