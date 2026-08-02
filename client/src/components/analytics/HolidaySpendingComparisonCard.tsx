import { useEffect, useState } from "react";
import { CalendarDays, Gift, TrendingUp } from "lucide-react";
import { Card, CardBody, CardHeader } from "../common/Card";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { getHolidaySpendingComparison, type HolidaySpending } from "../../services/analytics.services";

const countryOptions = [
    { label: "United States", value: "US" },
    { label: "United Kingdom", value: "GB" },
    { label: "Canada", value: "CA" },
    { label: "Australia", value: "AU" },
    { label: "India", value: "IN" },
];

const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);

const HolidaySpendingComparisonCard = () => {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    const [countryCode, setCountryCode] = useState("US");
    const [data, setData] = useState<HolidaySpending | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await getHolidaySpendingComparison({ year, countryCode });
                setData(result);
            } catch {
                setError("Couldn't load holiday comparison data.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [year, countryCode]);

    const deltaPercent = data
        ? ((data.holidayAvgPerDay - data.nonHolidayAvgPerDay) / data.nonHolidayAvgPerDay) * 100
        : 0;

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-amber-100 p-2 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                            <CalendarDays size={18} />
                        </div>
                        <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>
                            Holiday vs Regular Spending
                        </h3>
                    </div>
                    <p className={cn("mt-2 text-sm", COLORS.textSecondary)}>
                        Compare how much you spend on holiday days versus ordinary days.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
                        <span className={cn("font-medium", COLORS.textSecondary)}>Year</span>
                        <select
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className={cn(
                                "rounded-md border border-slate-200 bg-transparent px-2 py-1 text-sm outline-none dark:border-slate-700",
                                COLORS.textPrimary
                            )}
                        >
                            {[currentYear - 1, currentYear, currentYear + 1].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
                        <span className={cn("font-medium", COLORS.textSecondary)}>Country</span>
                        <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className={cn(
                                "rounded-md border border-slate-200 bg-transparent px-2 py-1 text-sm outline-none dark:border-slate-700",
                                COLORS.textPrimary
                            )}
                        >
                            {countryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </CardHeader>

            <CardBody>
                {loading ? (
                    <div className="grid gap-4 lg:grid-cols-2">
                        <div className="h-28 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                        <div className="h-28 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                    </div>
                ) : error ? (
                    <p className={cn("text-sm", COLORS.danger)}>{error}</p>
                ) : data ? (
                    <div className="grid gap-4 lg:grid-cols-2">
                        <div className="rounded-xl border border-amber-100 bg-amber-50/70 p-5 dark:border-amber-900/30 dark:bg-amber-950/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={cn("text-sm", COLORS.textSecondary)}>Holiday avg / day</p>
                                    <p className={cn("mt-2 text-3xl font-semibold", COLORS.textPrimary)}>
                                        {formatCurrency(data.holidayAvgPerDay)}
                                    </p>
                                </div>
                                <div className="rounded-full bg-amber-200/70 p-3 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                                    <Gift size={20} />
                                </div>
                            </div>
                            <p className={cn("mt-4 text-sm", COLORS.textSecondary)}>
                                {data.holidaysWithSpending} holiday periods with recorded spending
                            </p>
                        </div>

                        <div className="rounded-xl border border-green-100 bg-green-50/70 p-5 dark:border-green-900/30 dark:bg-green-950/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={cn("text-sm", COLORS.textSecondary)}>Regular day avg / day</p>
                                    <p className={cn("mt-2 text-3xl font-semibold", COLORS.textPrimary)}>
                                        {formatCurrency(data.nonHolidayAvgPerDay)}
                                    </p>
                                </div>
                                <div className="rounded-full bg-green-200/70 p-3 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                                    <TrendingUp size={20} />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                                <TrendingUp size={16} />
                                <span>
                                    Holiday spending is {deltaPercent >= 0 ? "" : ""}
                                    {Math.abs(deltaPercent).toFixed(1)}% {deltaPercent >= 0 ? "higher" : "lower"} than regular days.
                                </span>
                            </div>
                        </div>
                    </div>
                ) : null}
            </CardBody>
        </Card>
    );
};

export default HolidaySpendingComparisonCard;