import { cn } from "../../../utils/cn";
import { COLORS } from "../../../constants/colors";
import CurrentMonthSummary from "../../../components/analytics/CurrentMonthSummary";

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

            {/* more analytics sections go here */}
        </>
    );
};

export default Analytics;