import { Card } from "../common/Card";
import Spinner from "../common/Spinner";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { useBudget } from "../../context/Budget.context";

const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

const BudgetSummaryCards = () => {
    const { summary, loading, error } = useBudget();

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Spinner size="lg" className={COLORS.textBrand} />
            </div>
        );
    }

    if (error) {
        return <p className={cn("text-sm", COLORS.danger)}>{error}</p>;
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Card className="p-6">
                <h3 className={cn("text-sm font-semibold", COLORS.textSecondary)}>Total Budget</h3>
                <div className={cn("mt-3 text-2xl font-bold", COLORS.textPrimary)}>
                    {formatMoney(summary!.totalBudget)}
                </div>
            </Card>

            <Card className="p-6">
                <h3 className={cn("text-sm font-semibold", COLORS.textSecondary)}>Total Categories</h3>
                <div className={cn("mt-3 text-2xl font-bold", COLORS.textPrimary)}>
                    {summary!.totalCategories}
                </div>
            </Card>

            <Card className="p-6">
                <h3 className={cn("text-sm font-semibold", COLORS.textSecondary)}>Current Month Budget</h3>
                <div className={cn("mt-3 text-2xl font-bold", COLORS.income)}>
                    {formatMoney(summary!.currentMonthBudget)}
                </div>
            </Card>

            <Card className="p-6">
                <h3 className={cn("text-sm font-semibold", COLORS.textSecondary)}>Highest Budget Category</h3>
                {summary!.highestBudgetCategory ? (
                    <>
                        <div className={cn("mt-3 text-2xl font-bold capitalize", COLORS.textPrimary)}>
                            {summary!.highestBudgetCategory.category}
                        </div>
                        <p className={cn("mt-1 text-sm", COLORS.textMuted)}>
                            {formatMoney(summary!.highestBudgetCategory.amount)}
                        </p>
                    </>
                ) : (
                    <div className={cn("mt-3 text-2xl font-bold", COLORS.textPrimary)}>—</div>
                )}
            </Card>
        </div>
    );
};

export default BudgetSummaryCards;