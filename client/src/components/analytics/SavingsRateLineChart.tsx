import { useEffect, useState } from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Card, CardBody, CardHeader } from "../common/Card";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { getSavingsRateTrend } from "../../services/analytics.services";

interface SavingsRateTrendItem {
    month: string;
    totalIncome: number;
    totalExpense: number;
    savingsRate: number;
}

const SavingsRateLineChart = () => {
    const [data, setData] = useState<SavingsRateTrendItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const result = await getSavingsRateTrend();
                setData(result);
            } catch {
                setError("Couldn't load savings rate trend.");
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
                    <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>Savings Rate Trend</h3>
                </CardHeader>
                <CardBody>
                    <div className="h-64 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </CardBody>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>Savings Rate Trend</h3>
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
                <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>Savings Rate Trend</h3>
            </CardHeader>

            <CardBody>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                            <XAxis dataKey="month" tick={{ fill: "currentColor" }} />
                            <YAxis
                                tick={{ fill: "currentColor" }}
                                domain={[-100, 100]}
                                tickFormatter={(value) => `${value}%`}
                            />
                            <Tooltip
                                formatter={(value) => [
                                    `${Number(value ?? 0).toFixed(1)}%`,
                                    "Savings Rate",
                                ]}
                            />
                            <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" />
                            <Line
                                type="monotone"
                                dataKey="savingsRate"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardBody>
        </Card>
    );
};

export default SavingsRateLineChart;