import { cn } from "../../../utils/cn";
import { COLORS } from "../../../constants/colors";
import CurrentMonthSummary from "../../../components/analytics/CurrentMonthSummary";
import SpendingHeatmap from "../../../components/analytics/SpendingHeatmap";
import MonthlyTrendChart from "../../../components/dashboard/MonthlyTrendChart";
import CategorySpendingChart from "../../../components/dashboard/CategorySpendingChart";
import WeekdayVsWeekendBar from "../../../components/analytics/WeekdayVsWeekendBar";
import BudgetVsActualCard from "../../../components/analytics/BudgetVsActualCard";
import PaymentMethodDonutCard from "../../../components/analytics/PaymentMethodDonutCard";
import SavingsRateLineChart from "../../../components/analytics/SavingsRateLineChart";
import CategoryMoMChart from "../../../components/analytics/CategoryMoMChart";
import HolidaySpendingComparisonCard from "../../../components/analytics/HolidaySpendingComparisonCard";
import AnalyticsFooter from "../../../components/analytics/AnalyticsFooter";

const Analytics = () => {
    return (
        <>
            <div className="mb-6">
                <h1 className={cn("text-2xl font-bold", COLORS.textPrimary)}>Analytics</h1>
                <p className={cn("mt-1 text-sm", COLORS.textSecondary)}>
                    A closer look at your spending patterns and trends.
                </p>
            </div>

            <CurrentMonthSummary />

            <SpendingHeatmap />

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_1.75fr]">
                <div className="min-w-0">
                    <CategorySpendingChart />
                </div>

                <div className="min-w-0">
                    <MonthlyTrendChart />
                </div>
            </div>


            <WeekdayVsWeekendBar />

            <div className="mt-6">
                <BudgetVsActualCard />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.75fr_1.25fr]">
                <div className="min-w-0">
                    <SavingsRateLineChart />
                </div>
                <div className="min-w-0">
                    <PaymentMethodDonutCard />
                </div>
            </div>

            <div className="mt-6">
                <CategoryMoMChart />
            </div>

            <div className="mt-6">
                <HolidaySpendingComparisonCard />
            </div>
            
            <AnalyticsFooter/>
        </>
    );
};

export default Analytics;