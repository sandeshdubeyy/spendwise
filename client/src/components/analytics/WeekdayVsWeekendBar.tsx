import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "../common/Card";
import Spinner from "../common/Spinner";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import {
    getWeekdayVsWeekendSpending,
    type WeekdayVsWeekend,
} from "../../services/analytics.services";

const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

const WeekdayVsWeekendBar = () => {
    const [data, setData] = useState<WeekdayVsWeekend | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const result = await getWeekdayVsWeekendSpending();
                setData(result);
            } catch {
                setError("Couldn't load weekday vs weekend spending.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (loading) {
        return (
            <Card className="mt-6">
                <CardBody>
                    <div className="flex justify-center py-6">
                        <Spinner size="lg" className={COLORS.textBrand} />
                    </div>
                </CardBody>
            </Card>
        );
    }

    if (error || !data) {
        return (
            <Card className="mt-6">
                <CardBody>
                    <p className={cn("text-sm", COLORS.danger)}>
                        {error || "No data available."}
                    </p>
                </CardBody>
            </Card>
        );
    }

    const { weekdayAvgPerDay, weekendAvgPerDay, ratio } = data;
    const total = weekdayAvgPerDay + weekendAvgPerDay;
    const weekdayShare = total > 0 ? (weekdayAvgPerDay / total) * 100 : 50;
    const weekendShare = total > 0 ? (weekendAvgPerDay / total) * 100 : 50;

    const summaryText =
        ratio > 1
            ? `You spend ${ratio}x more per day on weekends than on weekdays.`
            : ratio < 1 && ratio > 0
            ? `You spend ${(1 / ratio).toFixed(2)}x more per day on weekdays than on weekends.`
            : "Your weekday and weekend spending is about the same.";

    return (
        <Card className="mt-6">
            <CardHeader>
                <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>
                    Weekday vs Weekend Spending
                </h3>
                <p className={cn("mt-1 text-xs", COLORS.textMuted)}>
                    Average spending per day, compared
                </p>
            </CardHeader>

            <CardBody>
                <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                        className="h-full bg-green-600 dark:bg-blue-600"
                        style={{ width: `${weekdayShare}%` }}
                    />
                    <div
                        className="h-full bg-orange-400 dark:bg-orange-500"
                        style={{ width: `${weekendShare}%` }}
                    />
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-blue-600" />
                        <span className={COLORS.textSecondary}>Weekday avg/day</span>
                        <span className={cn("font-semibold", COLORS.textPrimary)}>
                            {formatMoney(weekdayAvgPerDay)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-orange-400 dark:bg-orange-500" />
                        <span className={COLORS.textSecondary}>Weekend avg/day</span>
                        <span className={cn("font-semibold", COLORS.textPrimary)}>
                            {formatMoney(weekendAvgPerDay)}
                        </span>
                    </div>
                </div>

                <p className={cn("mt-4 text-sm", COLORS.textSecondary)}>
                    {summaryText}
                </p>
            </CardBody>
        </Card>
    );
};

export default WeekdayVsWeekendBar;