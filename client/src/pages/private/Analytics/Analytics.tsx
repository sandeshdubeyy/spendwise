import { cn } from "../../../utils/cn";
import { COLORS } from "../../../constants/colors";
import CurrentMonthSummary from "../../../components/analytics/CurrentMonthSummary";
import SpendingHeatmap from "../../../components/analytics/SpendingHeatmap";
import MonthlyTrendChart from "../../../components/dashboard/MonthlyTrendChart";
import CategorySpendingChart from "../../../components/dashboard/CategorySpendingChart";
import WeekdayVsWeekendBar from "../../../components/analytics/WeekdayVsWeekendBar";

const Analytics = () => {
    return (
        <>
            <div className="mb-6">
                <h1 className={cn("text-2xl font-bold", COLORS.textPrimary)}>Analytics</h1>
                <p className={cn("mt-1 text-sm", COLORS.textSecondary)}>
                    A closer look at your spending patterns and trends.
                </p>
            </div>

            tsx
            <CurrentMonthSummary />


            <SpendingHeatmap />

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.75fr_1.25fr]">
                <div className="min-w-0">
                    <MonthlyTrendChart />
                </div>

                <div className="min-w-0">
                    <CategorySpendingChart />
                </div>
            </div>

            <WeekdayVsWeekendBar />
            {/* more analytics sections go here */}
        </>
    );
};

export default Analytics;