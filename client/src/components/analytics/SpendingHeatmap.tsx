import { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardBody } from "../common/Card";
import Spinner from "../common/Spinner";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { getSpendingHeatmap, type HeatmapItem } from "../../services/analytics.services";

const DAY_MS = 24 * 60 * 60 * 1000;

const levelClasses = [
    "bg-slate-300 dark:bg-slate-800",       // level 0 — no spending
    "bg-green-200 dark:bg-blue-950",        // level 1
    "bg-green-400 dark:bg-blue-800",        // level 2
    "bg-green-600 dark:bg-blue-600",        // level 3
    "bg-green-800 dark:bg-blue-400",        // level 4 — highest spending
];

const toDateKey = (date: Date) => date.toISOString().slice(0, 10);

const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

interface DayCell {
    dateKey: string;
    date: Date;
    row: number; // 0 = Sunday ... 6 = Saturday
    totalSpent: number;
    transactionCount: number;
    level: number;
}

interface MonthGroup {
    label: string;
    columns: DayCell[][];
}

const SpendingHeatmap = () => {
    const [heatmap, setHeatmap] = useState<HeatmapItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getSpendingHeatmap();
                setHeatmap(data);
            } catch {
                setError("Couldn't load spending heatmap.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const { monthGroups, startYear, endYear } = useMemo(() => {
        const spentByDate = new Map(heatmap.map((item) => [item.date, item]));

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const start = new Date(today.getTime() - 364 * DAY_MS);

        const maxSpent = Math.max(1, ...heatmap.map((item) => item.totalSpent));

        const getLevel = (amount: number) => {
            if (amount <= 0) return 0;
            const ratio = amount / maxSpent;
            if (ratio <= 0.25) return 1;
            if (ratio <= 0.5) return 2;
            if (ratio <= 0.75) return 3;
            return 4;
        };

        // Build one column at a time. Start a new column whenever we hit a
        // new week (Sunday) OR whenever the month changes — whichever comes
        // first — so a single column never mixes two different months.
        const columns: DayCell[][] = [];
        let currentColumn: DayCell[] = [];
        let currentMonth = -1;

        for (let cursor = new Date(start); cursor.getTime() <= today.getTime(); cursor = new Date(cursor.getTime() + DAY_MS)) {
            const row = cursor.getDay();
            const month = cursor.getMonth();

            const monthChanged = currentMonth !== -1 && month !== currentMonth;
            const newWeek = row === 0 && currentColumn.length > 0;

            if (monthChanged || newWeek) {
                columns.push(currentColumn);
                currentColumn = [];
            }

            currentMonth = month;

            const dateKey = toDateKey(cursor);
            const entry = spentByDate.get(dateKey);

            currentColumn.push({
                dateKey,
                date: new Date(cursor),
                row,
                totalSpent: entry?.totalSpent || 0,
                transactionCount: entry?.transactionCount || 0,
                level: getLevel(entry?.totalSpent || 0),
            });
        }

        if (currentColumn.length > 0) {
            columns.push(currentColumn);
        }

        // Group the now month-pure columns into labeled month blocks.
        const monthGroups: MonthGroup[] = [];

        columns.forEach((column) => {
            const label = column[0].date.toLocaleDateString("en-US", { month: "short" });
            const lastGroup = monthGroups[monthGroups.length - 1];

            if (!lastGroup || lastGroup.label !== label) {
                monthGroups.push({ label, columns: [column] });
            } else {
                lastGroup.columns.push(column);
            }
        });

        const startYear = monthGroups[0]?.columns[0]?.[0]?.date.getFullYear();
        const lastGroup = monthGroups[monthGroups.length - 1];
        const endYear = lastGroup?.columns[lastGroup.columns.length - 1]?.slice(-1)[0]?.date.getFullYear();

        return { monthGroups, startYear, endYear };
    }, [heatmap]);

    return (
        <Card className="mt-6">
            <CardHeader>
                <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>
                    Spending Heatmap
                </h3>
                <p className={cn("mt-1 text-xs", COLORS.textMuted)}>
                    Daily spending over the last 12 months
                </p>
            </CardHeader>

            <CardBody>
                {loading ? (
                    <div className="flex justify-center py-10">
                        <Spinner size="lg" className={COLORS.textBrand} />
                    </div>
                ) : error ? (
                    <p className={cn("text-sm", COLORS.danger)}>{error}</p>
                ) : (
                    <div className="w-full">
                        {startYear && endYear ? (
                            <div className="mb-1 flex items-center justify-between text-xs font-medium">
                                <span className={COLORS.textSecondary}>{startYear}</span>
                                {endYear !== startYear ? (
                                    <span className={COLORS.textSecondary}>{endYear}</span>
                                ) : null}
                            </div>
                        ) : null}

                        <div className="w-full overflow-x-auto">
                            <div className="flex min-w-full items-start gap-1">
                                {/* day-of-week labels */}
                                <div className="h-[121px] flex flex-col items-center justify-between gap-[3px] pr-1 pt-5 text-[10px]">
                                    <span className={COLORS.textMuted}>Sun</span>
                                    <span className={COLORS.textMuted}>Wed</span>
                                    <span className={COLORS.textMuted}>Sat</span>
                                </div>

                                {/* month groups, each with a centered label and a gap after it */}
                                <div className="flex flex-1 items-start gap-3">
                                    {monthGroups.map((group, groupIndex) => (
                                        <div key={groupIndex} className="flex flex-col items-center">
                                            <span className={cn("mb-1 w-full text-center text-[10px]", COLORS.textMuted)}>
                                                {group.label}
                                            </span>

                                            <div className="flex gap-[3px]">
                                                {group.columns.map((column, colIndex) => (
                                                    <div
                                                        key={colIndex}
                                                        className="grid grid-rows-7 gap-[3px]"
                                                    >
                                                        {column.map((day) => (
                                                            <div
                                                                key={day.dateKey}
                                                                style={{ gridRow: day.row + 1 }}
                                                                title={`${day.dateKey}: ${day.transactionCount} transaction${day.transactionCount === 1 ? "" : "s"} · ${formatMoney(day.totalSpent)}`}
                                                                className={cn(
                                                                    "h-3 w-3 rounded-sm",
                                                                    levelClasses[day.level]
                                                                )}
                                                            />
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* legend */}
                            <div className="mt-5 flex items-center justify-end gap-1.5 text-[10px]">
                                <span className={COLORS.textMuted}>Less</span>
                                {levelClasses.map((cls, i) => (
                                    <div key={i} className={cn("h-2.5 w-2.5 rounded-sm", cls)} />
                                ))}
                                <span className={COLORS.textMuted}>More</span>
                            </div>
                        </div>
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

export default SpendingHeatmap;